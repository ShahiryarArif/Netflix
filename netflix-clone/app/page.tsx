import { auth } from "@/auth";
import SignoutButton from "@/components/SignoutButton";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect('/auth');
  }

  return (
    <>
      <p className="text-2xl text-green-500">Welcome, {session.user?.name}!</p>
      <SignoutButton />
    </>
  );
}
