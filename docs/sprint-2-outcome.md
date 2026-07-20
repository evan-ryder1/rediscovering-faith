# Sprint 2 Outcome: Community & Engagement

Sprint dates: July 20, 2026 - July 26, 2026

Sprint status: Planned

## Sprint Goal

Sprint 2 turns Rediscovering Faith from a podcast browsing experience into an interactive community experience.

By the end of Sprint 2, the app should demonstrate that a Christian podcast listener can move from passive listening into meaningful engagement around a specific episode moment.

## Target Demo Outcome

The next supervisor demo should show this flow:

1. A visitor opens Rediscovering Faith.
2. The visitor browses podcasts and opens an episode.
3. The visitor views timestamped transcript segments.
4. The visitor signs in or signs up.
5. The signed-in listener selects a transcript segment.
6. The listener adds a timestamped comment.
7. The comment appears attached to that transcript moment.
8. The listener can reply to a comment.
9. The listener can react to a comment.
10. The listener can save or bookmark an episode or transcript moment.
11. The listener can open a discussion board view for broader episode conversation.

This is the main sentence to use in the supervisor meeting:

> Sprint 2 is focused on proving the community concept. Sprint 1 established podcast, episode, transcript, and auth foundations. Sprint 2 adds interaction on top of that foundation by allowing signed-in listeners to comment on specific transcript moments, reply, react, save content, and enter broader discussion spaces.

## Definition Of Done

Sprint 2 is done when:

- A signed-in listener can create a timestamped comment on a transcript segment.
- Comments are visibly connected to specific transcript timestamps.
- Replies or threaded discussion behavior is represented.
- Likes or reactions are available on comments.
- Saved episode or bookmark behavior is available.
- Discussion board view exists and is reachable from the episode experience.
- Community data is structured in a way that can be replaced or backed by Supabase.
- Component/unit tests cover the core interaction behavior.
- E2E tests cover the main community demo flow.
- `npm run lint` passes.
- `npm run test` passes.
- `npm run test:e2e` passes.
- `npm run build` passes.
- Sprint 2 recap and QA notes are documented.

## Recommended Product Scope

### Must Have

- Timestamped comments on transcript segments
- Comment form visible only for signed-in state or prompting sign-in
- Comment list grouped by transcript segment
- Reply UI for comments
- Like/reaction UI for comments
- Save/bookmark UI for episode or transcript segment
- Discussion board page or panel
- Tests for core behavior
- Demo-ready sample data

### Should Have

- Comment count indicators on transcript segments
- Saved item indicator in account page
- Empty states for comments, replies, saved items, and discussions
- Clear signed-out prompts
- Mobile-friendly interaction layout

### Could Have

- Filter transcript segments by commented/saved state
- Basic notification-style indicator after adding a comment
- Discussion board categories
- Seeded discussion prompts

### Out Of Scope For Sprint 2

- Full production Supabase persistence for every engagement feature
- Real-time subscriptions
- Email notifications
- Pastor verification
- Moderation dashboard
- Analytics dashboard
- Production deployment

## Data Direction

Sprint 2 should add a community data layer that mirrors likely Supabase tables:

- `episode_comments`
- `comment_replies`
- `comment_reactions`
- `saved_items`
- `discussion_threads`
- `discussion_replies`

For the demo, this can begin as local/sample data and client-side state. The important architectural decision is that comments should connect to transcript moments.

Recommended comment shape:

```ts
type EpisodeComment = {
  id: string;
  episodeId: string;
  transcriptSegmentId: string;
  authorName: string;
  content: string;
  reactionCount: number;
  createdAt: string;
};
```

## Supervisor Talking Track

If asked what Sprint 2 is about:

> Sprint 2 is where the app starts proving the community value proposition. Instead of only displaying podcast episodes and transcripts, the app will let a signed-in listener respond to specific transcript moments, reply to others, react, save important moments, and move into a discussion board.

If asked what will be demoable:

> The demo target is a complete listener interaction loop: open an episode, find a transcript moment, add a timestamped comment, see it attached to the segment, reply/react, save the moment, and view the broader episode discussion space.

If asked why this matters:

> This directly addresses the original problem. Podcasts are normally one-way. Timestamped comments and discussions create a pathway from listening into conversation and community.
