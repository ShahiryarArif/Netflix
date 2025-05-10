// app/api/favorites/route.ts
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { currentUser } = await serverAuth();

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