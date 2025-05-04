import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getServerSession();

  if (!session) {
    redirect('/auth');
  }
  
  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">Who is watching?</h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <Link href="/">
            <div className="group flex-row w-44 mx-auto">
              <div className="w-44 max-h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden transition">
                <Image src={"/images/default-blue.png"} alt="Profile" width={100} height={100} className="rounded-md w-44 max-h-44" />
              </div>
              <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">{session?.user?.name}</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}