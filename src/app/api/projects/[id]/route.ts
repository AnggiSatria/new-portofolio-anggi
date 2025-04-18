import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const project = await prisma.project.findUnique({ where: { id } });
  return NextResponse.json(project);
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const body = await req.json();
  const { title, description, image, link } = body;

  const project = await prisma.project.update({
    where: { id },
    data: { title, description, image, link },
  });

  return NextResponse.json(project);
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ message: "Project deleted" });
}
