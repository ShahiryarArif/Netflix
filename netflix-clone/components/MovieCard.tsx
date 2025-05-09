interface MovieCardProps {
  data: Record<string, any>;
}

export default function MovieCard({ data }: MovieCardProps) {
  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw] md:h-[20vw] lg:h-[18vw] rounded-md overflow-hidden">
      <img
        className="cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-150"
        src={data?.thumbnailUrl}
        alt="Movie Thumbnail"
      />
      <div className="absolute top-0 z-10 w-full h-full transition duration-200 bg-zinc-800 opacity-0 rounded-md p-2 group-hover:bg-opacity-80 group-hover:opacity-100">
        <p className="text-white text-xs md:text-sm lg:text-lg font-semibold truncate w-full">
          {data?.title}
        </p>
      </div>
    </div>
  );
}