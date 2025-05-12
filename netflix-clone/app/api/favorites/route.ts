// app/api/favorites/route.ts
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { currentUser } = await serverAuth(req);

    if (!currentUser?.favoriteIds) {
      return NextResponse.json([], { status: 200 });
    }

    const movies = await prismadb.movie.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    console.log("[FAVORITES_GET]", error);
    return NextResponse.json("Internal error", { status: 500 });
  }
}