import { PDFDocument, StandardFonts } from "pdf-lib";
import { getProfileById } from "@/services/profile.service";

export const runtime = "nodejs";

export async function GET(
  request,
  { params }
) {
  try {
    const { id } = await params;

    const profile =
      await getProfileById(id);

    if (!profile) {
      return Response.json(
        {
          message: "Profile not found",
        },
        { status: 404 }
      );
    }

    const pdfDoc =
      await PDFDocument.create();

    const page =
      pdfDoc.addPage([595, 842]);

    const font =
      await pdfDoc.embedFont(
        StandardFonts.Helvetica
      );

    // Photo add
    if (profile.image_url) {
      try {
        const imageResponse =
          await fetch(
            profile.image_url
          );

        const imageBytes =
          await imageResponse.arrayBuffer();

        let image;

        if (
          profile.image_url
            .toLowerCase()
            .includes(".png")
        ) {
          image =
            await pdfDoc.embedPng(
              imageBytes
            );
        } else {
          image =
            await pdfDoc.embedJpg(
              imageBytes
            );
        }

        page.drawImage(image, {
          x: 50,
          y: 560,
          width: 140,
          height: 180,
        });
      } catch (err) {
        console.log(
          "Image Error:",
          err
        );
      }
    }

    page.drawText(
      "Matrimony Biodata",
      {
        x: 210,
        y: 780,
        size: 22,
        font,
      }
    );

    let y = 720;

    page.drawText(
      `Name: ${profile.full_name}`,
      {
        x: 220,
        y,
        size: 14,
        font,
      }
    );

    y -= 25;

    page.drawText(
      `Age: ${
        profile.age || ""
      }`,
      {
        x: 220,
        y,
        size: 12,
        font,
      }
    );

    y -= 20;

    page.drawText(
      `Gender: ${
        profile.gender || ""
      }`,
      {
        x: 220,
        y,
        size: 12,
        font,
      }
    );

    y -= 20;

    page.drawText(
      `City: ${
        profile.city || ""
      }`,
      {
        x: 220,
        y,
        size: 12,
        font,
      }
    );

    y -= 20;

    page.drawText(
      `Religion: ${
        profile.religion || ""
      }`,
      {
        x: 220,
        y,
        size: 12,
        font,
      }
    );

    y -= 20;

    page.drawText(
      `Education: ${
        profile.education || ""
      }`,
      {
        x: 220,
        y,
        size: 12,
        font,
      }
    );

    y -= 20;

    page.drawText(
      `Occupation: ${
        profile.occupation || ""
      }`,
      {
        x: 220,
        y,
        size: 12,
        font,
      }
    );

    page.drawText(
      "About Me",
      {
        x: 50,
        y: 500,
        size: 16,
        font,
      }
    );

    page.drawText(
      profile.about_me ||
        "No description",
      {
        x: 50,
        y: 470,
        size: 12,
        font,
      }
    );

    const pdfBytes =
      await pdfDoc.save();

    return new Response(
      pdfBytes,
      {
        headers: {
          "Content-Type":
            "application/pdf",
          "Content-Disposition": `attachment; filename="${profile.full_name}-biodata.pdf"`,
        },
      }
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}