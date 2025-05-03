import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prismadb.user.findUnique({
          where: { 
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Email does not exist");
        }

        const isPasswordCorrect = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isPasswordCorrect) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  session: { strategy: "jwt" },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  adapter: PrismaAdapter(prismadb),
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});
