import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { without } from "lodash";

export default async function POST(req: Request) {
  try {
    const { currentUser } = await serverAuth();

    const body = await req.json();
    const { movieId } = body;

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      return NextResponse.json("Movie not found", { status: 404 });
    }

    const user = await prismadb.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favoriteIds: {
          push: movieId,
        },
      },
    });

    return NextResponse.json({ status: 200 });
  }
  catch (error) {
    console.log("[FAVORITE_POST]", error);
    return NextResponse.json("Internal error", { status: 500 });
  } 
}

export async function DELETE(req: Request) {
  try {
    const { currentUser } = await serverAuth();

    const body = await req.json();
    const { movieId } = body;

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      return NextResponse.json("Movie not found", { status: 404 });
    }

    const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

    const user = await prismadb.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favoriteIds: {
          set: updatedFavoriteIds,
        },
      },
    });

    return NextResponse.json(user, { status: 200 });
  }
  catch (error) {
    console.log("[FAVORITE_DELETE]", error);
    return NextResponse.json("Internal error", { status: 500 });
  } 
}
