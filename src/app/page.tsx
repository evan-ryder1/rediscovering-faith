import Link from "next/link";
import Image from "next/image";

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
    <main className="brand-page text-[#241914]">
      <section className="sunburst-panel mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-16">
        <div className="relative z-10">
          <p className="brand-kicker mb-4 inline-flex border border-[#ff8a45]/35 bg-white px-3 py-1">
            Rediscovering Faith
          </p>
          <h1 className="brand-display max-w-3xl text-5xl sm:text-7xl lg:text-8xl">
            Listen deeper. Find community.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6e5b50]">
            A home for Christian podcast listeners to move from episode moments
            into honest reflection, shared questions, prayer, and belonging.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="brand-button px-5 py-3 text-sm"
              href="/podcasts"
            >
              Browse Podcasts
            </Link>
            <Link
              className="brand-button-secondary px-5 py-3 text-sm"
              href="/episodes"
            >
              View Episodes
            </Link>
          </div>
        </div>

        <section className="brand-card relative z-10 p-6">
          <Image
            alt="Rediscovering Faith logo"
            className="mb-6 aspect-square w-full max-w-60 border border-[#f1d8c7] object-cover"
            height={240}
            priority
            src="/brand/rediscovering-faith-logo.png"
            width={240}
          />
          <p className="brand-kicker">
            Featured Podcast
          </p>
          <h2 className="mt-2 text-3xl font-black">{featuredPodcast.title}</h2>
          <p className="mt-4 leading-7 text-[#6e5b50]">
            {featuredPodcast.description}
          </p>
          <dl className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="border-l-4 border-[#ff8a45] bg-[#fff4ea] p-4">
              <dt className="text-sm font-bold text-[#6e5b50]">Podcasts</dt>
              <dd className="mt-1 text-3xl font-black">
                {samplePodcasts.length}
              </dd>
            </div>
            <div className="border-l-4 border-[#e85f1f] bg-[#fff4ea] p-4">
              <dt className="text-sm font-bold text-[#6e5b50]">Episodes</dt>
              <dd className="mt-1 text-3xl font-black">
                {featuredEpisodes.length}
              </dd>
            </div>
            <div className="border-l-4 border-[#241914] bg-[#fff4ea] p-4">
              <dt className="text-sm font-bold text-[#6e5b50]">Segments</dt>
              <dd className="mt-1 text-3xl font-black">{transcriptCount}</dd>
            </div>
          </dl>
        </section>
      </section>
    </main>
  );
}
