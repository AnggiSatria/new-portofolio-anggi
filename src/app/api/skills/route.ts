import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Ambil semua skill
export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

// POST: Tambah skill baru (base64 image di body)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { image } = body;

    if (!image || typeof image !== "string") {
      return NextResponse.json(
        { message: "Image (base64) is required" },
        { status: 400 }
      );
    }

    const skill = await prisma.skill.create({
      data: {
        image,
      },
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create skill" },
      { status: 500 }
    );
  }
}

// DELETE: Hapus skill by ID (dari query param: /api/skill?id=xxxx)
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Missing skill ID" }, { status: 400 });
  }

  try {
    await prisma.skill.delete({ where: { id } });
    return NextResponse.json({ message: "Skill deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete skill" },
      { status: 500 }
    );
  }
}
