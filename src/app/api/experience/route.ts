import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ GET: Ambil semua experience
export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(experiences);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch experiences" },
      { status: 500 }
    );
  }
}

// ✅ POST: Tambah experience baru
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, company, startDate, endDate, description } = body;

    if (!title || !company || !startDate || !description) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const experience = await prisma.experience.create({
      data: {
        title,
        company,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        description,
      },
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create experience" },
      { status: 500 }
    );
  }
}

// ✅ PUT: Update experience (by ID, via query param: ?id=xxx)
export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "Missing experience ID" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { title, company, startDate, endDate, description } = body;

    const updatedExperience = await prisma.experience.update({
      where: { id },
      data: {
        title,
        company,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        description,
      },
    });

    return NextResponse.json(updatedExperience);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update experience" },
      { status: 500 }
    );
  }
}

// ✅ DELETE: Hapus experience by ID (via query param: ?id=xxx)
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "Missing experience ID" },
        { status: 400 }
      );
    }

    await prisma.experience.delete({ where: { id } });
    return NextResponse.json({ message: "Experience deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete experience" },
      { status: 500 }
    );
  }
}
