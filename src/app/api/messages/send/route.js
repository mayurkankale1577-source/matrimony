import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { sendMessage } from "@/services/message.service";

export async function POST(request) {
  try {
    const cookieStore = await cookies();

    const token =
      cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const user = verifyToken(token);

    const {
      receiverId,
      message,
    } = await request.json();

    await sendMessage(
      user.id,
      receiverId,
      message
    );

    return NextResponse.json({
      success: true,
      message: "Message sent",
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