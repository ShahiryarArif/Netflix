import serverAuth from "@/lib/serverAuth";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  try {
    await serverAuth(req);

    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovie = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return NextResponse.json(randomMovie[0], { status: 200 });
  } catch (error) {
    console.error("Error generating random number:", error);
    return new Response(JSON.stringify({ message: "Error generating random number" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}