import Link from "next/link";

const navItems = [
  { href: "/podcasts", label: "Podcasts" },
  { href: "/episodes", label: "Episodes" },
  { href: "/auth/sign-in", label: "Sign In" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-[#ded1c3] bg-[#f8f4ed]/95">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-5 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <Link className="group w-fit" href="/">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c34417]">
            Rediscovering Faith
          </p>
          <span className="mt-1 block text-2xl font-black text-[#211a16] transition group-hover:text-[#9f3614]">
            Podcast Community
          </span>
        </Link>

        <nav className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => (
            <Link
              className="rounded-md px-3 py-2 text-sm font-bold text-[#4f453e] transition hover:bg-white hover:text-[#c34417]"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
