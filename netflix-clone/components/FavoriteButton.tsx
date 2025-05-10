import { AiOutlinePlus } from "react-icons/ai";

interface FavoriteButtonProps {
  movieId: string;
}

export default function FavoriteButton({ movieId }: FavoriteButtonProps) {

  return (
    <div className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:bg-neutral-300">
      <AiOutlinePlus size={30} className="text-white" />
    </div>
  );
}