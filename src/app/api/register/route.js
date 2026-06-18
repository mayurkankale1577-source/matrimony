import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/lib/db";

export async function POST(request) {
  try {
    const {
      full_name,
      gender,
      email,
      password,
    } = await request.json();

    if (
      !full_name ||
      !gender ||
      !email ||
      !password
    ) {
      return NextResponse.json(
        {
          message:
            "All fields are required",
        },
        { status: 400 }
      );
    }

    const [existing] =
      await db.query(
        `
        SELECT id
        FROM users
        WHERE email = ?
        `,
        [email]
      );

    if (existing.length > 0) {
      return NextResponse.json(
        {
          message:
            "Email already exists",
        },
        { status: 400 }
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Create User
    const [result] =
      await db.query(
        `
        INSERT INTO users
        (
          full_name,
          gender,
          email,
          password
        )
        VALUES
        (?, ?, ?, ?)
        `,
        [
          full_name,
          gender,
          email,
          hashedPassword,
        ]
      );

    // Create Empty Profile Row
    await db.query(
      `
      INSERT INTO profiles
      (
        user_id
      )
      VALUES
      (?)
      `,
      [result.insertId]
    );

    return NextResponse.json({
      success: true,
      message:
        "User registered successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}