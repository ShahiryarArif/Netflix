import { PrismaClient } from "../app/generated/prisma";

const client = globalThis.prismadb || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismadb = client;
}

export default client;
