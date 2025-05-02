"use client";

import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <>
    <p className="text-2xl text-green-500">Test aaoo</p>
    <button onClick={() => signOut()} className="bg-red-500 text-white p-4 rounded-md">
      Sign out
    </button>
    </>
  );
}
