import {
  getCommentsForSegment,
  sampleEpisodeComments,
} from "@/data/community-content";

describe("community content helpers", () => {
  it("keeps comments attached to the intended transcript segment", () => {
    const comments = getCommentsForSegment(
      sampleEpisodeComments,
      "segment-belonging-002",
    );

    expect(comments).toHaveLength(1);
    expect(comments[0].episodeId).toBe("episode-belonging-after-burnout");
    expect(comments[0].transcriptSegmentId).toBe("segment-belonging-002");
  });

  it("includes replies in the seeded community data shape", () => {
    const commentWithReply = sampleEpisodeComments.find(
      (comment) => comment.replies.length > 0,
    );

    expect(commentWithReply).toBeDefined();
    expect(commentWithReply?.replies[0].commentId).toBe(commentWithReply?.id);
  });
});
