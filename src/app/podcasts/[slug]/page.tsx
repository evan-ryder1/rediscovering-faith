import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  formatEpisodeDuration,
  formatPublishedDate,
  getEpisodeCountForPodcast,
  getEpisodesForPodcast,
  getPodcastBySlug,
  getTranscriptCountForPodcast,
  samplePodcasts,
} from "@/data/sample-content";

type PodcastDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return samplePodcasts.map((podcast) => ({
    slug: podcast.slug,
  }));
}

export async function generateMetadata({
  params,
}: PodcastDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const podcast = getPodcastBySlug(slug);

  if (!podcast) {
    return {
      title: "Podcast Not Found | Rediscovering Faith",
    };
  }

  return {
    title: `${podcast.title} | Rediscovering Faith`,
    description: podcast.description,
  };
}

export default async function PodcastDetailPage({
  params,
}: PodcastDetailPageProps) {
  const { slug } = await params;
  const podcast = getPodcastBySlug(slug);

  if (!podcast) {
    notFound();
  }

  const episodes = getEpisodesForPodcast(podcast.id);
  const episodeCount = getEpisodeCountForPodcast(podcast.id);
  const transcriptCount = getTranscriptCountForPodcast(podcast.id);

  return (
    <main className="bg-[#f8f4ed] px-6 py-10 text-[#211a16] sm:px-10 lg:px-12">
      <section className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <Link
            className="text-sm font-bold text-[#c34417] transition hover:text-[#9f3614]"
            href="/podcasts"
          >
            Back to podcasts
          </Link>
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.15em] text-[#c34417]">
            Podcast Detail
          </p>
          <h1 className="mt-2 text-4xl font-black sm:text-5xl">
            {podcast.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5f5148]">
            {podcast.description}
          </p>

          <dl className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="border-l-4 border-[#e45d1f] bg-white p-4">
              <dt className="text-sm font-bold text-[#6b5c52]">Host</dt>
              <dd className="mt-1 text-xl font-black">{podcast.hostName}</dd>
            </div>
            <div className="border-l-4 border-[#2f7d63] bg-white p-4">
              <dt className="text-sm font-bold text-[#6b5c52]">Episodes</dt>
              <dd className="mt-1 text-3xl font-black">{episodeCount}</dd>
            </div>
            <div className="border-l-4 border-[#4561a8] bg-white p-4">
              <dt className="text-sm font-bold text-[#6b5c52]">
                Transcript Segments
              </dt>
              <dd className="mt-1 text-3xl font-black">{transcriptCount}</dd>
            </div>
          </dl>

          <div className="mt-6 border border-[#dfd2c3] bg-white p-5">
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#c34417]">
              Theme
            </p>
            <p className="mt-2 text-xl font-black">{podcast.theme}</p>
          </div>
        </div>

        <section className="border border-[#dfd2c3] bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-2 border-b border-[#eadfd5] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#c34417]">
                Episodes
              </p>
              <h2 className="mt-1 text-3xl font-black">Available Episodes</h2>
            </div>
            <p className="text-sm font-bold text-[#6b5c52]">
              Newest episodes first
            </p>
          </div>

          {episodes.length > 0 ? (
            <div className="mt-5 grid gap-4">
              {episodes.map((episode) => (
                <article
                  className="border-l-4 border-[#e45d1f] bg-[#f8f4ed] p-5"
                  key={episode.id}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-bold text-[#6b5c52]">
                        {formatPublishedDate(episode.publishedAt)}
                      </p>
                      <h3 className="mt-2 text-2xl font-black">
                        {episode.title}
                      </h3>
                    </div>
                    <span className="w-fit rounded-md bg-white px-3 py-2 text-sm font-bold text-[#4f453e]">
                      {formatEpisodeDuration(episode.durationSeconds)}
                    </span>
                  </div>
                  <p className="mt-3 leading-7 text-[#5f5148]">
                    {episode.description}
                  </p>
                  <p className="mt-4 text-sm font-bold text-[#c34417]">
                    Episode detail and transcript view coming next in Sprint 1
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-5 border border-dashed border-[#d6c6b8] bg-[#f8f4ed] p-6">
              <h3 className="text-xl font-black">No episodes yet</h3>
              <p className="mt-2 text-[#5f5148]">
                Episodes added to this podcast will appear here.
              </p>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
