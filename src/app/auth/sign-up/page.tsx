import Link from "next/link";

import { AuthForm } from "@/components/auth-form";

export default function SignUpPage() {
  return (
    <main className="brand-page flex flex-1 px-6 py-10 text-[#241914] sm:px-10 lg:px-12">
      <section className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="brand-kicker">Join The Community</p>
          <h1 className="brand-display mt-2 text-5xl sm:text-6xl">Sign up</h1>
          <p className="mt-4 leading-7 text-[#6e5b50]">
            Create a listener profile for saved episodes, transcript moments,
            and future discussion features.
          </p>
          <p className="mt-6 text-sm font-bold text-[#6e5b50]">
            Already have an account?{" "}
            <Link className="text-[#e85f1f]" href="/auth/sign-in">
              Sign in
            </Link>
          </p>
        </div>

        <AuthForm mode="sign-up" />
      </section>
    </main>
  );
}
