import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const body = await req.json();

    const result = await cloudinary.uploader.upload(
      body.image,
      {
        folder: "matrimony",
      }
    );

    return NextResponse.json({
      success: true,
      url: result.secure_url,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Upload Failed" },
      { status: 500 }
    );
  }
}