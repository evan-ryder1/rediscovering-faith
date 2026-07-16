import Link from "next/link";

import {
  getEpisodeCountForPodcast,
  getTranscriptCountForPodcast,
  samplePodcasts,
} from "@/data/sample-content";

export default function PodcastsPage() {
  return (
    <main className="bg-[#f8f4ed] px-6 py-10 text-[#211a16] sm:px-10 lg:px-12">
      <section className="mx-auto w-full max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#c34417]">
          Podcast Library
        </p>
        <div className="mt-2 grid gap-4 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <div>
            <h1 className="text-4xl font-black">Podcasts</h1>
            <p className="mt-3 max-w-2xl leading-7 text-[#5f5148]">
              Browse Christian podcasts that will become the foundation for
              episode transcripts, timestamped conversations, and community
              engagement.
            </p>
          </div>
          <div className="border-l-4 border-[#e45d1f] bg-white p-4">
            <p className="text-sm font-bold text-[#6b5c52]">Sprint 1 Focus</p>
            <p className="mt-1 text-xl font-black">
              Podcast CRUD and episode discovery
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {samplePodcasts.map((podcast) => (
            <Link
              className="group flex flex-col border border-[#dfd2c3] bg-white p-5 shadow-sm transition hover:border-[#c34417] hover:shadow-md"
              href={`/podcasts/${podcast.slug}`}
              key={podcast.id}
            >
              <p className="text-sm font-bold text-[#c34417]">
                {podcast.hostName}
              </p>
              <h2 className="mt-2 text-2xl font-black transition group-hover:text-[#9f3614]">
                {podcast.title}
              </h2>
              <p className="mt-3 leading-7 text-[#5f5148]">
                {podcast.description}
              </p>
              <p className="mt-4 border-l-4 border-[#e45d1f] pl-3 text-sm font-bold text-[#4f453e]">
                {podcast.theme}
              </p>
              <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-[#eadfd5] pt-4">
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
              <span className="mt-5 text-sm font-bold text-[#c34417]">
                View podcast
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
