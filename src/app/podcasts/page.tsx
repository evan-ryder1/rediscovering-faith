import { samplePodcasts } from "@/data/sample-content";

export default function PodcastsPage() {
  return (
    <main className="bg-[#f8f4ed] px-6 py-10 text-[#211a16] sm:px-10 lg:px-12">
      <section className="mx-auto w-full max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#c34417]">
          Podcast Library
        </p>
        <h1 className="mt-2 text-4xl font-black">Podcasts</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {samplePodcasts.map((podcast) => (
            <article
              className="border border-[#dfd2c3] bg-white p-5 shadow-sm"
              key={podcast.id}
            >
              <p className="text-sm font-bold text-[#c34417]">
                {podcast.hostName}
              </p>
              <h2 className="mt-2 text-2xl font-black">{podcast.title}</h2>
              <p className="mt-3 leading-7 text-[#5f5148]">
                {podcast.description}
              </p>
              <p className="mt-4 border-l-4 border-[#e45d1f] pl-3 text-sm font-bold text-[#4f453e]">
                {podcast.theme}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
