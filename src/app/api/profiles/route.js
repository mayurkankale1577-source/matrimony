import { NextResponse } from "next/server";
import {
  getProfiles,
  getDistricts,
} from "@/services/profile.service";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // District Dropdown
    if (searchParams.get("dropdown") === "districts") {
      const districts = await getDistricts();

      return NextResponse.json({
        success: true,
        data: districts,
      });
    }

    // Profile Listing
    const filters = {
      gender: searchParams.get("gender") || "",
      district: searchParams.get("district") || "",
    };

    const profiles = await getProfiles(filters);

    return NextResponse.json({
      success: true,
      data: profiles,
    });

  } catch (error) {
    console.error("Profiles API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}