import serverAuth from "@/lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await serverAuth();

    const movies = await prismadb.movie.findMany();

    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    console.log("[MOVIES_GET]", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}