import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/podcasts", label: "Podcasts" },
  { href: "/episodes", label: "Episodes" },
  { href: "/auth/sign-in", label: "Sign In" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-[#f1d8c7] bg-white/92 backdrop-blur">
      <div className="brand-orange-rule" />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-4 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <Link className="group flex w-fit items-center gap-3" href="/">
          <Image
            alt="Rediscovering Faith"
            className="h-14 w-14 border border-[#f1d8c7] object-cover"
            height={56}
            priority
            src="/brand/rediscovering-faith-logo.png"
            width={56}
          />
          <span>
            <span className="block text-xs font-black uppercase tracking-[0.18em] text-[#e85f1f]">
              Rediscovering Faith
            </span>
            <span className="mt-1 block text-xl font-black uppercase leading-none text-[#241914] transition group-hover:text-[#e85f1f]">
              Podcast Community
            </span>
          </span>
        </Link>

        <nav className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => (
            <Link
              className="rounded-md px-3 py-2 text-sm font-black text-[#4f453e] transition hover:bg-[#fff4ea] hover:text-[#e85f1f]"
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
