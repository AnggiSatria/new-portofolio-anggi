import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET all education records
export async function GET() {
  try {
    const educations = await prisma.education.findMany({
      orderBy: { startDate: "desc" },
    });
    return NextResponse.json(educations);
  } catch (error) {
    console.error("Error fetching education:", error);
    return NextResponse.json(
      { error: "Failed to fetch education" },
      { status: 500 }
    );
  }
}

// POST new education
export async function POST(req: Request) {
  try {
    const data = await req.json();

    const newEducation = await prisma.education.create({
      data: {
        institution: data.institution,
        degree: data.degree,
        field: data.field,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    });

    return NextResponse.json(newEducation);
  } catch (error) {
    console.error("Error creating education:", error);
    return NextResponse.json(
      { error: "Failed to create education" },
      { status: 500 }
    );
  }
}
