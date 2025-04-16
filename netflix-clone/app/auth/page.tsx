"use client";

import Input from "@/components/input";
import Image from "next/image";
import { useCallback, useState } from "react";

export default () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "login" ? "register" : "login"));
  }, []);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-cover bg-center bg-fixed bg-no-repeat">
      <div className="bg-black lg:bg-black/50 w-full h-full">
        <nav className="px-12` py-5">
          <Image src="/images/logo.png" alt="Logo" width={100} height={100} className="h-12 w-auto" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black/70 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input label="Username" id="name" onChange={(e) => setName(e.target.value)} value={name} />
              )}
              <Input label="Email" id="email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
              <Input label="Password" id="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant === "login" ? "First time using Netflix?" : "Already have an account?"}
              <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}