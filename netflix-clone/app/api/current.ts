import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export default async function GET(req: Request) {
  try {
    const { currentUser } = await serverAuth(req);

    return NextResponse.json(currentUser, { status: 200 });
  } catch (error) {
    console.error("Error fetching current user:", error);
    return NextResponse.json({ message: "Error fetching current user" }, { status: 400 });
  }
}