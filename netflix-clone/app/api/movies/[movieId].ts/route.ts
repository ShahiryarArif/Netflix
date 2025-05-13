import serverAuth from "@/lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await serverAuth();

    const body = await req.json();
    const { movieId } = body.query;

    if (typeof movieId !== "string") {
      throw new Error("Invalid ID");
    }

    if(!movieId) {
      throw new Error("Invalid ID");
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      }
    })

    if(!movie) {
      throw new Error("Invalid ID");
    }

    return NextResponse.json(movie, { status: 200 })
  } catch (error) {
    return NextResponse.json({ status: 400 })
  }
}