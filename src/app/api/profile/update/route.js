import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import db from "@/lib/db";
import cloudinary from "@/lib/cloudinary";

export async function PUT(request) {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = verifyToken(token);

    const formData = await request.formData();

    const full_name = formData.get("full_name");

    const gender = formData.get("gender");
 
    const birth_date = formData.get("birth_date");

    const birth_place = formData.get("birth_place");

    const religion = formData.get("religion");

    const education = formData.get("education");

    const occupation = formData.get("occupation");

    const about_me = formData.get("about_me");

    const height = formData.get("height");

    

    const mother_tongue = formData.get("mother_tongue");

   

    const annual_income = formData.get("annual_income");

    const partner_preference = formData.get("partner_preference");

    const removePhoto = formData.get("removePhoto") === "true";

    const photo = formData.get("photo");

    const father_name = formData.get("father_name");
    const kaka_name = formData.get("kaka_name");
    const mothe_baba = formData.get("mothe_baba");
    const mavshi = formData.get("mavshi");
    const aatemama = formData.get("aatemama");

    const father_occupation = formData.get("father_occupation");

    const mother_name = formData.get("mother_name");

    const brothers = formData.get("brothers");

    const sisters = formData.get("sisters");

    const maternal_uncle = formData.get("maternal_uncle");

    const relatives = formData.get("relatives");

    const address = formData.get("address");

    const mobile = formData.get("mobile");
 

    const email = formData.get("email");

    // UPDATE USER

    await db.query(
      `
      UPDATE users
      SET
        full_name = ?,
        gender = ?
      WHERE id = ?
      `,
      [full_name, gender, user.id]
    );

    // PROFILE EXISTS?

    const [existingProfile] = await db.query(
      `
        SELECT id
        FROM profiles
        WHERE user_id = ?
        `,
      [user.id]
    );

    if (existingProfile.length === 0) {
      await db.query(
        `
        INSERT INTO profiles
(
  user_id,
  
  birth_date,
  birth_place,
  religion,
  education,
  occupation,
  about_me,
  height,
 
  mother_tongue,
 
  annual_income,
  partner_preference,

  father_name,
  father_occupation,
  mother_name,

  brothers,
  sisters,

  maternal_uncle,
  relatives,

  address,
  mobile,
 
  email,

  kaka_name,
  mothe_baba,
  mavshi,
  aatemama
)
VALUES
(
  ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
  ?, ?, ?,
  ?, ?,
  ?, ?,
  ?, ?, ?, ?,
  ?, ?, ?, ?
)
        `,
        [
          user.id,
         
          birth_date,
          birth_place,
          religion,
          education,
          occupation,
          about_me,
          height,
          
          mother_tongue,
         
          annual_income,
          partner_preference,
        
          father_name,
          father_occupation,
          mother_name,
        
          brothers,
          sisters,
        
          maternal_uncle,
          relatives,
        
          address,
          mobile,
           
          email,
        
          kaka_name,
          mothe_baba,
          mavshi,
          aatemama,
        ]
      );
    } else {
      await db.query(
        `
       UPDATE profiles
SET
  
  birth_date = ?,
birth_place = ?,
  religion = ?,
  education = ?,
  occupation = ?,
  about_me = ?,
  height = ?,
 
  mother_tongue = ?,
 
  annual_income = ?,
  partner_preference = ?,

  father_name = ?,
  kaka_name = ?,
mothe_baba = ?,
mavshi = ?,
aatemama = ?,
  father_occupation = ?,
  mother_name = ?,

  brothers = ?,
  sisters = ?,

  maternal_uncle = ?,
  relatives = ?,

  address = ?,
  mobile = ?,
  
  email = ?

WHERE user_id = ?
        `,
        [
        
          birth_date,
          birth_place,
          religion,
          education,
          occupation,
          about_me,
          height,
        
          mother_tongue,
         
          annual_income,
          partner_preference,

          father_name,
          kaka_name,
mothe_baba,
mavshi,
aatemama,
          father_occupation,
          mother_name,

          brothers,
          sisters,

          maternal_uncle,
          relatives,

          address,
          mobile,
          
          email,

          user.id,
        ]
      );
    }

    // REMOVE PHOTO

    if (removePhoto) {
      console.log("REMOVE PHOTO =>", removePhoto);
      console.log("USER ID =>", user.id);

      const [result] = await db.query(
        `
          DELETE FROM photos
          WHERE user_id = ?
          `,
        [user.id]
      );

      console.log("DELETE RESULT =>", result);
    }

    // PHOTO UPLOAD

    if (photo && photo.name && photo.size > 0) {
      const bytes = await photo.arrayBuffer();

      const buffer = Buffer.from(bytes);

      const base64 = `data:${photo.type};base64,${buffer.toString("base64")}`;

      const result = await cloudinary.uploader.upload(base64, {
        folder: "matrimony",
      });

      const [existingPhoto] = await db.query(
        `
          SELECT id
          FROM photos
          WHERE user_id = ?
          `,
        [user.id]
      );

      if (existingPhoto.length > 0) {
        await db.query(
          `
          UPDATE photos
          SET image_url = ?
          WHERE user_id = ?
          `,
          [result.secure_url, user.id]
        );
      } else {
        await db.query(
          `
          INSERT INTO photos
          (
            user_id,
            image_url,
            is_primary
          )
          VALUES
          (?, ?, 1)
          `,
          [user.id, result.secure_url]
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
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
