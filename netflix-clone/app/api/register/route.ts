import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ message: "Missing required fields" });
  }

  try {
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(422).json({ message: "Email already exists" });
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
    

    return res.status(201).json(user);
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(400).json({ message: "Error registering user" });
  }
}