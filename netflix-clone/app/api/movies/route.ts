import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    await serverAuth(req);

    const movies = await prismadb.movie.findMany();

    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    console.log("[MOVIES_GET]", error);
    return NextResponse.json("Internal error", { status: 500 });
  }
}