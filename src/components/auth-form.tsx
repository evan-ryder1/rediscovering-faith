"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { useAuth } from "@/components/auth-provider";

type AuthFormProps = {
  mode: "sign-in" | "sign-up";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { signIn } = useAuth();
  const [name, setName] = useState("Evan Ryder");
  const [email, setEmail] = useState("evan@example.com");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    signIn({
      name: mode === "sign-up" ? name : email.split("@")[0],
      email,
    });

    router.push("/account");
  }

  return (
    <form className="brand-card p-6" onSubmit={handleSubmit}>
      {mode === "sign-up" ? (
        <>
          <label
            className="block text-sm font-black text-[#4f453e]"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="mt-2 w-full border border-[#f1d8c7] px-3 py-3 text-base outline-none focus:border-[#e85f1f]"
            id="name"
            name="name"
            onChange={(event) => setName(event.target.value)}
            required
            type="text"
            value={name}
          />
        </>
      ) : null}

      <label
        className={mode === "sign-up" ? "mt-5 block text-sm font-black text-[#4f453e]" : "block text-sm font-black text-[#4f453e]"}
        htmlFor="email"
      >
        Email
      </label>
      <input
        className="mt-2 w-full border border-[#f1d8c7] px-3 py-3 text-base outline-none focus:border-[#e85f1f]"
        id="email"
        name="email"
        onChange={(event) => setEmail(event.target.value)}
        required
        type="email"
        value={email}
      />

      <label
        className="mt-5 block text-sm font-black text-[#4f453e]"
        htmlFor="password"
      >
        Password
      </label>
      <input
        className="mt-2 w-full border border-[#f1d8c7] px-3 py-3 text-base outline-none focus:border-[#e85f1f]"
        id="password"
        name="password"
        onChange={(event) => setPassword(event.target.value)}
        required
        type="password"
        value={password}
      />

      <button className="brand-button mt-6 w-full px-5 py-3 text-sm" type="submit">
        {mode === "sign-up" ? "Create Account" : "Sign In"}
      </button>

      <p className="mt-4 text-sm leading-6 text-[#6e5b50]">
        This Sprint 1 form uses a local browser session so the app can show the
        authenticated flow before Supabase Auth is connected.
      </p>
    </form>
  );
}
