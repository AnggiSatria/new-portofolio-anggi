import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Ganti code dengan pendekatan ini:
export async function GET(req: NextRequest) {
  const urlPath = req.nextUrl.pathname;
  const id = urlPath.split("/").pop() || ""; // Ambil ID dari URL secara langsung

  // Periksa jika id valid sebelum query ke database
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const project = await prisma.project.findUnique({ where: { id } });
  return project
    ? NextResponse.json(project)
    : NextResponse.json({ error: "Project not found" }, { status: 404 });
}

export async function PUT(req: NextRequest) {
  const urlPath = req.nextUrl.pathname;
  const id = urlPath.split("/").pop() || "";
  const body = await req.json();
  const { title, description, image, link } = body;

  // Periksa jika id valid
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const project = await prisma.project.update({
    where: { id },
    data: { title, description, image, link },
  });

  return NextResponse.json(project);
}

export async function DELETE(req: NextRequest) {
  const urlPath = req.nextUrl.pathname;
  const id = urlPath.split("/").pop() || "";

  // Periksa jika id valid
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ message: "Project deleted" });
}
