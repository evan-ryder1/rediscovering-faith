import {
  formatEpisodeDuration,
  formatPublishedDate,
  formatTranscriptTimestamp,
  getEpisodeCountForPodcast,
  getEpisodesForPodcast,
  getPodcastBySlug,
  getPodcastForEpisode,
  getTranscriptCountForPodcast,
  getTranscriptForEpisode,
  sampleEpisodes,
  samplePodcasts,
} from "@/data/sample-content";

describe("sample content helpers", () => {
  it("connects podcast slugs to their ordered episode lists", () => {
    const podcast = getPodcastBySlug("rediscovering-faith-conversations");

    expect(podcast?.title).toBe("Rediscovering Faith Conversations");
    expect(getEpisodeCountForPodcast(podcast!.id)).toBe(2);
    expect(getEpisodesForPodcast(podcast!.id).map((episode) => episode.slug)).toEqual([
      "finding-belonging-after-spiritual-burnout",
      "asking-hard-questions-without-shame",
    ]);
  });

  it("connects episodes back to podcasts and transcript segments", () => {
    const episode = sampleEpisodes.find(
      (item) => item.slug === "finding-belonging-after-spiritual-burnout",
    );

    expect(episode).toBeDefined();
    expect(getPodcastForEpisode(episode!.id)?.slug).toBe(
      "rediscovering-faith-conversations",
    );
    expect(getTranscriptForEpisode(episode!.id)).toHaveLength(6);
    expect(getTranscriptCountForPodcast(episode!.podcastId)).toBe(8);
  });

  it("keeps published dates, durations, and transcript timestamps readable", () => {
    expect(formatEpisodeDuration(2684)).toBe("44:44");
    expect(formatTranscriptTimestamp(143)).toBe("2:23");
    expect(formatPublishedDate("2026-07-02T12:00:00.000Z")).toBe("Jul 2, 2026");
  });

  it("contains the Sprint 1 sample content breadth needed by the UI", () => {
    expect(samplePodcasts).toHaveLength(3);
    expect(sampleEpisodes).toHaveLength(4);
  });
});
