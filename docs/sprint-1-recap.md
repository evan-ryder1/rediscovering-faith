# Sprint 1 Recap: Foundation & Core Experience

Sprint dates: July 13, 2026 - July 19, 2026

Sprint status: Complete

## Executive Summary

Sprint 1 established the foundation for Rediscovering Faith, a web-based Christian podcast community platform. The main goal was to create the first usable product experience around podcasts, episodes, transcripts, authentication screens, and project structure before moving into community features in Sprint 2.

The app now supports a clear listener journey:

1. A visitor lands on the branded homepage.
2. The visitor browses podcasts.
3. The visitor opens a podcast detail page.
4. The visitor selects an episode.
5. The visitor views episode metadata and timestamped transcript segments.
6. The visitor can sign up or sign in using the temporary Sprint 1 local auth flow.
7. The signed-in listener can view an account page and sign out.

Sprint 1 intentionally focused on the content experience first. This gives Sprint 2 a stable foundation for timestamped comments, reactions, discussion boards, bookmarks, and saved collections.

## Supervisor Talking Track

Here is the short version I can use in my capstone meeting:

> Sprint 1 focused on building the core product foundation for Rediscovering Faith. I set up the Next.js application, created the GitHub repo and commit history, defined the initial Supabase-oriented data model, added sample podcast/episode/transcript content, built the app shell and navigation, created podcast and episode pages, added timestamped transcript display, implemented temporary auth screens and a local signed-in flow, applied the Rediscovering Faith orange brand theme, and added both component and end-to-end tests. I also completed a QA pass confirming lint, unit/component tests, e2e tests, and production build all pass. The main limitation is that Supabase is not fully connected yet; Sprint 1 uses structured sample data and local browser auth so the UI and user flow can be validated before replacing those pieces with live backend data.

## What Was Completed

### Project Foundation

Completed:

- Created the local Next.js application.
- Created and pushed the GitHub repository.
- Added a project-specific README.
- Added Sprint planning documentation.
- Added ClickUp import support for Sprint 1 tasks.
- Established a commit history that shows incremental development progress.

Key files:

- `README.md`
- `docs/sprint-plan.md`
- `docs/sprint-1-backlog.md`
- `docs/clickup/import-guide.md`
- `docs/clickup/sprint-1-clickup-import.csv`

### Supabase Preparation

Completed:

- Added Supabase environment variable documentation.
- Added Supabase client utility structure.
- Added a first database schema draft.
- Planned the core tables around the episode-first product flow.

Core planned tables:

- `profiles`
- `podcasts`
- `episodes`
- `transcript_segments`

Key files:

- `docs/supabase-client-setup.md`
- `docs/database-schema.md`
- `src/lib/supabase/env.ts`
- `src/lib/supabase/client.ts`
- `src/lib/supabase/server.ts`

Important note:

Supabase is prepared but not fully connected yet. The app currently uses sample data and local browser auth for Sprint 1 validation. That is intentional because Sprint 1 needed to prove the user flow before live backend integration.

### Sample Content

Completed:

- Added structured sample data for podcasts, episodes, and transcript segments.
- Added helper functions for looking up podcasts, episodes, transcript content, durations, and dates.
- Kept the sample content isolated so it can later be replaced with Supabase queries.

Sample content includes:

- 3 podcasts
- 4 episodes
- Timestamped transcript segments

Key files:

- `src/data/sample-content.ts`
- `docs/sample-content.md`

### UI And Branding

Completed:

- Added the Rediscovering Faith logo as a real app asset.
- Applied the orange Rediscovering Faith visual theme.
- Added branded layout classes.
- Updated the header and footer.
- Improved the app from a generic capstone layout into a branded product experience.

Brand direction:

- Warm orange and cream palette
- Bold uppercase display typography
- Sunrise/radiance-inspired visual motif
- Clean podcast-focused content cards

Key files:

- `public/brand/rediscovering-faith-logo.png`
- `src/app/globals.css`
- `src/components/site-header.tsx`
- `src/components/site-footer.tsx`

### Core User Journey

Completed:

- Homepage
- Podcast list page
- Podcast detail pages
- Episode list page
- Episode detail pages
- Timestamped transcript display

Current route flow:

```text
/ -> /podcasts -> /podcasts/[slug] -> /episodes/[slug]
```

Key routes:

- `/`
- `/podcasts`
- `/podcasts/rediscovering-faith-conversations`
- `/podcasts/table-talk-theology`
- `/podcasts/neighborhood-prayer`
- `/episodes`
- `/episodes/finding-belonging-after-spiritual-burnout`
- `/episodes/asking-hard-questions-without-shame`
- `/episodes/sabbath-for-busy-people`
- `/episodes/praying-for-your-street`

### Authentication Screens And Basic Auth Flow

Completed:

- Added sign-in screen.
- Added sign-up screen.
- Added account page.
- Added local signed-in/signed-out state.
- Updated navigation to respond to auth state.
- Added sign-out behavior.

Key routes:

- `/auth/sign-in`
- `/auth/sign-up`
- `/account`

Important note:

The current auth flow uses local browser storage. This is a Sprint 1 scaffold, not the final authentication system. Supabase Auth should replace this local flow once the Supabase project keys and auth configuration are ready.

### Testing And QA

Completed:

- Added Jest and React Testing Library.
- Added Playwright e2e testing.
- Added unit/component tests.
- Added browser e2e tests for desktop and mobile viewport coverage.
- Completed the Sprint 1 QA pass.

Test coverage includes:

- Sample data helper behavior
- Podcast list rendering and links
- Episode detail and transcript rendering
- Local auth flow behavior
- Homepage to podcast to episode transcript user journey
- Sign-up, account page, and sign-out browser journey

Key files:

- `docs/testing/sprint-1-test-plan.md`
- `docs/testing/sprint-1-qa-pass.md`
- `jest.config.mjs`
- `playwright.config.ts`
- `src/data/__tests__/sample-content.test.ts`
- `src/app/podcasts/__tests__/podcasts-page.test.tsx`
- `src/app/episodes/[slug]/__tests__/episode-detail-page.test.tsx`
- `src/components/__tests__/auth-flow.test.tsx`
- `e2e/core-flows.spec.ts`

## QA Results

Sprint 1 QA passed.

Verified commands:

```bash
npm run lint
npm run test -- --runInBand
npm run test:e2e
npm run build
```

Observed results:

- Lint passed.
- Component/unit tests passed.
- 4 test suites passed.
- 10 component/unit tests passed.
- 4 Playwright browser tests passed.
- Desktop Chromium e2e flow passed.
- Mobile Chrome e2e flow passed.
- Production build passed.

The QA report is documented in:

- `docs/testing/sprint-1-qa-pass.md`

## GitHub Commit History Highlights

Sprint 1 commits show incremental progress:

```text
de5a817 docs: add capstone project foundation
b347097 docs: add sprint 1 ClickUp task plan
5a588a4 feat: add Supabase utilities and schema draft
a9e4f65 feat: add sample podcast content
15918d6 feat: add app shell navigation
104b3af feat: add podcast list and detail pages
c1c9678 style: apply Rediscovering Faith brand theme
cc38469 feat: add episode transcript and auth flow
2f2021b test: add sprint 1 coverage
ee9e423 docs: complete sprint 1 QA pass
```

This commit history is important because it documents the development process for portfolio review, not just the final result.

## Known Limitations

These are not failures. They are known Sprint 1 boundaries:

- Supabase is prepared but not fully connected.
- Auth currently uses local browser storage instead of Supabase Auth.
- Podcast CRUD is represented through page structure and sample data, not live create/update/delete operations.
- Episode audio uses a placeholder instead of a live media player.
- Transcript content is sample data.
- Timestamped comments are not implemented yet.
- Discussion boards are not implemented yet.
- Bookmarks and saved collections are not implemented yet.

## Why These Limitations Are Acceptable

Sprint 1 was designed to build the foundation and core experience first. The project needed a stable podcast, episode, transcript, and auth UI structure before community features could be added responsibly.

The current architecture supports the planned Sprint 2 work because:

- Episodes already have stable IDs and routes.
- Transcript segments already have timestamps and segment IDs.
- The UI already presents episode moments in a way that comments can attach to later.
- The auth flow already demonstrates signed-in and signed-out states.
- Tests already cover the core routes that Sprint 2 will extend.

## Sprint 2 Handoff

Sprint 2 should build on the episode/transcript foundation by adding community engagement features.

Recommended Sprint 2 priorities:

1. Timestamped comments on transcript segments
2. Replies or threaded discussion under comments
3. Likes and reactions
4. Saved episodes or bookmarked transcript moments
5. Discussion board structure
6. Supabase-backed persistence for the above features

Recommended technical next steps:

- Replace sample data reads with Supabase queries where appropriate.
- Connect Supabase Auth.
- Add tables for comments, replies, reactions, and saved items.
- Add tests around timestamped comment creation and display.
- Update e2e tests to include a signed-in comment flow.

## Meeting Notes I Should Be Ready To Explain

If asked what I built:

- I built the first working version of the app’s content experience: podcast browsing, podcast details, episode pages, transcripts, branded UI, and basic auth screens.

If asked why community features are not built yet:

- Community features depend on having episodes and transcript segments first. Sprint 1 created that foundation, and Sprint 2 is where timestamped comments and discussions will attach to those transcript moments.

If asked what is temporary:

- The sample content and local auth flow are temporary. They let me validate UI, routing, and user flow before connecting Supabase.

If asked how I know it works:

- Lint, component/unit tests, Playwright e2e tests, and production build all pass. The QA results are documented in `docs/testing/sprint-1-qa-pass.md`.

If asked how this supports the final capstone:

- The app now has the structure needed for the full product: content, identity, routing, transcript moments, testing, documentation, and a GitHub history that shows incremental development.

## Final Sprint 1 Assessment

Sprint 1 met its main goal: establish the foundation and core experience for Rediscovering Faith.

The project is ready to move into Sprint 2, where the app can start becoming more explicitly community-driven through timestamped comments, discussions, reactions, and saved engagement features.
