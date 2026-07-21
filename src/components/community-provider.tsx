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
  type NewEpisodeComment,
} from "@/data/community-content";

type CommunityContextValue = {
  comments: EpisodeComment[];
  addComment: (comment: NewEpisodeComment) => EpisodeComment;
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

function readStoredComments() {
  if (typeof window === "undefined") {
    return sampleEpisodeComments;
  }

  try {
    const storedComments = window.localStorage.getItem(storageKey);
    return storedComments
      ? (JSON.parse(storedComments) as EpisodeComment[])
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
      getCommentsForSegment,
      getCommentCountForSegment,
    }),
    [addComment, comments, getCommentCountForSegment, getCommentsForSegment],
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
