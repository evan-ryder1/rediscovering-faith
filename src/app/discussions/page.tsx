import Link from "next/link";

import {
  formatCommentTime,
  sampleDiscussionThreads,
} from "@/data/community-content";
import {
  formatTranscriptTimestamp,
  getEpisodeBySlug,
  getPodcastForEpisode,
  sampleEpisodes,
  sampleTranscriptSegments,
} from "@/data/sample-content";

function getEpisodeById(episodeId: string) {
  return sampleEpisodes.find((episode) => episode.id === episodeId);
}

function getTranscriptSegmentById(transcriptSegmentId?: string) {
  if (!transcriptSegmentId) {
    return undefined;
  }

  return sampleTranscriptSegments.find(
    (segment) => segment.id === transcriptSegmentId,
  );
}

export const metadata = {
  title: "Discussions | Rediscovering Faith",
  description:
    "Community discussion prompts connected to Rediscovering Faith podcast episodes.",
};

export default function DiscussionsPage() {
  const featuredEpisode = getEpisodeBySlug(
    "finding-belonging-after-spiritual-burnout",
  );
  const featuredPodcast = featuredEpisode
    ? getPodcastForEpisode(featuredEpisode.id)
    : undefined;

  return (
    <main className="brand-page px-6 py-10 text-[#241914] sm:px-10 lg:px-12">
      <section className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="brand-kicker">Community Board</p>
          <h1 className="brand-display mt-2 text-5xl sm:text-6xl">
            Discussions
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#6e5b50]">
            Follow episode moments into focused community prompts, replies, and
            shared reflection.
          </p>

          <div className="brand-card mt-8 border-l-4 border-l-[#ff8a45] p-5">
            <p className="brand-kicker">Demo Anchor</p>
            <h2 className="mt-2 text-2xl font-black uppercase">
              {featuredEpisode?.title}
            </h2>
            <p className="mt-2 leading-7 text-[#6e5b50]">
              {featuredPodcast?.title} connects transcript comments to board
              prompts that can grow beyond one timestamp.
            </p>
            {featuredEpisode ? (
              <Link
                className="brand-button mt-5 inline-flex px-5 py-3 text-sm"
                href={`/episodes/${featuredEpisode.slug}`}
              >
                Open Episode
              </Link>
            ) : null}
          </div>
        </div>

        <section className="grid gap-4">
          {sampleDiscussionThreads.map((thread) => {
            const episode = getEpisodeById(thread.episodeId);
            const podcast = episode ? getPodcastForEpisode(episode.id) : undefined;
            const segment = getTranscriptSegmentById(thread.transcriptSegmentId);

            return (
              <article className="brand-card p-5" key={thread.id}>
                <div className="flex flex-col gap-3 border-b border-[#f1d8c7] pb-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="brand-kicker">{podcast?.title}</p>
                    <h2 className="mt-2 text-2xl font-black uppercase leading-tight">
                      {thread.title}
                    </h2>
                  </div>
                  <p className="w-fit bg-[#fff4ea] px-3 py-2 text-xs font-black uppercase tracking-[0.1em] text-[#e85f1f]">
                    {formatCommentTime(thread.createdAt)}
                  </p>
                </div>

                <p className="mt-4 leading-7 text-[#4f453e]">{thread.prompt}</p>

                <dl className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="border-l-4 border-[#ff8a45] bg-[#fff4ea] p-4">
                    <dt className="text-sm font-bold text-[#6e5b50]">Author</dt>
                    <dd className="mt-1 font-black">{thread.authorName}</dd>
                  </div>
                  <div className="border-l-4 border-[#e85f1f] bg-[#fff4ea] p-4">
                    <dt className="text-sm font-bold text-[#6e5b50]">
                      Replies
                    </dt>
                    <dd className="mt-1 text-2xl font-black">
                      {thread.replyCount}
                    </dd>
                  </div>
                  <div className="border-l-4 border-[#241914] bg-[#fff4ea] p-4">
                    <dt className="text-sm font-bold text-[#6e5b50]">
                      Reactions
                    </dt>
                    <dd className="mt-1 text-2xl font-black">
                      {thread.reactionCount}
                    </dd>
                  </div>
                </dl>

                <div className="mt-5 flex flex-wrap gap-3">
                  {episode ? (
                    <Link
                      className="brand-button-secondary px-5 py-3 text-sm"
                      href={`/episodes/${episode.slug}`}
                    >
                      Open Episode
                    </Link>
                  ) : null}
                  {segment ? (
                    <span className="w-fit border border-[#f1d8c7] bg-white px-4 py-3 text-sm font-black text-[#4f453e]">
                      Timestamp {formatTranscriptTimestamp(segment.startSeconds)}
                    </span>
                  ) : null}
                </div>
              </article>
            );
          })}
        </section>
      </section>
    </main>
  );
}
