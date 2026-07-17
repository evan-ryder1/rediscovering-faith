"use client";

import Link from "next/link";

import { useAuth } from "@/components/auth-provider";

export function AccountPanel() {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <section className="brand-card p-6">
        <p className="brand-kicker">Signed Out</p>
        <h1 className="brand-display mt-2 text-5xl sm:text-6xl">
          Account
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-[#6e5b50]">
          Sign in to see the authenticated listener state for saved episodes,
          transcript notes, and future community tools.
        </p>
        <Link
          className="brand-button mt-6 inline-flex px-5 py-3 text-sm"
          href="/auth/sign-in"
        >
          Sign In
        </Link>
      </section>
    );
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="brand-card p-6">
        <p className="brand-kicker">Signed In</p>
        <h1 className="brand-display mt-2 text-5xl sm:text-6xl">
          {user.name}
        </h1>
        <p className="mt-4 leading-7 text-[#6e5b50]">{user.email}</p>
        <button
          className="brand-button-secondary mt-6 px-5 py-3 text-sm"
          onClick={signOut}
          type="button"
        >
          Sign Out
        </button>
      </div>

      <div className="brand-card p-6">
        <p className="brand-kicker">Listener Dashboard</p>
        <h2 className="mt-2 text-3xl font-black uppercase">Ready for Sprint 2</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="border-l-4 border-[#ff8a45] bg-[#fff4ea] p-4">
            <p className="text-sm font-bold text-[#6e5b50]">Saved Episodes</p>
            <p className="mt-1 text-3xl font-black">0</p>
          </div>
          <div className="border-l-4 border-[#e85f1f] bg-[#fff4ea] p-4">
            <p className="text-sm font-bold text-[#6e5b50]">Transcript Notes</p>
            <p className="mt-1 text-3xl font-black">0</p>
          </div>
          <div className="border-l-4 border-[#241914] bg-[#fff4ea] p-4">
            <p className="text-sm font-bold text-[#6e5b50]">Discussions</p>
            <p className="mt-1 text-3xl font-black">0</p>
          </div>
        </div>
        <p className="mt-5 leading-7 text-[#6e5b50]">
          This page proves the basic authenticated flow now. Supabase Auth can
          replace the local browser session without changing the main user
          experience.
        </p>
      </div>
    </section>
  );
}
