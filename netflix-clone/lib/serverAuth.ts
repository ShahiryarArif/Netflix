import prismadb from "@/lib/prismadb";
import { auth } from "@/lib/serverAuth";

const serverAuth = async () => {
  const session = await auth();

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