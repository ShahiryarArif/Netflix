"use client";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import MovieList from "@/components/MovieList";
import Billboard from "@/components/BillBoard";
import useMoviesList from "@/hooks/useMoviesList";
import useFavorites from "@/hooks/useFavorites";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const { isOpen, closeModal } = useInfoModal();

  if (!session) {
    router.push("/auth");
  }

  const { data: movies, isLoading: loadingMovies, error: moviesError } = useMoviesList();
  const { data: favoriteMovies, isLoading: loadingFavorites, error: favoritesError } = useFavorites();

  if (loadingMovies || loadingFavorites) {
    return <div>Loading...</div>;
  }

  if (moviesError || favoritesError) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies || []}/>
        <MovieList title="My List" data={favoriteMovies || []}/>
      </div>
    </>
  );
}
