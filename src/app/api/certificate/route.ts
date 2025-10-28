import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET all certificates
export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { issueDate: "desc" },
    });
    return NextResponse.json(certificates);
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return NextResponse.json(
      { error: "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}

// POST new certificate
export async function POST(req: Request) {
  try {
    const data = await req.json();

    const newCert = await prisma.certificate.create({
      data: {
        title: data.title,
        issuer: data.issuer,
        issueDate: new Date(data.issueDate),
        image: data.image,
      },
    });

    return NextResponse.json(newCert);
  } catch (error) {
    console.error("Error creating certificate:", error);
    return NextResponse.json(
      { error: "Failed to create certificate" },
      { status: 500 }
    );
  }
}
