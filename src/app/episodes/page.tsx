import Link from "next/link";

import {
  formatEpisodeDuration,
  formatPublishedDate,
  sampleEpisodes,
  samplePodcasts,
} from "@/data/sample-content";

export default function EpisodesPage() {
  return (
    <main className="brand-page px-6 py-10 text-[#241914] sm:px-10 lg:px-12">
      <section className="mx-auto w-full max-w-7xl">
        <p className="brand-kicker">
          Episode Library
        </p>
        <h1 className="brand-display mt-2 text-5xl sm:text-6xl">Episodes</h1>
        <p className="mt-3 max-w-2xl leading-7 text-[#6e5b50]">
          Follow conversations from podcast series into specific episode
          moments and transcripts.
        </p>
        <div className="mt-8 grid gap-4">
          {sampleEpisodes.map((episode) => {
            const podcast = samplePodcasts.find(
              (item) => item.id === episode.podcastId,
            );

            return (
              <article
                className="brand-card grid gap-4 p-5 md:grid-cols-[1fr_auto]"
                key={episode.id}
              >
                <div>
                  <Link
                    className="text-sm font-black uppercase tracking-[0.1em] text-[#e85f1f] transition hover:text-[#c94a12]"
                    href={`/podcasts/${podcast?.slug}`}
                  >
                    {podcast?.title}
                  </Link>
                  <Link href={`/episodes/${episode.slug}`}>
                    <h2 className="mt-2 text-2xl font-black uppercase leading-tight transition hover:text-[#e85f1f]">
                      {episode.title}
                    </h2>
                  </Link>
                  <p className="mt-1 text-sm font-bold text-[#8a7a70]">
                    {formatPublishedDate(episode.publishedAt)}
                  </p>
                  <p className="mt-3 leading-7 text-[#6e5b50]">
                    {episode.description}
                  </p>
                  <Link
                    className="mt-4 inline-flex text-sm font-black uppercase tracking-[0.1em] text-[#e85f1f] transition hover:text-[#c94a12]"
                    href={`/episodes/${episode.slug}`}
                  >
                    Open episode
                  </Link>
                </div>
                <div className="min-w-32 border-l-4 border-[#ff8a45] bg-[#fff4ea] p-4">
                  <p className="text-sm font-bold text-[#6e5b50]">Duration</p>
                  <p className="mt-1 text-2xl font-black">
                    {formatEpisodeDuration(episode.durationSeconds)}
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
