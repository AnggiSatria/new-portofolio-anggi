import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const cert = await prisma.certificate.findUnique({
      where: { id: params.id },
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

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    const updated = await prisma.certificate.update({
      where: { id: params.id },
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

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.certificate.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Certificate deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete certificate" },
      { status: 500 }
    );
  }
}
