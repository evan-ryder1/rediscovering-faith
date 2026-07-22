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
} from "@/data/community-content";

type CommunityContextValue = {
  comments: EpisodeComment[];
  addComment: (comment: NewEpisodeComment) => EpisodeComment;
  addReply: (reply: NewCommentReply) => void;
  toggleReaction: (commentId: string, userEmail: string) => void;
  getCommentsForSegment: (transcriptSegmentId: string) => EpisodeComment[];
  getCommentCountForSegment: (transcriptSegmentId: string) => number;
};

const CommunityContext = createContext<CommunityContextValue | undefined>(
  undefined,
);
const storageKey = "rediscovering-faith-comments";

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
    const storedComments = window.localStorage.getItem(storageKey);
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

  window.localStorage.setItem(storageKey, JSON.stringify(comments));
}

export function CommunityProvider({ children }: { children: ReactNode }) {
  const [comments, setComments] =
    useState<EpisodeComment[]>(sampleEpisodeComments);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      setComments(readStoredComments());
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

  const value = useMemo<CommunityContextValue>(
    () => ({
      comments,
      addComment,
      addReply,
      toggleReaction,
      getCommentsForSegment,
      getCommentCountForSegment,
    }),
    [
      addComment,
      addReply,
      comments,
      getCommentCountForSegment,
      getCommentsForSegment,
      toggleReaction,
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
