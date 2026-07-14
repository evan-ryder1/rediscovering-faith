# Sample Content

Status: Sprint 1 seed content for UI development.

The sample content lives in `src/data/sample-content.ts`. It gives the app realistic podcast, episode, and transcript data before the Supabase database is connected.

## Purpose

This content supports the Sprint 1 screens:

- Podcast list page
- Podcast detail page
- Episode detail page
- Transcript display

It is intentionally isolated from the UI so it can later be replaced by Supabase queries.

## Included Data

Podcasts:

- Rediscovering Faith Conversations
- Table Talk Theology
- Neighborhood Prayer

Episodes:

- Finding Belonging After Spiritual Burnout
- Asking Hard Questions Without Shame
- Sabbath for Busy People
- Praying for Your Street

Transcript segments:

- Timestamped transcript segments for all sample episodes
- A longer transcript sample for the primary demo episode
- Segment IDs that can later support timestamped comments

## Replacement Plan

During Sprint 1, components should import from `src/data/sample-content.ts`.

Later, those imports can be replaced with Supabase queries that use the same conceptual shape:

- `podcasts`
- `episodes`
- `transcript_segments`

The schema draft is documented in `docs/database-schema.md`.
