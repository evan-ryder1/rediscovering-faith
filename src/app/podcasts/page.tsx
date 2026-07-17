import Link from "next/link";

import {
  getEpisodeCountForPodcast,
  getTranscriptCountForPodcast,
  samplePodcasts,
} from "@/data/sample-content";

export default function PodcastsPage() {
  return (
    <main className="brand-page px-6 py-10 text-[#241914] sm:px-10 lg:px-12">
      <section className="mx-auto w-full max-w-7xl">
        <p className="brand-kicker">
          Podcast Library
        </p>
        <div className="mt-2 grid gap-4 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <div>
            <h1 className="brand-display text-5xl sm:text-6xl">Podcasts</h1>
            <p className="mt-3 max-w-2xl leading-7 text-[#6e5b50]">
              Browse Christian podcasts created for deeper listening,
              transcript-guided reflection, and shared conversation.
            </p>
          </div>
          <div className="brand-card border-l-4 border-l-[#ff8a45] p-4">
            <p className="text-sm font-bold text-[#6e5b50]">Listening Path</p>
            <p className="mt-1 text-xl font-black">
              Podcast to episode to transcript
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {samplePodcasts.map((podcast) => (
            <Link
              className="brand-card group flex flex-col p-5 transition hover:border-[#ff8a45]"
              href={`/podcasts/${podcast.slug}`}
              key={podcast.id}
            >
              <p className="text-sm font-black uppercase tracking-[0.1em] text-[#e85f1f]">
                {podcast.hostName}
              </p>
              <h2 className="mt-2 text-2xl font-black uppercase leading-tight transition group-hover:text-[#e85f1f]">
                {podcast.title}
              </h2>
              <p className="mt-3 leading-7 text-[#6e5b50]">
                {podcast.description}
              </p>
              <p className="mt-4 border-l-4 border-[#ff8a45] pl-3 text-sm font-bold text-[#4f453e]">
                {podcast.theme}
              </p>
              <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-[#f1d8c7] pt-4">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.12em] text-[#8a7a70]">
                    Episodes
                  </dt>
                  <dd className="mt-1 text-2xl font-black">
                    {getEpisodeCountForPodcast(podcast.id)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.12em] text-[#8a7a70]">
                    Segments
                  </dt>
                  <dd className="mt-1 text-2xl font-black">
                    {getTranscriptCountForPodcast(podcast.id)}
                  </dd>
                </div>
              </dl>
              <span className="mt-5 text-sm font-black uppercase tracking-[0.1em] text-[#e85f1f]">
                View podcast
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
