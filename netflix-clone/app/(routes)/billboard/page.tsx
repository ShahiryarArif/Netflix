"use client";
import useBillboard from "@/hooks/useBillboard";

const Billboard = () => {
  const { data } = useBillboard();

  return (
    <div className="h-[56.25vw] w-full">
      <video
        className="w-full h-[56.25vw] object-cover brightness-[60%]"
        autoPlay
        muted
        loop
        poster={data?.thumbnailUrl}
        src={data?.videoUrl}
      />
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-2xl md:text-4xl h-full w-[50%] lg:w-[40%] font-bold drop-shadow-xl">
          {data?.title}
        </p>
      </div>
    </div>
  );
}

export default Billboard;