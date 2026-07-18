# Sprint 1 QA Pass

Date: July 18, 2026

Status: Passed

## Scope

This QA pass covers the Sprint 1 product foundation for Rediscovering Faith:

- App shell and branded navigation
- Podcast list page
- Podcast detail pages
- Episode list page
- Episode detail pages
- Timestamped transcript display
- Sign-in and sign-up screens
- Basic local authenticated user flow
- Account page signed-in and signed-out states
- Desktop and mobile browser flows

## Automated Checks

### Lint

Command:

```bash
npm run lint
```

Result: Passed

Purpose:

- Confirms ESLint and Next.js rules pass.
- Catches TypeScript/React code quality issues.

### Component And Unit Tests

Command:

```bash
npm run test -- --runInBand
```

Result: Passed

Observed result:

- Test suites: 4 passed, 4 total
- Tests: 10 passed, 10 total

Coverage areas:

- Sample content data helpers
- Podcast library rendering
- Episode detail and transcript rendering
- Local auth flow state changes

### End-To-End Tests

Command:

```bash
npm run test:e2e
```

Result: Passed

Observed result:

- Browser tests: 4 passed
- Projects: desktop Chromium and mobile Chrome viewport

Coverage areas:

- Homepage loads.
- User navigates from homepage to podcast library.
- User opens a podcast detail page.
- User opens an episode detail page.
- User sees timestamped transcript content.
- User signs up.
- User lands on account page.
- User sees signed-in state.
- User signs out.
- User sees signed-out state.

### Production Build

Command:

```bash
npm run build
```

Result: Passed

Build output confirmed these routes:

- `/`
- `/account`
- `/auth/sign-in`
- `/auth/sign-up`
- `/episodes`
- `/episodes/finding-belonging-after-spiritual-burnout`
- `/episodes/asking-hard-questions-without-shame`
- `/episodes/sabbath-for-busy-people`
- `/episodes/praying-for-your-street`
- `/podcasts`
- `/podcasts/rediscovering-faith-conversations`
- `/podcasts/table-talk-theology`
- `/podcasts/neighborhood-prayer`

## Manual QA Checklist

The automated e2e suite verifies the main manual checklist items:

- Desktop route navigation works.
- Mobile route navigation works.
- Podcast cards route to podcast detail pages.
- Podcast detail pages route to episode detail pages.
- Episode detail pages render transcript segments.
- Sign-up creates a local session.
- Account page renders signed-in state.
- Sign-out returns the account page to signed-out state.

## Known Limitations

These are acceptable for Sprint 1 and should not block this QA pass:

- Authentication currently uses local browser storage, not Supabase Auth.
- Episode audio uses a placeholder panel instead of a real audio player.
- Podcast CRUD is represented through sample data and page structure; live create/update/delete is not connected yet.
- Transcript data is sample content, not Supabase-backed content.
- Timestamped comments and discussion boards are intentionally deferred to Sprint 2.

## QA Decision

Sprint 1 QA pass is accepted.

The current application is stable enough to proceed toward the Sprint 1 recap and then Sprint 2 planning.
