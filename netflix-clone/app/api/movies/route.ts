import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await serverAuth();

    const movies = prismadb.movie.findMany();

    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    console.log("[MOVIES_GET]", error);
    return NextResponse.json("Internal error", { status: 500 });
  }
}