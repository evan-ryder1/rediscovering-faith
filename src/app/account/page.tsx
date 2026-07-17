import { AccountPanel } from "@/components/account-panel";

export default function AccountPage() {
  return (
    <main className="brand-page flex flex-1 px-6 py-10 text-[#241914] sm:px-10 lg:px-12">
      <div className="mx-auto w-full max-w-7xl">
        <AccountPanel />
      </div>
    </main>
  );
}
