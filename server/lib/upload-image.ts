import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const uploadDir =
  process.env.UPLOAD_DIR ?? path.join(process.cwd(), "public", "uploads");

export async function GET(
  _: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;

    const filePath = path.join(uploadDir, filename);

    const file = await fs.readFile(filePath);

    const extension = path.extname(filename).toLowerCase();

    const contentTypes: Record<string, string> = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".webp": "image/webp",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
      ".avif": "image/avif",
    };

    return new NextResponse(file, {
      headers: {
        "Content-Type": contentTypes[extension] || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Image not found", { status: 404 });
  }
}