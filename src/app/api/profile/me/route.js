import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import db from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const token =
      cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = verifyToken(token);

    const [rows] = await db.query(
      `
      SELECT
  users.full_name,
  users.email,
  users.gender,

   
  profiles.birth_date,
  profiles.birth_place,
  profiles.religion,
  profiles.education,
  profiles.occupation,
  profiles.about_me,
  profiles.height,
 
  profiles.mother_tongue,
   
  profiles.annual_income,
  profiles.partner_preference,

  profiles.father_name,
  profiles.kaka_name,
profiles.mothe_baba,
profiles.mavshi,
profiles.aatemama,
  profiles.father_occupation,
  profiles.mother_name,

  profiles.brothers,
  profiles.sisters,

  profiles.maternal_uncle,
  profiles.relatives,

  profiles.address,
  profiles.mobile,
  profiles.email,

  photos.image_url

      FROM users

      LEFT JOIN profiles
        ON users.id = profiles.user_id

      LEFT JOIN photos
        ON users.id = photos.user_id
        AND photos.is_primary = 1

      WHERE users.id = ?
      `,
      [user.id]
    );

    return NextResponse.json({
      profile: rows[0],
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}