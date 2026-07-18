# Rediscovering Faith

Rediscovering Faith is a web-based community platform for Christian podcast listeners. The project addresses a core gap in podcasting: episodes can inspire reflection, but the experience is usually one-way and does not naturally build ongoing online community.

The application will let listeners engage around podcast episodes through transcripts, timestamped comments, discussion boards, saved collections, prayer requests, group tools, and church/pastoral moderation workflows.

## Project Status

This repository is starting Sprint 1 of a four-week capstone build.

Current focus:

- Next.js project foundation
- Responsive app shell
- Authentication setup
- Podcast and episode pages
- Transcript display
- Supabase data model planning

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Supabase
- **Database:** Supabase Postgres
- **Authentication:** Supabase Auth
- **File Storage:** Supabase Storage
- **Real-time:** Supabase subscriptions
- **Testing:** Jest, Supertest, React Testing Library
- **Project Management:** ClickUp
- **Hosting/Deployment:** Cloudflare and Amazon Lightsail

## Sprint Plan

The project is organized into four one-week sprints:

1. **Foundation & Core Experience**
   - UX/UI design and responsive layout
   - Podcast CRUD and episode pages
   - Transcript display
   - Authentication setup

2. **Community & Engagement**
   - Timestamped comments
   - Discussion boards and replies
   - Likes and reactions
   - Saved collections and bookmarks

3. **Pastoral & Church Tools**
   - Pastor verification and roles
   - Moderation dashboard
   - Prayer request wall
   - Notifications and email alerts

4. **Admin, Groups & Deployment**
   - Group management
   - Leader tools and resources
   - Analytics dashboard
   - Deployment and final polish

See [docs/sprint-plan.md](docs/sprint-plan.md) for the working breakdown.

Sprint 1 planning files:

- [Sprint 1 backlog](docs/sprint-1-backlog.md)
- [ClickUp import guide](docs/clickup/import-guide.md)
- [ClickUp CSV import](docs/clickup/sprint-1-clickup-import.csv)
- [Supabase client setup](docs/supabase-client-setup.md)
- [Initial database schema](docs/database-schema.md)
- [Sample content](docs/sample-content.md)
- [Sprint 1 test plan](docs/testing/sprint-1-test-plan.md)

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Development Workflow

This capstone is being built with portfolio visibility in mind. Commits should document meaningful progress through the product:

- `chore:` setup, config, dependencies, tooling
- `feat:` user-facing features
- `fix:` bug fixes
- `docs:` project planning and documentation
- `test:` test coverage
- `refactor:` code improvements without behavior changes

Example:

```bash
git add .
git commit -m "docs: add capstone sprint plan"
git push
```

## Portfolio Goal

The final repository should show the full development story: product planning, incremental sprint delivery, thoughtful technical decisions, clean commit history, testing, and deployment.
