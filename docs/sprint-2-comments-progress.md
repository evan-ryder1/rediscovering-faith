# Sprint 2 Comments Progress

Date: July 21, 2026

## Completed Today

RF-019 and RF-020 were implemented as the first working community interaction loop for Sprint 2.

## RF-019: Comment State Management

The app now has a temporary community state layer in `CommunityProvider`.

What it does:

- Starts with seeded timestamped comments.
- Stores comments in browser `localStorage`.
- Lets the UI add a new comment without refreshing the page.
- Keeps each comment attached to both an `episodeId` and a `transcriptSegmentId`.
- Keeps the state logic separate from the transcript UI so it can later be replaced by Supabase queries and inserts.

## RF-020: Timestamped Comment UI

The episode detail page now renders transcript segments through a client component that supports comments.

What it does:

- Shows total episode comment count.
- Shows comment counts per transcript segment.
- Shows seeded comments and replies under the correct timestamp.
- Lets signed-in listeners add a comment directly to a transcript segment.
- Shows signed-out visitors a sign-in prompt instead of the comment form.

## Demo Flow

For the next demo, the usable flow is:

```text
Sign up -> open an episode -> find a transcript timestamp -> add a comment -> see it appear under that exact segment
```

## Current Limitation

This is local browser persistence, not shared Supabase persistence yet. That is intentional for this stage of Sprint 2 because it proves the interaction and data shape before wiring the database.
