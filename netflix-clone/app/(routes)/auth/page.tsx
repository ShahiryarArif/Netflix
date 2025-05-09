"use client";

import Input from "@/components/input";
import axios from "axios";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "login" ? "register" : "login"));
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        name,
        email,
        password,
      });

      login();
    } catch (error) {
      console.error("Error registering: ", error);
    }
  }, [name, email, password]);

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
            <button onClick={variant === "login" ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <button onClick={() => signIn("google", { callbackUrl: "/profiles" })} className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FcGoogle size={30} />
              </button>
              <button onClick={() => signIn("github", { callbackUrl: "/profiles" })} className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FaGithub size={30} />
              </button>
            </div>
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