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

    let user;

    try {
      user = verifyToken(token);
    } catch (error) {
      return NextResponse.json(
        {
          message: "Invalid Token",
        },
        {
          status: 401,
        }
      );
    }

    const {
      receiverId,
      message,
    } = await request.json();

    if (!receiverId) {
      return NextResponse.json(
        {
          message:
            "Receiver is required",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !message ||
      !message.trim()
    ) {
      return NextResponse.json(
        {
          message:
            "Message is required",
        },
        {
          status: 400,
        }
      );
    }

    const result =
      await sendMessage(
        user.id,
        Number(receiverId),
        message.trim()
      );

    if (!result) {
      return NextResponse.json(
        {
          message:
            "Failed to send message",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message sent",
    });
  } catch (error) {
    console.error(
      "Send Message API Error:",
      error
    );

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