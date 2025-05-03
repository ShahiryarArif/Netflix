import auth from "next-auth";
export { auth as middlewareAuth };
export { getServerSession as auth } from "next-auth";
export * from "@/lib/auth.config";
