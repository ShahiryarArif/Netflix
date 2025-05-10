import { getServerSession } from "next-auth";
import SignoutButton from "@/components/SignoutButton";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import MovieList from "@/components/MovieList";
import Billboard from "@/components/BillBoard";
import prismadb from "@/lib/prismadb";

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    redirect('/auth');
  }
  const movies = await prismadb.movie.findMany();

  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies || []}/>
      </div>
    </>
  );
}
