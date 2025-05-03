import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
  
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 422 });
    }
  
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json({ message: "Email already exists" }, { status: 422 });
    }

    const hashedPassword = await hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        name,
        email,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });
    

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({ message: "Error registering user" }, { status: 400 });
  }
}