"use client";

import Link from "next/link";

import { useAuth } from "@/components/auth-provider";

export function AuthNav() {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <Link
          className="rounded-md px-3 py-2 text-sm font-black text-[#4f453e] transition hover:bg-[#fff4ea] hover:text-[#e85f1f]"
          href="/auth/sign-in"
        >
          Sign In
        </Link>
        <Link
          className="brand-button px-3 py-2 text-sm"
          href="/auth/sign-up"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        className="rounded-md px-3 py-2 text-sm font-black text-[#4f453e] transition hover:bg-[#fff4ea] hover:text-[#e85f1f]"
        href="/account"
      >
        {user.name}
      </Link>
      <button
        className="rounded-md px-3 py-2 text-sm font-black text-[#4f453e] transition hover:bg-[#fff4ea] hover:text-[#e85f1f]"
        onClick={signOut}
        type="button"
      >
        Sign Out
      </button>
    </div>
  );
}
