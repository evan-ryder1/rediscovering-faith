"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";

import { useAuth, type AuthUser } from "@/components/auth-provider";
import { useCommunity } from "@/components/community-provider";
import {
  formatCommentTime,
  type EpisodeComment,
} from "@/data/community-content";
import {
  formatTranscriptTimestamp,
  type TranscriptSegment,
} from "@/data/sample-content";

type EpisodeTranscriptCommentsProps = {
  episodeId: string;
  segments: TranscriptSegment[];
};

function getCommentLabel(count: number) {
  return `${count} ${count === 1 ? "comment" : "comments"}`;
}

function getReplyLabel(count: number) {
  return `${count} ${count === 1 ? "reply" : "replies"}`;
}

type CommentListProps = {
  comments: EpisodeComment[];
  replyDrafts: Record<string, string>;
  user: AuthUser | null;
  onReplyDraftChange: (commentId: string, content: string) => void;
  onReplySubmit: (
    event: FormEvent<HTMLFormElement>,
    comment: EpisodeComment,
  ) => void;
  onReactionToggle: (comment: EpisodeComment) => void;
};

function CommentList({
  comments,
  replyDrafts,
  user,
  onReplyDraftChange,
  onReplySubmit,
  onReactionToggle,
}: CommentListProps) {
  if (comments.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 grid gap-3">
      {comments.map((comment) => {
        const replyDraft = replyDrafts[comment.id] ?? "";
        const hasReacted = user
          ? comment.reactionUserEmails.includes(user.email)
          : false;

        return (
          <article
            className="border border-[#f1d8c7] bg-white p-4"
            key={comment.id}
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-black uppercase text-[#241914]">
                {comment.authorName}
              </p>
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8a7a70]">
                {formatCommentTime(comment.createdAt)}
              </p>
            </div>
            <p className="mt-2 leading-7 text-[#4f453e]">{comment.content}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-[0.1em] text-[#8a7a70]">
              <span>{comment.reactionCount} reactions</span>
              <span>{getReplyLabel(comment.replies.length)}</span>
              {user ? (
                <button
                  aria-pressed={hasReacted}
                  className={
                    hasReacted
                      ? "rounded-md bg-[#e85f1f] px-3 py-2 text-white transition hover:bg-[#c94a12]"
                      : "rounded-md border border-[#f1d8c7] bg-[#fff4ea] px-3 py-2 text-[#4f453e] transition hover:border-[#e85f1f] hover:text-[#e85f1f]"
                  }
                  onClick={() => onReactionToggle(comment)}
                  type="button"
                >
                  {hasReacted ? "Reacted" : "React"}
                </button>
              ) : null}
            </div>

            {comment.replies.length > 0 ? (
              <div className="mt-3 grid gap-2 border-l-4 border-[#ff8a45] pl-4">
                {comment.replies.map((reply) => (
                  <div key={reply.id}>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm font-black text-[#241914]">
                        {reply.authorName}
                      </p>
                      <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8a7a70]">
                        {formatCommentTime(reply.createdAt)}
                      </p>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-[#4f453e]">
                      {reply.content}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 border-l-4 border-[#f1d8c7] pl-4 text-sm font-bold text-[#8a7a70]">
                No replies yet.
              </p>
            )}

            {user ? (
              <form
                className="mt-4 grid gap-3 border-t border-[#f1d8c7] pt-4"
                onSubmit={(event) => onReplySubmit(event, comment)}
              >
                <label
                  className="text-sm font-black text-[#4f453e]"
                  htmlFor={`reply-${comment.id}`}
                >
                  Reply to this comment
                </label>
                <textarea
                  aria-label={`Reply to ${comment.authorName}`}
                  className="min-h-20 w-full border border-[#f1d8c7] bg-[#fffaf3] px-3 py-3 text-base leading-7 text-[#241914] outline-none focus:border-[#e85f1f]"
                  id={`reply-${comment.id}`}
                  onChange={(event) =>
                    onReplyDraftChange(comment.id, event.target.value)
                  }
                  placeholder="Add to the conversation..."
                  value={replyDraft}
                />
                <button
                  className="brand-button-secondary w-fit px-5 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0"
                  disabled={replyDraft.trim().length === 0}
                  type="submit"
                >
                  Add Reply
                </button>
              </form>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

export function EpisodeTranscriptComments({
  episodeId,
  segments,
}: EpisodeTranscriptCommentsProps) {
  const { user } = useAuth();
  const {
    addComment,
    addReply,
    getCommentCountForSegment,
    getCommentsForSegment,
    isTranscriptSegmentBookmarked,
    toggleReaction,
    toggleTranscriptBookmark,
  } = useCommunity();
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});

  const totalCommentCount = useMemo(
    () =>
      segments.reduce(
        (count, segment) => count + getCommentCountForSegment(segment.id),
        0,
      ),
    [getCommentCountForSegment, segments],
  );

  function updateDraft(segmentId: string, content: string) {
    setDrafts((currentDrafts) => ({
      ...currentDrafts,
      [segmentId]: content,
    }));
  }

  function updateReplyDraft(commentId: string, content: string) {
    setReplyDrafts((currentDrafts) => ({
      ...currentDrafts,
      [commentId]: content,
    }));
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
    segment: TranscriptSegment,
  ) {
    event.preventDefault();

    if (!user) {
      return;
    }

    const content = drafts[segment.id]?.trim();

    if (!content) {
      return;
    }

    addComment({
      episodeId,
      transcriptSegmentId: segment.id,
      authorName: user.name,
      content,
    });

    updateDraft(segment.id, "");
  }

  function handleReplySubmit(
    event: FormEvent<HTMLFormElement>,
    comment: EpisodeComment,
  ) {
    event.preventDefault();

    if (!user) {
      return;
    }

    const content = replyDrafts[comment.id]?.trim();

    if (!content) {
      return;
    }

    addReply({
      commentId: comment.id,
      authorName: user.name,
      content,
    });

    updateReplyDraft(comment.id, "");
  }

  function handleReactionToggle(comment: EpisodeComment) {
    if (!user) {
      return;
    }

    toggleReaction(comment.id, user.email);
  }

  function handleBookmarkToggle(segment: TranscriptSegment) {
    if (!user) {
      return;
    }

    toggleTranscriptBookmark(episodeId, segment.id, user.email);
  }

  if (segments.length === 0) {
    return (
      <div className="mt-5 border border-dashed border-[#f1d8c7] bg-[#fff4ea] p-6">
        <h3 className="text-xl font-black uppercase">Transcript coming soon</h3>
        <p className="mt-2 text-[#6e5b50]">
          Timestamped transcript segments will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5">
      <div className="flex flex-col gap-3 border-b border-[#f1d8c7] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-bold text-[#6e5b50]">
          {getCommentLabel(totalCommentCount)} across {segments.length}{" "}
          transcript segments
        </p>
        {user ? (
          <p className="w-fit bg-[#fff4ea] px-3 py-2 text-xs font-black uppercase tracking-[0.1em] text-[#e85f1f]">
            Commenting as {user.name}
          </p>
        ) : (
          <Link className="brand-button-secondary w-fit px-4 py-2 text-sm" href="/auth/sign-in">
            Sign in to comment
          </Link>
        )}
      </div>

      <ol className="mt-5 grid gap-4">
        {segments.map((segment) => {
          const segmentComments = getCommentsForSegment(segment.id);
          const draft = drafts[segment.id] ?? "";
          const isBookmarked = user
            ? isTranscriptSegmentBookmarked(segment.id, user.email)
            : false;

          return (
            <li
              className="grid gap-4 border-l-4 border-[#ff8a45] bg-[#fff4ea] p-5 sm:grid-cols-[6rem_1fr]"
              key={segment.id}
            >
              <div>
                <p className="text-sm font-black uppercase tracking-[0.12em] text-[#e85f1f]">
                  {formatTranscriptTimestamp(segment.startSeconds)}
                </p>
                <p className="mt-2 text-xs font-bold text-[#8a7a70]">
                  Segment {segment.position}
                </p>
                <p className="mt-3 text-xs font-black uppercase tracking-[0.1em] text-[#4f453e]">
                  {getCommentLabel(segmentComments.length)}
                </p>
                {user ? (
                  <button
                    aria-pressed={isBookmarked}
                    className={
                      isBookmarked
                        ? "mt-3 rounded-md bg-[#e85f1f] px-3 py-2 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:bg-[#c94a12]"
                        : "mt-3 rounded-md border border-[#f1d8c7] bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.1em] text-[#4f453e] transition hover:border-[#e85f1f] hover:text-[#e85f1f]"
                    }
                    onClick={() => handleBookmarkToggle(segment)}
                    type="button"
                  >
                    {isBookmarked ? "Bookmarked" : "Bookmark"}
                  </button>
                ) : null}
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.1em] text-[#4f453e]">
                  {segment.speakerName}
                </p>
                <p className="mt-2 text-lg leading-8 text-[#4f453e]">
                  {segment.content}
                </p>

                {user ? (
                  <form
                    className="mt-4 grid gap-3 border-t border-[#f1d8c7] pt-4"
                    onSubmit={(event) => handleSubmit(event, segment)}
                  >
                    <label
                      className="text-sm font-black text-[#4f453e]"
                      htmlFor={`comment-${segment.id}`}
                    >
                      Add a timestamped comment
                    </label>
                    <textarea
                      aria-label={`Comment on ${formatTranscriptTimestamp(segment.startSeconds)}`}
                      className="min-h-24 w-full border border-[#f1d8c7] bg-white px-3 py-3 text-base leading-7 text-[#241914] outline-none focus:border-[#e85f1f]"
                      id={`comment-${segment.id}`}
                      onChange={(event) =>
                        updateDraft(segment.id, event.target.value)
                      }
                      placeholder="Share what this moment brings up..."
                      value={draft}
                    />
                    <button
                      className="brand-button w-fit px-5 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0"
                      disabled={draft.trim().length === 0}
                      type="submit"
                    >
                      Add Comment
                    </button>
                  </form>
                ) : null}

                <CommentList
                  comments={segmentComments}
                  onReactionToggle={handleReactionToggle}
                  onReplyDraftChange={updateReplyDraft}
                  onReplySubmit={handleReplySubmit}
                  replyDrafts={replyDrafts}
                  user={user}
                />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
