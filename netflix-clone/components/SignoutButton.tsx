"use client";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button onClick={() => signOut()} className="bg-white w-full h-10">
      Logout!
    </button>
  );
}