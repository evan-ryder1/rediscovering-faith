export default function SignInPage() {
  return (
    <main className="flex flex-1 bg-[#f8f4ed] px-6 py-10 text-[#211a16] sm:px-10 lg:px-12">
      <section className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#c34417]">
            Account Access
          </p>
          <h1 className="mt-2 text-4xl font-black">Sign in</h1>
          <p className="mt-4 leading-7 text-[#5f5148]">
            Return to your saved episodes, transcript notes, and community
            conversations.
          </p>
        </div>

        <form className="border border-[#dfd2c3] bg-white p-6 shadow-sm">
          <label className="block text-sm font-bold text-[#4f453e]" htmlFor="email">
            Email
          </label>
          <input
            className="mt-2 w-full border border-[#d6c6b8] px-3 py-3 text-base outline-none focus:border-[#c34417]"
            id="email"
            name="email"
            type="email"
          />

          <label
            className="mt-5 block text-sm font-bold text-[#4f453e]"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="mt-2 w-full border border-[#d6c6b8] px-3 py-3 text-base outline-none focus:border-[#c34417]"
            id="password"
            name="password"
            type="password"
          />

          <button
            className="mt-6 w-full rounded-md bg-[#21201e] px-5 py-3 text-sm font-bold text-white"
            type="button"
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}
