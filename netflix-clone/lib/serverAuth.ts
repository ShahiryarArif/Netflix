import { authConfig } from "@/app/api/auth/config";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

const serverAuth = async () => {
  const session = await getServerSession(authConfig);

  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }
  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return { currentUser };
}

export default serverAuth;