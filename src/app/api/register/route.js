import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/lib/db";

export async function POST(request) {
  try {
    const { full_name, gender, email, password } = await request.json();

    const normalizedEmail = email?.trim().toLowerCase();

    if (!full_name || !gender || !email || !password) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const [existing] = await db.query(
      `
        SELECT id
        FROM users
        WHERE email = ?
        `,
      [normalizedEmail]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const [result] = await db.query(
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
      [full_name, gender, normalizedEmail, hashedPassword]
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
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Register Error:", error);

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
