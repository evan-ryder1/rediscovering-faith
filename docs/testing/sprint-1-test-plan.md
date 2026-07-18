# Sprint 1 Test Plan

Status: first test suite added.

## Test Commands

Run component/unit tests:

```bash
npm run test
```

Run end-to-end tests:

```bash
npm run test:e2e
```

Run lint, component/unit tests, and e2e tests:

```bash
npm run test:all
```

## Component And Unit Tests

### `src/data/__tests__/sample-content.test.ts`

Purpose: validates the sample content layer that currently stands in for Supabase data.

Coverage:

- Podcast slug lookup returns the correct podcast.
- Podcast episodes are returned in newest-first order.
- Episodes connect back to their podcast.
- Transcript segments connect to the correct episode.
- Podcast transcript counts are calculated correctly.
- Duration, published date, and transcript timestamp formatting are readable.
- Seed content includes the expected number of podcasts and episodes.

### `src/app/podcasts/__tests__/podcasts-page.test.tsx`

Purpose: validates the podcast library screen.

Coverage:

- The branded podcast library heading renders.
- All sample podcasts appear.
- Podcast cards link to their detail pages.
- Podcast cards expose episode and transcript segment counts.
- The page communicates the podcast-to-episode-to-transcript flow.

### `src/app/episodes/[slug]/__tests__/episode-detail-page.test.tsx`

Purpose: validates the episode detail and transcript experience.

Coverage:

- The episode detail page renders the episode title.
- Podcast metadata appears on the episode page.
- The audio placeholder appears.
- The timestamped transcript section appears.
- Transcript timestamps and segment content render.
- Unknown episode slugs call Next.js `notFound`.

### `src/components/__tests__/auth-flow.test.tsx`

Purpose: validates the Sprint 1 local authenticated user flow before Supabase Auth is connected.

Coverage:

- Sign-up form creates a local listener session.
- Navigation changes from signed-out links to the signed-in user state.
- Sign-up redirects to `/account`.
- Account panel renders signed-out state.
- Sign-in updates the account panel to signed-in state.
- Sign-out returns the account panel to signed-out state.

## End-To-End Tests

### `e2e/core-flows.spec.ts`

Purpose: validates the app as a user would experience it in a browser.

Coverage:

- Visitor opens the homepage.
- Visitor navigates to podcast library.
- Visitor opens a podcast detail page.
- Visitor opens an episode detail page.
- Visitor sees the timestamped transcript.
- Listener creates a local account from the sign-up page.
- Listener lands on the account page.
- Listener sees signed-in account state.
- Listener signs out and sees signed-out state.

## Notes

- The auth tests currently validate the local browser-session scaffold.
- When Supabase Auth is connected, these tests should be updated to mock Supabase for component tests and use a test Supabase project or seeded test user for e2e tests.
- Playwright starts the Next.js dev server automatically using `npm run dev -- --hostname 127.0.0.1 --port 3000`.
