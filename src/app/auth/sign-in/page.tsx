export default function SignInPage() {
  return (
    <main className="brand-page flex flex-1 px-6 py-10 text-[#241914] sm:px-10 lg:px-12">
      <section className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="brand-kicker">
            Account Access
          </p>
          <h1 className="brand-display mt-2 text-5xl sm:text-6xl">Sign in</h1>
          <p className="mt-4 leading-7 text-[#6e5b50]">
            Return to your saved episodes, transcript notes, and community
            conversations.
          </p>
        </div>

        <form className="brand-card p-6">
          <label className="block text-sm font-black text-[#4f453e]" htmlFor="email">
            Email
          </label>
          <input
            className="mt-2 w-full border border-[#f1d8c7] px-3 py-3 text-base outline-none focus:border-[#e85f1f]"
            id="email"
            name="email"
            type="email"
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
            type="password"
          />

          <button
            className="brand-button mt-6 w-full px-5 py-3 text-sm"
            type="button"
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}
