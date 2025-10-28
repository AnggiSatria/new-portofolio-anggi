import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Params {
  params: Promise<{ id: string }>; // ✅ harus Promise di Next 15+
}

export async function GET(_: Request, { params }: Params) {
  const { id } = await params; // ✅ tunggu params
  try {
    const cert = await prisma.certificate.findUnique({
      where: { id },
    });
    if (!cert)
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    return NextResponse.json(cert);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get certificate" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: Params) {
  const { id } = await params;
  try {
    const data = await req.json();
    const updated = await prisma.certificate.update({
      where: { id },
      data: {
        title: data.title,
        issuer: data.issuer,
        issueDate: new Date(data.issueDate),
        image: data.image,
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update certificate" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;
  try {
    await prisma.certificate.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Certificate deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete certificate" },
      { status: 500 }
    );
  }
}
