import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import db from "@/lib/db";
import cloudinary from "@/lib/cloudinary";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const full_name = formData.get("full_name");
    const gender = formData.get("gender");
    const age = formData.get("age");
    const city = formData.get("city");
    const religion = formData.get("religion");
    const education = formData.get("education");
    const occupation = formData.get("occupation");
    const about_me = formData.get("about_me");

    const photo = formData.get("photo");

    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const userId = decoded.id;

    await db.query(
      `
      INSERT INTO profiles
      (
        user_id,
        age,
        city,
        religion,
        education,
        occupation,
        about_me
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      age = VALUES(age),
      city = VALUES(city),
      religion = VALUES(religion),
      education = VALUES(education),
      occupation = VALUES(occupation),
      about_me = VALUES(about_me)
      `,
      [
        userId,
        age,
        city,
        religion,
        education,
        occupation,
        about_me,
      ]
    );

    await db.query(
      `
      UPDATE users
      SET
      full_name = ?,
      gender = ?
      WHERE id = ?
      `,
      [full_name, gender, userId]
    );

    if (photo && photo.size > 0) {
      const bytes = await photo.arrayBuffer();

      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "matrimony",
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            )
            .end(buffer);
        }
      );

      await db.query(
        `
        INSERT INTO photos
        (
          user_id,
          image_url,
          is_primary
        )
        VALUES (?, ?, 1)
        `,
        [
          userId,
          uploadResult.secure_url,
        ]
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile Saved Successfully",
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