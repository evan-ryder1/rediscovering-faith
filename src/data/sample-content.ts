export type TranscriptSegment = {
  id: string;
  episodeId: string;
  startSeconds: number;
  endSeconds: number;
  speakerName: string;
  content: string;
  position: number;
};

export type Episode = {
  id: string;
  podcastId: string;
  title: string;
  slug: string;
  description: string;
  audioUrl: string;
  durationSeconds: number;
  publishedAt: string;
};

export type Podcast = {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImageUrl: string;
  websiteUrl: string;
  hostName: string;
  theme: string;
};

export const samplePodcasts: Podcast[] = [
  {
    id: "podcast-rf-conversations",
    title: "Rediscovering Faith Conversations",
    slug: "rediscovering-faith-conversations",
    description:
      "Honest conversations for people rebuilding trust, asking better questions, and finding a healthier way to belong in Christian community.",
    coverImageUrl: "/sample/podcast-rediscovering-faith.svg",
    websiteUrl: "https://example.com/rediscovering-faith",
    hostName: "Evan Ryder",
    theme: "Faith, doubt, belonging, and spiritual renewal",
  },
  {
    id: "podcast-table-talk",
    title: "Table Talk Theology",
    slug: "table-talk-theology",
    description:
      "Practical conversations that connect theology to ordinary life, relationships, work, grief, and the week-by-week practice of faith.",
    coverImageUrl: "/sample/podcast-table-talk.svg",
    websiteUrl: "https://example.com/table-talk-theology",
    hostName: "Maya Thompson",
    theme: "Everyday theology and discipleship",
  },
  {
    id: "podcast-neighborhood-prayer",
    title: "Neighborhood Prayer",
    slug: "neighborhood-prayer",
    description:
      "Stories from local churches, ministry leaders, and neighbors learning how prayer becomes care, service, and shared responsibility.",
    coverImageUrl: "/sample/podcast-neighborhood-prayer.svg",
    websiteUrl: "https://example.com/neighborhood-prayer",
    hostName: "Pastor Daniel Brooks",
    theme: "Prayer, local church life, and community care",
  },
];

export const sampleEpisodes: Episode[] = [
  {
    id: "episode-belonging-after-burnout",
    podcastId: "podcast-rf-conversations",
    title: "Finding Belonging After Spiritual Burnout",
    slug: "finding-belonging-after-spiritual-burnout",
    description:
      "A conversation about rebuilding spiritual rhythms, naming disappointment honestly, and finding community that makes room for healing.",
    audioUrl: "https://example.com/audio/finding-belonging-after-burnout.mp3",
    durationSeconds: 2684,
    publishedAt: "2026-07-02T12:00:00.000Z",
  },
  {
    id: "episode-questions-without-shame",
    podcastId: "podcast-rf-conversations",
    title: "Asking Hard Questions Without Shame",
    slug: "asking-hard-questions-without-shame",
    description:
      "Why honest questions can become a bridge to deeper faith when they are held inside patient, trustworthy community.",
    audioUrl: "https://example.com/audio/questions-without-shame.mp3",
    durationSeconds: 2411,
    publishedAt: "2026-06-25T12:00:00.000Z",
  },
  {
    id: "episode-sabbath-for-busy-people",
    podcastId: "podcast-table-talk",
    title: "Sabbath for Busy People",
    slug: "sabbath-for-busy-people",
    description:
      "A practical episode about rest, limits, and creating small weekly practices that help faith move from concept to lived experience.",
    audioUrl: "https://example.com/audio/sabbath-for-busy-people.mp3",
    durationSeconds: 1982,
    publishedAt: "2026-07-05T12:00:00.000Z",
  },
  {
    id: "episode-praying-for-your-street",
    podcastId: "podcast-neighborhood-prayer",
    title: "Praying for Your Street",
    slug: "praying-for-your-street",
    description:
      "A local church leader shares how a simple prayer practice helped neighbors become names, stories, and real relationships.",
    audioUrl: "https://example.com/audio/praying-for-your-street.mp3",
    durationSeconds: 2216,
    publishedAt: "2026-06-28T12:00:00.000Z",
  },
];

export const sampleTranscriptSegments: TranscriptSegment[] = [
  {
    id: "segment-belonging-001",
    episodeId: "episode-belonging-after-burnout",
    startSeconds: 0,
    endSeconds: 18,
    speakerName: "Evan",
    content:
      "Welcome back to Rediscovering Faith Conversations. Today we are talking about spiritual burnout and the long road back toward belonging.",
    position: 1,
  },
  {
    id: "segment-belonging-002",
    episodeId: "episode-belonging-after-burnout",
    startSeconds: 19,
    endSeconds: 47,
    speakerName: "Evan",
    content:
      "For many people, the hardest part is not believing again. It is trusting that there is a community where honesty will not be punished.",
    position: 2,
  },
  {
    id: "segment-belonging-003",
    episodeId: "episode-belonging-after-burnout",
    startSeconds: 48,
    endSeconds: 79,
    speakerName: "Guest",
    content:
      "I had to learn that rest was not failure. I had spent years serving from exhaustion, and I needed people who would notice me, not just my usefulness.",
    position: 3,
  },
  {
    id: "segment-belonging-004",
    episodeId: "episode-belonging-after-burnout",
    startSeconds: 80,
    endSeconds: 113,
    speakerName: "Evan",
    content:
      "That distinction matters. Healthy community does not rush people back into productivity. It creates space for repair, grief, and slow trust.",
    position: 4,
  },
  {
    id: "segment-belonging-005",
    episodeId: "episode-belonging-after-burnout",
    startSeconds: 114,
    endSeconds: 142,
    speakerName: "Guest",
    content:
      "The turning point was a small group that let me show up quiet. Nobody needed me to explain everything. They kept making room for me.",
    position: 5,
  },
  {
    id: "segment-belonging-006",
    episodeId: "episode-belonging-after-burnout",
    startSeconds: 143,
    endSeconds: 174,
    speakerName: "Evan",
    content:
      "That is part of why this community exists. A podcast can start the conversation, but people need a place to keep talking after the episode ends.",
    position: 6,
  },
  {
    id: "segment-questions-001",
    episodeId: "episode-questions-without-shame",
    startSeconds: 0,
    endSeconds: 25,
    speakerName: "Evan",
    content:
      "Questions are not the enemy of faith. Very often, questions are how faith becomes honest enough to grow.",
    position: 1,
  },
  {
    id: "segment-questions-002",
    episodeId: "episode-questions-without-shame",
    startSeconds: 26,
    endSeconds: 58,
    speakerName: "Guest",
    content:
      "The difference was finding people who did not panic when I said I was unsure. They listened first, and that helped me listen too.",
    position: 2,
  },
  {
    id: "segment-sabbath-001",
    episodeId: "episode-sabbath-for-busy-people",
    startSeconds: 0,
    endSeconds: 21,
    speakerName: "Maya",
    content:
      "Sabbath begins with a brave admission: I am not infinite, and the world is not held together by my constant motion.",
    position: 1,
  },
  {
    id: "segment-sabbath-002",
    episodeId: "episode-sabbath-for-busy-people",
    startSeconds: 22,
    endSeconds: 49,
    speakerName: "Maya",
    content:
      "For busy people, rest often has to start small. A phone-free meal, a walk, a prayer, a protected hour can become a doorway.",
    position: 2,
  },
  {
    id: "segment-prayer-001",
    episodeId: "episode-praying-for-your-street",
    startSeconds: 0,
    endSeconds: 29,
    speakerName: "Pastor Daniel",
    content:
      "When we started praying for our street, the biggest change was that we began remembering names. Prayer made our attention more concrete.",
    position: 1,
  },
  {
    id: "segment-prayer-002",
    episodeId: "episode-praying-for-your-street",
    startSeconds: 30,
    endSeconds: 63,
    speakerName: "Host",
    content:
      "That kind of prayer turns into presence. It helps a church notice where encouragement, meals, visits, and practical care are needed.",
    position: 2,
  },
];

export function getPodcastBySlug(slug: string) {
  return samplePodcasts.find((podcast) => podcast.slug === slug);
}

export function getEpisodeBySlug(slug: string) {
  return sampleEpisodes.find((episode) => episode.slug === slug);
}

export function getEpisodesForPodcast(podcastId: string) {
  return sampleEpisodes
    .filter((episode) => episode.podcastId === podcastId)
    .sort((firstEpisode, secondEpisode) =>
      secondEpisode.publishedAt.localeCompare(firstEpisode.publishedAt),
    );
}

export function getTranscriptForEpisode(episodeId: string) {
  return sampleTranscriptSegments
    .filter((segment) => segment.episodeId === episodeId)
    .sort(
      (firstSegment, secondSegment) =>
        firstSegment.position - secondSegment.position,
    );
}

export function getEpisodeCountForPodcast(podcastId: string) {
  return sampleEpisodes.filter((episode) => episode.podcastId === podcastId)
    .length;
}

export function getTranscriptCountForPodcast(podcastId: string) {
  const episodeIds = getEpisodesForPodcast(podcastId).map((episode) => episode.id);

  return sampleTranscriptSegments.filter((segment) =>
    episodeIds.includes(segment.episodeId),
  ).length;
}

export function formatEpisodeDuration(durationSeconds: number) {
  const minutes = Math.floor(durationSeconds / 60);
  const seconds = durationSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function formatPublishedDate(publishedAt: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(publishedAt));
}
