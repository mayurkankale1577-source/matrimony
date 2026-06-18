import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import db from "@/lib/db";

export async function POST(
  request
) {
  try {
    const cookieStore =
      await cookies();

    const token =
      cookieStore.get(
        "token"
      )?.value;

    if (!token) {
      return NextResponse.json({
        success: false,
      });
    }

    const user =
      verifyToken(token);

    const {
      to_user_id,
    } = await request.json();

    const [existing] =
      await db.query(
        `
        SELECT id
        FROM likes
        WHERE from_user_id = ?
        AND to_user_id = ?
      `,
        [
          user.id,
          to_user_id,
        ]
      );

    if (
      existing.length > 0
    ) {
      await db.query(
        `
        DELETE FROM likes
        WHERE from_user_id = ?
        AND to_user_id = ?
      `,
        [
          user.id,
          to_user_id,
        ]
      );

      return NextResponse.json({
        success: true,
        liked: false,
      });
    }

    await db.query(
      `
      INSERT INTO likes
      (
        from_user_id,
        to_user_id
      )
      VALUES (?, ?)
    `,
      [
        user.id,
        to_user_id,
      ]
    );

    return NextResponse.json({
      success: true,
      liked: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
    });
  }
}