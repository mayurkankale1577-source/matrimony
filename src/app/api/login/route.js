import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "@/lib/db";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        {
          message:
            "Email and Password required",
        },
        {
          status: 400,
        }
      );
    }

    const [users] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { message: "Invalid Email" },
        { status: 401 }
      );
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );



    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 401 }
      );
    }
    
    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        {
          message: "JWT Secret Missing",
        },
        {
          status: 500,
        }
      );
    }
    
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const response = NextResponse.json({
      success: true,
      message: "Login Success",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(
      "Login Error:",
      error
    );

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}