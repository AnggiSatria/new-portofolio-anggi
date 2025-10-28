import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  context: Awaited<{ params: Promise<{ id: string }> }>
) {
  const { id } = await context.params; // ✅ params harus di-await
  try {
    const education = await prisma.education.findUnique({
      where: { id },
    });
    if (!education) {
      return NextResponse.json(
        { error: "Education not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(education);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get education" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  context: Awaited<{ params: Promise<{ id: string }> }>
) {
  const { id } = await context.params;
  try {
    const data = await req.json();
    const updated = await prisma.education.update({
      where: { id },
      data: {
        institution: data.institution,
        degree: data.degree,
        field: data.field,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update education" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: Awaited<{ params: Promise<{ id: string }> }>
) {
  const { id } = await context.params;
  try {
    await prisma.education.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Education deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete education" },
      { status: 500 }
    );
  }
}
