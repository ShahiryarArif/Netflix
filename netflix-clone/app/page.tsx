import { getServerSession } from "next-auth";
import SignoutButton from "@/components/SignoutButton";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    redirect('/auth');
  }

  return (
    <>
      <Navbar />
      <p className="text-2xl text-green-500">Welcome, {session.user?.name}!</p>
      <SignoutButton />
    </>
  );
}
