"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  getCommentsForSegment as filterCommentsForSegment,
  sampleEpisodeComments,
  type EpisodeComment,
  type NewCommentReply,
  type NewEpisodeComment,
  type SavedEpisode,
  type TranscriptBookmark,
} from "@/data/community-content";

type CommunityContextValue = {
  comments: EpisodeComment[];
  savedEpisodes: SavedEpisode[];
  transcriptBookmarks: TranscriptBookmark[];
  addComment: (comment: NewEpisodeComment) => EpisodeComment;
  addReply: (reply: NewCommentReply) => void;
  toggleReaction: (commentId: string, userEmail: string) => void;
  toggleSavedEpisode: (episodeId: string, userEmail: string) => void;
  toggleTranscriptBookmark: (
    episodeId: string,
    transcriptSegmentId: string,
    userEmail: string,
  ) => void;
  getCommentsForSegment: (transcriptSegmentId: string) => EpisodeComment[];
  getCommentCountForSegment: (transcriptSegmentId: string) => number;
  getSavedEpisodesForUser: (userEmail: string) => SavedEpisode[];
  getTranscriptBookmarksForUser: (userEmail: string) => TranscriptBookmark[];
  isEpisodeSaved: (episodeId: string, userEmail: string) => boolean;
  isTranscriptSegmentBookmarked: (
    transcriptSegmentId: string,
    userEmail: string,
  ) => boolean;
};

const CommunityContext = createContext<CommunityContextValue | undefined>(
  undefined,
);
const commentsStorageKey = "rediscovering-faith-comments";
const savedEpisodesStorageKey = "rediscovering-faith-saved-episodes";
const transcriptBookmarksStorageKey =
  "rediscovering-faith-transcript-bookmarks";

function createCommentId() {
  const randomPart = Math.random().toString(36).slice(2, 8);

  return `comment-${Date.now()}-${randomPart}`;
}

function createReplyId() {
  const randomPart = Math.random().toString(36).slice(2, 8);

  return `reply-${Date.now()}-${randomPart}`;
}

function normalizeComments(comments: EpisodeComment[]) {
  return comments.map((comment) => ({
    ...comment,
    reactionUserEmails: comment.reactionUserEmails ?? [],
    replies: comment.replies ?? [],
  }));
}

function readStoredComments() {
  if (typeof window === "undefined") {
    return sampleEpisodeComments;
  }

  try {
    const storedComments = window.localStorage.getItem(commentsStorageKey);
    return storedComments
      ? normalizeComments(JSON.parse(storedComments) as EpisodeComment[])
      : sampleEpisodeComments;
  } catch {
    return sampleEpisodeComments;
  }
}

function writeStoredComments(comments: EpisodeComment[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(commentsStorageKey, JSON.stringify(comments));
}

function readStoredSavedEpisodes() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedSavedEpisodes = window.localStorage.getItem(
      savedEpisodesStorageKey,
    );

    return storedSavedEpisodes
      ? (JSON.parse(storedSavedEpisodes) as SavedEpisode[])
      : [];
  } catch {
    return [];
  }
}

function writeStoredSavedEpisodes(savedEpisodes: SavedEpisode[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    savedEpisodesStorageKey,
    JSON.stringify(savedEpisodes),
  );
}

function readStoredTranscriptBookmarks() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedTranscriptBookmarks = window.localStorage.getItem(
      transcriptBookmarksStorageKey,
    );

    return storedTranscriptBookmarks
      ? (JSON.parse(storedTranscriptBookmarks) as TranscriptBookmark[])
      : [];
  } catch {
    return [];
  }
}

function writeStoredTranscriptBookmarks(
  transcriptBookmarks: TranscriptBookmark[],
) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    transcriptBookmarksStorageKey,
    JSON.stringify(transcriptBookmarks),
  );
}

export function CommunityProvider({ children }: { children: ReactNode }) {
  const [comments, setComments] =
    useState<EpisodeComment[]>(sampleEpisodeComments);
  const [savedEpisodes, setSavedEpisodes] = useState<SavedEpisode[]>([]);
  const [transcriptBookmarks, setTranscriptBookmarks] = useState<
    TranscriptBookmark[]
  >([]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      setComments(readStoredComments());
      setSavedEpisodes(readStoredSavedEpisodes());
      setTranscriptBookmarks(readStoredTranscriptBookmarks());
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const addComment = useCallback((newComment: NewEpisodeComment) => {
    const comment: EpisodeComment = {
      id: createCommentId(),
      ...newComment,
      reactionCount: 0,
      reactionUserEmails: [],
      createdAt: new Date().toISOString(),
      replies: [],
    };

    setComments((currentComments) => {
      const nextComments = [...currentComments, comment];
      writeStoredComments(nextComments);

      return nextComments;
    });

    return comment;
  }, []);

  const addReply = useCallback((newReply: NewCommentReply) => {
    setComments((currentComments) => {
      const nextComments = currentComments.map((comment) => {
        if (comment.id !== newReply.commentId) {
          return comment;
        }

        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: createReplyId(),
              ...newReply,
              createdAt: new Date().toISOString(),
            },
          ],
        };
      });

      writeStoredComments(nextComments);

      return nextComments;
    });
  }, []);

  const toggleReaction = useCallback((commentId: string, userEmail: string) => {
    setComments((currentComments) => {
      const nextComments = currentComments.map((comment) => {
        if (comment.id !== commentId) {
          return comment;
        }

        const reactionUserEmails = comment.reactionUserEmails ?? [];
        const hasReacted = reactionUserEmails.includes(userEmail);
        const nextReactionUserEmails = hasReacted
          ? reactionUserEmails.filter((email) => email !== userEmail)
          : [...reactionUserEmails, userEmail];

        return {
          ...comment,
          reactionCount: Math.max(
            0,
            comment.reactionCount + (hasReacted ? -1 : 1),
          ),
          reactionUserEmails: nextReactionUserEmails,
        };
      });

      writeStoredComments(nextComments);

      return nextComments;
    });
  }, []);

  const toggleSavedEpisode = useCallback(
    (episodeId: string, userEmail: string) => {
      setSavedEpisodes((currentSavedEpisodes) => {
        const isSaved = currentSavedEpisodes.some(
          (savedEpisode) =>
            savedEpisode.episodeId === episodeId &&
            savedEpisode.userEmail === userEmail,
        );
        const nextSavedEpisodes = isSaved
          ? currentSavedEpisodes.filter(
              (savedEpisode) =>
                !(
                  savedEpisode.episodeId === episodeId &&
                  savedEpisode.userEmail === userEmail
                ),
            )
          : [
              ...currentSavedEpisodes,
              {
                episodeId,
                userEmail,
                savedAt: new Date().toISOString(),
              },
            ];

        writeStoredSavedEpisodes(nextSavedEpisodes);

        return nextSavedEpisodes;
      });
    },
    [],
  );

  const toggleTranscriptBookmark = useCallback(
    (episodeId: string, transcriptSegmentId: string, userEmail: string) => {
      setTranscriptBookmarks((currentBookmarks) => {
        const isBookmarked = currentBookmarks.some(
          (bookmark) =>
            bookmark.transcriptSegmentId === transcriptSegmentId &&
            bookmark.userEmail === userEmail,
        );
        const nextBookmarks = isBookmarked
          ? currentBookmarks.filter(
              (bookmark) =>
                !(
                  bookmark.transcriptSegmentId === transcriptSegmentId &&
                  bookmark.userEmail === userEmail
                ),
            )
          : [
              ...currentBookmarks,
              {
                episodeId,
                transcriptSegmentId,
                userEmail,
                savedAt: new Date().toISOString(),
              },
            ];

        writeStoredTranscriptBookmarks(nextBookmarks);

        return nextBookmarks;
      });
    },
    [],
  );

  const getCommentsForSegment = useCallback(
    (transcriptSegmentId: string) =>
      filterCommentsForSegment(comments, transcriptSegmentId),
    [comments],
  );

  const getCommentCountForSegment = useCallback(
    (transcriptSegmentId: string) =>
      getCommentsForSegment(transcriptSegmentId).length,
    [getCommentsForSegment],
  );

  const getSavedEpisodesForUser = useCallback(
    (userEmail: string) =>
      savedEpisodes.filter((savedEpisode) => savedEpisode.userEmail === userEmail),
    [savedEpisodes],
  );

  const getTranscriptBookmarksForUser = useCallback(
    (userEmail: string) =>
      transcriptBookmarks.filter((bookmark) => bookmark.userEmail === userEmail),
    [transcriptBookmarks],
  );

  const isEpisodeSaved = useCallback(
    (episodeId: string, userEmail: string) =>
      getSavedEpisodesForUser(userEmail).some(
        (savedEpisode) => savedEpisode.episodeId === episodeId,
      ),
    [getSavedEpisodesForUser],
  );

  const isTranscriptSegmentBookmarked = useCallback(
    (transcriptSegmentId: string, userEmail: string) =>
      getTranscriptBookmarksForUser(userEmail).some(
        (bookmark) => bookmark.transcriptSegmentId === transcriptSegmentId,
      ),
    [getTranscriptBookmarksForUser],
  );

  const value = useMemo<CommunityContextValue>(
    () => ({
      comments,
      savedEpisodes,
      transcriptBookmarks,
      addComment,
      addReply,
      toggleReaction,
      toggleSavedEpisode,
      toggleTranscriptBookmark,
      getCommentsForSegment,
      getCommentCountForSegment,
      getSavedEpisodesForUser,
      getTranscriptBookmarksForUser,
      isEpisodeSaved,
      isTranscriptSegmentBookmarked,
    }),
    [
      addComment,
      addReply,
      comments,
      getCommentCountForSegment,
      getCommentsForSegment,
      getSavedEpisodesForUser,
      getTranscriptBookmarksForUser,
      isEpisodeSaved,
      isTranscriptSegmentBookmarked,
      savedEpisodes,
      transcriptBookmarks,
      toggleReaction,
      toggleSavedEpisode,
      toggleTranscriptBookmark,
    ],
  );

  return (
    <CommunityContext.Provider value={value}>
      {children}
    </CommunityContext.Provider>
  );
}

export function useCommunity() {
  const context = useContext(CommunityContext);

  if (!context) {
    throw new Error("useCommunity must be used within CommunityProvider.");
  }

  return context;
}
