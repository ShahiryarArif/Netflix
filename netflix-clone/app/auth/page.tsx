"use client";

import Input from "@/components/input";
import Image from "next/image";
import { useState } from "react";

export default () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-cover bg-center bg-fixed bg-no-repeat">
      <div className="bg-black lg:bg-black/50 w-full h-full">
        <nav className="px-12` py-5">
          <Image src="/images/logo.png" alt="Logo" width={100} height={100} className="h-12 w-auto" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black/70 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">Sign in</h2>
            <div className="flex flex-col gap-4">
              <Input label="Name" id="name" onChange={(e) => setName(e.target.value)} value={name} />
              <Input label="Email" id="email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
              <Input label="Password" id="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              Login
            </button>
            <p className="text-neutral-500 mt-12">
              First time using Netflix?{" "}
              <span className="text-white ml-1 hover:underline cursor-pointer">Create an account</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}