import { sampleEpisodes, samplePodcasts } from "@/data/sample-content";

export default function EpisodesPage() {
  return (
    <main className="bg-[#f8f4ed] px-6 py-10 text-[#211a16] sm:px-10 lg:px-12">
      <section className="mx-auto w-full max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#c34417]">
          Episode Library
        </p>
        <h1 className="mt-2 text-4xl font-black">Episodes</h1>
        <div className="mt-8 grid gap-4">
          {sampleEpisodes.map((episode) => {
            const podcast = samplePodcasts.find(
              (item) => item.id === episode.podcastId,
            );

            return (
              <article
                className="grid gap-4 border border-[#dfd2c3] bg-white p-5 shadow-sm md:grid-cols-[1fr_auto]"
                key={episode.id}
              >
                <div>
                  <p className="text-sm font-bold text-[#c34417]">
                    {podcast?.title}
                  </p>
                  <h2 className="mt-2 text-2xl font-black">{episode.title}</h2>
                  <p className="mt-3 leading-7 text-[#5f5148]">
                    {episode.description}
                  </p>
                </div>
                <div className="min-w-32 border-l-4 border-[#2f7d63] bg-[#f8f4ed] p-4">
                  <p className="text-sm font-bold text-[#6b5c52]">Duration</p>
                  <p className="mt-1 text-2xl font-black">
                    {Math.round(episode.durationSeconds / 60)} min
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
