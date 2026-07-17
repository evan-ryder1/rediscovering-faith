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
    <main className="brand-page px-6 py-10 text-[#241914] sm:px-10 lg:px-12">
      <section className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <Link
            className="text-sm font-black uppercase tracking-[0.1em] text-[#e85f1f] transition hover:text-[#c94a12]"
            href="/podcasts"
          >
            Back to podcasts
          </Link>
          <p className="brand-kicker mt-8">
            Podcast Detail
          </p>
          <h1 className="brand-display mt-2 text-5xl sm:text-6xl">
            {podcast.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#6e5b50]">
            {podcast.description}
          </p>

          <dl className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="brand-card border-l-4 border-l-[#ff8a45] p-4">
              <dt className="text-sm font-bold text-[#6e5b50]">Host</dt>
              <dd className="mt-1 text-xl font-black">{podcast.hostName}</dd>
            </div>
            <div className="brand-card border-l-4 border-l-[#e85f1f] p-4">
              <dt className="text-sm font-bold text-[#6e5b50]">Episodes</dt>
              <dd className="mt-1 text-3xl font-black">{episodeCount}</dd>
            </div>
            <div className="brand-card border-l-4 border-l-[#241914] p-4">
              <dt className="text-sm font-bold text-[#6e5b50]">
                Transcript Segments
              </dt>
              <dd className="mt-1 text-3xl font-black">{transcriptCount}</dd>
            </div>
          </dl>

          <div className="brand-card mt-6 p-5">
            <p className="brand-kicker">
              Theme
            </p>
            <p className="mt-2 text-xl font-black uppercase">{podcast.theme}</p>
          </div>
        </div>

        <section className="brand-card p-5">
          <div className="flex flex-col gap-2 border-b border-[#f1d8c7] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="brand-kicker">
                Episodes
              </p>
              <h2 className="mt-1 text-3xl font-black uppercase">
                Available Episodes
              </h2>
            </div>
            <p className="text-sm font-bold text-[#6e5b50]">
              Newest episodes first
            </p>
          </div>

          {episodes.length > 0 ? (
            <div className="mt-5 grid gap-4">
              {episodes.map((episode) => (
                <article
                  className="border-l-4 border-[#ff8a45] bg-[#fff4ea] p-5"
                  key={episode.id}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-bold text-[#6e5b50]">
                        {formatPublishedDate(episode.publishedAt)}
                      </p>
                      <Link href={`/episodes/${episode.slug}`}>
                        <h3 className="mt-2 text-2xl font-black uppercase leading-tight transition hover:text-[#e85f1f]">
                          {episode.title}
                        </h3>
                      </Link>
                    </div>
                    <span className="w-fit rounded-md bg-white px-3 py-2 text-sm font-black text-[#4f453e]">
                      {formatEpisodeDuration(episode.durationSeconds)}
                    </span>
                  </div>
                  <p className="mt-3 leading-7 text-[#6e5b50]">
                    {episode.description}
                  </p>
                  <Link
                    className="mt-4 inline-flex text-sm font-black uppercase tracking-[0.1em] text-[#e85f1f] transition hover:text-[#c94a12]"
                    href={`/episodes/${episode.slug}`}
                  >
                    Open episode and transcript
                  </Link>
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
