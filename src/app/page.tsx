const sprintItems = [
  {
    title: "Foundation",
    label: "Sprint 1",
    items: ["Auth setup", "Podcast pages", "Transcript display"],
  },
  {
    title: "Community",
    label: "Sprint 2",
    items: ["Timestamped comments", "Discussion boards", "Saved episodes"],
  },
  {
    title: "Care Tools",
    label: "Sprint 3",
    items: ["Pastor roles", "Moderation", "Prayer requests"],
  },
  {
    title: "Launch",
    label: "Sprint 4",
    items: ["Groups", "Analytics", "Deployment polish"],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f4ed] text-[#211a16]">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-10 lg:px-12">
        <nav className="flex items-center justify-between border-b border-[#ded1c3] pb-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#c34417]">
              Capstone Project
            </p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              Rediscovering Faith
            </h1>
          </div>
          <a
            className="rounded-md bg-[#21201e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3a342f]"
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Setup
          </a>
        </nav>

        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-4 inline-flex rounded-md border border-[#e45d1f]/30 bg-white px-3 py-1 text-sm font-semibold text-[#b64018]">
              Sprint 1 is underway
            </p>
            <h2 className="max-w-3xl text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
              Turn podcast listeners into a living online community.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f5148]">
              Christian podcasts are often one-way experiences. Rediscovering
              Faith creates a shared space for transcripts, timestamped
              conversation, prayer, groups, and church leader tools.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="border-l-4 border-[#e45d1f] bg-white p-4">
                <p className="text-3xl font-black">4</p>
                <p className="text-sm font-medium text-[#6b5c52]">
                  one-week sprints
                </p>
              </div>
              <div className="border-l-4 border-[#2f7d63] bg-white p-4">
                <p className="text-3xl font-black">Next.js</p>
                <p className="text-sm font-medium text-[#6b5c52]">
                  frontend foundation
                </p>
              </div>
              <div className="border-l-4 border-[#4561a8] bg-white p-4">
                <p className="text-3xl font-black">Supabase</p>
                <p className="text-sm font-medium text-[#6b5c52]">
                  data, auth, storage
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {sprintItems.map((sprint) => (
              <article
                className="border border-[#dfd2c3] bg-white p-5 shadow-sm"
                key={sprint.label}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#d14c18]">
                      {sprint.label}
                    </p>
                    <h3 className="mt-1 text-2xl font-black">
                      {sprint.title}
                    </h3>
                  </div>
                  <span className="rounded-md bg-[#f4e4d7] px-3 py-1 text-sm font-bold text-[#9f3614]">
                    Planned
                  </span>
                </div>
                <ul className="mt-4 grid gap-2 text-sm font-medium text-[#5f5148] sm:grid-cols-3">
                  {sprint.items.map((item) => (
                    <li className="border-l border-[#e45d1f] pl-3" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
