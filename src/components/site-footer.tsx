export function SiteFooter() {
  return (
    <footer className="border-t border-[#f1d8c7] bg-[#241914] text-white">
      <div className="brand-orange-rule" />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-6 text-sm sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <p className="font-black uppercase tracking-[0.12em]">
          Rediscovering Faith
        </p>
        <p className="text-white/70">
          Capstone build focused on Christian podcast community.
        </p>
      </div>
    </footer>
  );
}
