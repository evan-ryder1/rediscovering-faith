export type CommentReply = {
  id: string;
  commentId: string;
  authorName: string;
  content: string;
  createdAt: string;
};

export type EpisodeComment = {
  id: string;
  episodeId: string;
  transcriptSegmentId: string;
  authorName: string;
  content: string;
  reactionCount: number;
  reactionUserEmails: string[];
  createdAt: string;
  replies: CommentReply[];
};

export type NewEpisodeComment = {
  episodeId: string;
  transcriptSegmentId: string;
  authorName: string;
  content: string;
};

export type NewCommentReply = {
  commentId: string;
  authorName: string;
  content: string;
};

export type SavedEpisode = {
  episodeId: string;
  userEmail: string;
  savedAt: string;
};

export type TranscriptBookmark = {
  episodeId: string;
  transcriptSegmentId: string;
  userEmail: string;
  savedAt: string;
};

export type DiscussionThread = {
  id: string;
  title: string;
  prompt: string;
  authorName: string;
  episodeId: string;
  transcriptSegmentId?: string;
  replyCount: number;
  reactionCount: number;
  createdAt: string;
};

export const sampleEpisodeComments: EpisodeComment[] = [
  {
    id: "comment-belonging-001",
    episodeId: "episode-belonging-after-burnout",
    transcriptSegmentId: "segment-belonging-002",
    authorName: "Jordan Lee",
    content:
      "This is exactly why I want comments tied to the transcript. The sentence about honesty not being punished feels like the heart of the app.",
    reactionCount: 4,
    reactionUserEmails: ["maya@example.com", "chris@example.com"],
    createdAt: "2026-07-20T18:20:00.000Z",
    replies: [
      {
        id: "reply-belonging-001",
        commentId: "comment-belonging-001",
        authorName: "Evan Ryder",
        content:
          "Yes. This is the bridge from passive listening into actual community conversation.",
        createdAt: "2026-07-20T19:04:00.000Z",
      },
    ],
  },
  {
    id: "comment-belonging-002",
    episodeId: "episode-belonging-after-burnout",
    transcriptSegmentId: "segment-belonging-006",
    authorName: "Maya Thompson",
    content:
      "The app should make this moment easy to find again because it explains the whole product direction.",
    reactionCount: 2,
    reactionUserEmails: ["jordan@example.com"],
    createdAt: "2026-07-21T09:15:00.000Z",
    replies: [],
  },
  {
    id: "comment-questions-001",
    episodeId: "episode-questions-without-shame",
    transcriptSegmentId: "segment-questions-001",
    authorName: "Chris Morgan",
    content:
      "This would be a great place for listeners to share what questions they are carrying without starting a whole separate thread.",
    reactionCount: 3,
    reactionUserEmails: ["maya@example.com"],
    createdAt: "2026-07-21T11:32:00.000Z",
    replies: [],
  },
];

export const sampleDiscussionThreads: DiscussionThread[] = [
  {
    id: "thread-belonging-honesty",
    title: "What makes honesty feel safe in a faith community?",
    prompt:
      "This thread follows the transcript moment about people needing a community where honesty will not be punished.",
    authorName: "Jordan Lee",
    episodeId: "episode-belonging-after-burnout",
    transcriptSegmentId: "segment-belonging-002",
    replyCount: 6,
    reactionCount: 12,
    createdAt: "2026-07-21T14:12:00.000Z",
  },
  {
    id: "thread-burnout-belonging",
    title: "How should a church make room for people recovering from burnout?",
    prompt:
      "A space to talk about slower rhythms, trust, and what support looks like before someone is ready to serve again.",
    authorName: "Maya Thompson",
    episodeId: "episode-belonging-after-burnout",
    transcriptSegmentId: "segment-belonging-004",
    replyCount: 4,
    reactionCount: 9,
    createdAt: "2026-07-22T09:45:00.000Z",
  },
  {
    id: "thread-questions-without-shame",
    title: "What questions do people need permission to ask?",
    prompt:
      "A discussion connected to the episode on asking hard questions without shame.",
    authorName: "Chris Morgan",
    episodeId: "episode-questions-without-shame",
    transcriptSegmentId: "segment-questions-001",
    replyCount: 8,
    reactionCount: 15,
    createdAt: "2026-07-22T16:30:00.000Z",
  },
  {
    id: "thread-prayer-neighborhood",
    title: "How does prayer change the way a church notices its neighborhood?",
    prompt:
      "Listeners can compare practical ways prayer leads to presence, names, visits, meals, and encouragement.",
    authorName: "Pastor Daniel Brooks",
    episodeId: "episode-praying-for-your-street",
    replyCount: 3,
    reactionCount: 7,
    createdAt: "2026-07-23T10:05:00.000Z",
  },
];

export function getCommentsForSegment(
  comments: EpisodeComment[],
  transcriptSegmentId: string,
) {
  return comments
    .filter((comment) => comment.transcriptSegmentId === transcriptSegmentId)
    .sort((firstComment, secondComment) =>
      firstComment.createdAt.localeCompare(secondComment.createdAt),
    );
}

export function formatCommentTime(createdAt: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(createdAt));
}

export function getDiscussionThreadsForEpisode(episodeId: string) {
  return sampleDiscussionThreads
    .filter((thread) => thread.episodeId === episodeId)
    .sort((firstThread, secondThread) =>
      secondThread.createdAt.localeCompare(firstThread.createdAt),
    );
}
