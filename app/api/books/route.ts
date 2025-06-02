// app/api/books/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const books = await prisma.book.findMany({
    where: { user: { email: session.user.email } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(books);
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
  
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    const body = await req.json();
    const { title, author, status } = body;
  
    try {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email! },
      });
  
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      const newBook = await prisma.book.create({
        data: {
          title,
          author,
          status,
          userId: user.id,
        },
      });
  
      return NextResponse.json(newBook, { status: 201 });
    } catch (err) {
      console.error('Error in POST /api/books:', err);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }
