import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EpisodeTranscriptComments } from "@/components/episode-transcript-comments";
import { EpisodeSaveActions } from "@/components/episode-save-actions";
import {
  formatEpisodeDuration,
  formatPublishedDate,
  getEpisodeBySlug,
  getPodcastForEpisode,
  getTranscriptForEpisode,
  sampleEpisodes,
} from "@/data/sample-content";

type EpisodeDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return sampleEpisodes.map((episode) => ({
    slug: episode.slug,
  }));
}

export async function generateMetadata({
  params,
}: EpisodeDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);

  if (!episode) {
    return {
      title: "Episode Not Found | Rediscovering Faith",
    };
  }

  return {
    title: `${episode.title} | Rediscovering Faith`,
    description: episode.description,
  };
}

export default async function EpisodeDetailPage({
  params,
}: EpisodeDetailPageProps) {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);

  if (!episode) {
    notFound();
  }

  const podcast = getPodcastForEpisode(episode.id);
  const transcript = getTranscriptForEpisode(episode.id);

  return (
    <main className="brand-page px-6 py-10 text-[#241914] sm:px-10 lg:px-12">
      <section className="sunburst-panel mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative z-10">
          <Link
            className="text-sm font-black uppercase tracking-[0.1em] text-[#e85f1f] transition hover:text-[#c94a12]"
            href={podcast ? `/podcasts/${podcast.slug}` : "/episodes"}
          >
            Back to podcast
          </Link>
          <p className="brand-kicker mt-8">Episode Detail</p>
          <h1 className="brand-display mt-2 text-5xl sm:text-6xl">
            {episode.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#6e5b50]">
            {episode.description}
          </p>
          <EpisodeSaveActions episodeId={episode.id} />

          <dl className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="brand-card border-l-4 border-l-[#ff8a45] p-4">
              <dt className="text-sm font-bold text-[#6e5b50]">Podcast</dt>
              <dd className="mt-1 text-lg font-black uppercase leading-tight">
                {podcast?.title}
              </dd>
            </div>
            <div className="brand-card border-l-4 border-l-[#e85f1f] p-4">
              <dt className="text-sm font-bold text-[#6e5b50]">Published</dt>
              <dd className="mt-1 text-xl font-black">
                {formatPublishedDate(episode.publishedAt)}
              </dd>
            </div>
            <div className="brand-card border-l-4 border-l-[#241914] p-4">
              <dt className="text-sm font-bold text-[#6e5b50]">Duration</dt>
              <dd className="mt-1 text-3xl font-black">
                {formatEpisodeDuration(episode.durationSeconds)}
              </dd>
            </div>
          </dl>

          <section className="brand-card mt-6 p-5">
            <p className="brand-kicker">Audio</p>
            <div className="mt-4 border-l-4 border-[#ff8a45] bg-[#fff4ea] p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-black uppercase">
                    Episode Player
                  </h2>
                  <p className="mt-2 text-[#6e5b50]">
                    Audio playback will connect to hosted episode media.
                  </p>
                </div>
                <span className="w-fit rounded-md bg-white px-4 py-2 text-sm font-black text-[#4f453e]">
                  {formatEpisodeDuration(episode.durationSeconds)}
                </span>
              </div>
            </div>
          </section>
        </div>

        <section className="brand-card relative z-10 p-5">
          <div className="border-b border-[#f1d8c7] pb-5">
            <p className="brand-kicker">Transcript</p>
            <h2 className="mt-1 text-3xl font-black uppercase">
              Timestamped Transcript
            </h2>
            <p className="mt-2 text-[#6e5b50]">
              These segments are structured so Sprint 2 comments can attach to
              exact moments in an episode.
            </p>
          </div>

          <EpisodeTranscriptComments episodeId={episode.id} segments={transcript} />
        </section>
      </section>
    </main>
  );
}
