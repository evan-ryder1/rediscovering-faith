# Sprint 1 Backlog: Foundation & Core Experience

Sprint dates: July 13, 2026 - July 19, 2026

Sprint goal: establish the technical foundation and first usable product experience for Rediscovering Faith.

## Definition of Done

A Sprint 1 task is done when:

- The work is implemented in the Next.js app or documented in the repo.
- The change has been committed to Git.
- The app passes `npm run lint`.
- User-facing work has been checked in the browser.
- Any needed setup steps are documented.

## Tasks

### RF-001: Confirm Sprint 1 scope and ClickUp workspace

Priority: High  
Due: July 13, 2026  
Feature area: Project Management

Acceptance criteria:

- ClickUp Space, Folder, or List is selected for the capstone.
- Sprint 1 statuses are created: Backlog, Ready, In Progress, Review, Done.
- Sprint 1 tasks are imported or manually entered.
- GitHub repo URL is attached to the project.

### RF-002: Create product requirements summary

Priority: High  
Due: July 13, 2026  
Feature area: Planning

Acceptance criteria:

- Problem statement is documented.
- Target users are identified.
- MVP feature list is defined.
- Out-of-scope items for Sprint 1 are named.

### RF-003: Create Supabase project and capture environment values

Priority: High  
Due: July 14, 2026  
Feature area: Supabase

Acceptance criteria:

- Supabase project is created.
- Project URL and anon key are added to local `.env.local`.
- `.env.example` matches required environment variables.
- Real secrets are not committed to Git.

### RF-004: Add Supabase client utilities

Priority: High  
Due: July 14, 2026  
Feature area: Supabase

Acceptance criteria:

- Supabase browser client helper is added.
- Supabase server client helper is added if needed by the auth approach.
- Missing environment variables fail clearly during development.
- Code uses TypeScript-friendly helpers.

### RF-005: Draft initial database schema

Priority: High  
Due: July 14, 2026  
Feature area: Database

Acceptance criteria:

- Tables are planned for profiles, podcasts, episodes, and transcript segments.
- Primary keys and relationships are documented.
- Row-level security expectations are noted.
- Schema notes are committed under `docs/`.

### RF-006: Build app shell and navigation

Priority: High  
Due: July 15, 2026  
Feature area: Frontend

Acceptance criteria:

- App has a consistent header/navigation.
- Main layout works on mobile and desktop.
- Core routes are represented in navigation.
- Styling aligns with the capstone visual direction.

### RF-007: Build authentication screens

Priority: High  
Due: July 15, 2026  
Feature area: Authentication

Acceptance criteria:

- Sign in page exists.
- Sign up page exists.
- Auth form states are clear to users.
- Supabase auth flow is connected or ready for connection once keys exist.

### RF-008: Implement basic authenticated user flow

Priority: High  
Due: July 16, 2026  
Feature area: Authentication

Acceptance criteria:

- User session can be detected.
- Signed-in and signed-out states render differently.
- Sign out path is available.
- Protected page behavior is documented or implemented.

### RF-009: Create podcast list page

Priority: High  
Due: July 16, 2026  
Feature area: Podcasts

Acceptance criteria:

- Podcast list route exists.
- Page displays sample podcast data.
- Empty/loading states are represented.
- Layout is responsive.

### RF-010: Create podcast detail page

Priority: Normal  
Due: July 16, 2026  
Feature area: Podcasts

Acceptance criteria:

- Podcast detail route exists.
- Page displays podcast title, description, and episode list.
- Navigation from list to detail works.
- Sample data can later be replaced by Supabase data.

### RF-011: Create episode detail page

Priority: High  
Due: July 17, 2026  
Feature area: Episodes

Acceptance criteria:

- Episode detail route exists.
- Page displays episode metadata.
- Page includes an audio placeholder or player area.
- Page links to transcript content.

### RF-012: Build transcript display

Priority: High  
Due: July 17, 2026  
Feature area: Transcripts

Acceptance criteria:

- Transcript is displayed in timestamped segments.
- Timestamp UI is readable and scannable.
- Layout leaves room for future timestamped comments.
- Sample transcript data is structured in a reusable way.

### RF-013: Add seed/sample content

Priority: Normal  
Due: July 17, 2026  
Feature area: Data

Acceptance criteria:

- Sample podcast, episode, and transcript data exists.
- Sample data is isolated so it can be replaced later.
- Demo content supports screenshots and instructor review.

### RF-014: Add first testing plan

Priority: Normal  
Due: July 18, 2026  
Feature area: Testing

Acceptance criteria:

- Testing approach for Sprint 1 is documented.
- Candidate tests for auth, routing, and transcript rendering are listed.
- Any deferred test setup is captured as Sprint 2 prep if needed.

### RF-015: Complete Sprint 1 QA pass

Priority: High  
Due: July 18, 2026  
Feature area: QA

Acceptance criteria:

- App is checked on desktop width.
- App is checked on mobile width.
- Navigation paths are verified.
- `npm run lint` passes.
- `npm run build` passes.

### RF-016: Write Sprint 1 recap

Priority: High  
Due: July 19, 2026  
Feature area: Portfolio

Acceptance criteria:

- Sprint 1 summary is added to the repo.
- Completed features are listed.
- Screenshots or demo notes are captured.
- GitHub commits and ClickUp progress are ready to show instructors or employers.
