"use client";

import Link from "next/link";

import { useAuth } from "@/components/auth-provider";
import { useCommunity } from "@/components/community-provider";

type EpisodeSaveActionsProps = {
  episodeId: string;
};

export function EpisodeSaveActions({ episodeId }: EpisodeSaveActionsProps) {
  const { user } = useAuth();
  const { isEpisodeSaved, toggleSavedEpisode } = useCommunity();
  const isSaved = user ? isEpisodeSaved(episodeId, user.email) : false;

  if (!user) {
    return (
      <div className="mt-6 flex flex-wrap gap-3">
        <Link className="brand-button px-5 py-3 text-sm" href="/auth/sign-in">
          Sign In To Save
        </Link>
        <Link
          className="brand-button-secondary px-5 py-3 text-sm"
          href="/discussions"
        >
          View Discussions
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <button
        aria-pressed={isSaved}
        className={isSaved ? "brand-button px-5 py-3 text-sm" : "brand-button-secondary px-5 py-3 text-sm"}
        onClick={() => toggleSavedEpisode(episodeId, user.email)}
        type="button"
      >
        {isSaved ? "Saved Episode" : "Save Episode"}
      </button>
      <Link
        className="brand-button-secondary px-5 py-3 text-sm"
        href="/discussions"
      >
        View Discussions
      </Link>
    </div>
  );
}
