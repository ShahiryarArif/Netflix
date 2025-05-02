import { auth } from "@/app/api/auth/[...nextauth]/route";

const serverAuth = async (req: Request) => {
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