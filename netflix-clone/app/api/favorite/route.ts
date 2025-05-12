import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { without } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { currentUser } = await serverAuth(req);

    const { movieId } = req.body;

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

    return res.status(200);
  }
  catch (error) {
    console.log("[FAVORITE_POST]", error);
    return res.status(500).end();
  } 
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { currentUser } = await serverAuth(req);

    const { movieId } = req.body;

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

    return res.status(200).json(user);
  }
  catch (error) {
    console.log("[FAVORITE_DELETE]", error);
    return res.status(500).end();
  } 
}
