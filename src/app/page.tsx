import Link from "next/link";

import {
  getEpisodesForPodcast,
  samplePodcasts,
  sampleTranscriptSegments,
} from "@/data/sample-content";

export default function Home() {
  const featuredPodcast = samplePodcasts[0];
  const featuredEpisodes = getEpisodesForPodcast(featuredPodcast.id);
  const transcriptCount = sampleTranscriptSegments.length;

  return (
    <main className="bg-[#f8f4ed] text-[#211a16]">
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-16">
        <div>
          <p className="mb-4 inline-flex rounded-md border border-[#e45d1f]/30 bg-white px-3 py-1 text-sm font-semibold text-[#b64018]">
            Sprint 1 foundation
          </p>
          <h1 className="max-w-3xl text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
            Episodes first. Community next.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f5148]">
            Rediscovering Faith starts with a strong podcast and episode
            experience, then builds toward timestamped discussion, prayer, and
            group connection.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="rounded-md bg-[#21201e] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#3a342f]"
              href="/podcasts"
            >
              Browse Podcasts
            </Link>
            <Link
              className="rounded-md border border-[#d6c6b8] bg-white px-5 py-3 text-sm font-bold text-[#3f342e] transition hover:border-[#c34417] hover:text-[#c34417]"
              href="/episodes"
            >
              View Episodes
            </Link>
          </div>
        </div>

        <section className="border border-[#dfd2c3] bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#c34417]">
            Featured Podcast
          </p>
          <h2 className="mt-2 text-3xl font-black">{featuredPodcast.title}</h2>
          <p className="mt-4 leading-7 text-[#5f5148]">
            {featuredPodcast.description}
          </p>
          <dl className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="border-l-4 border-[#e45d1f] bg-[#f8f4ed] p-4">
              <dt className="text-sm font-bold text-[#6b5c52]">Podcasts</dt>
              <dd className="mt-1 text-3xl font-black">
                {samplePodcasts.length}
              </dd>
            </div>
            <div className="border-l-4 border-[#2f7d63] bg-[#f8f4ed] p-4">
              <dt className="text-sm font-bold text-[#6b5c52]">Episodes</dt>
              <dd className="mt-1 text-3xl font-black">
                {featuredEpisodes.length}
              </dd>
            </div>
            <div className="border-l-4 border-[#4561a8] bg-[#f8f4ed] p-4">
              <dt className="text-sm font-bold text-[#6b5c52]">Segments</dt>
              <dd className="mt-1 text-3xl font-black">{transcriptCount}</dd>
            </div>
          </dl>
        </section>
      </section>
    </main>
  );
}
