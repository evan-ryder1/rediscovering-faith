# Sprint 2 Backlog: Community & Engagement

Sprint dates: July 20, 2026 - July 26, 2026

Sprint goal: turn passive podcast listening into visible community interaction around episode transcript moments.

## Demo Target

By the next supervisor meeting, the app should demonstrate this user flow:

```text
Episode transcript -> signed-in listener -> timestamped comment -> reply/reaction -> saved moment -> discussion board
```

## Tasks

### RF-017: Confirm Sprint 2 demo scope

Priority: High  
Due: July 20, 2026  
Feature area: Planning

Acceptance criteria:

- Sprint 2 demo outcome is documented.
- Must-have features are separated from nice-to-have features.
- ClickUp Sprint 2 tasks are created or imported.
- Sprint 2 scope is clear enough to avoid overbuilding.

### RF-018: Define community data model

Priority: High  
Due: July 20, 2026  
Feature area: Data

Acceptance criteria:

- Data types are defined for comments, replies, reactions, saved items, and discussion threads.
- Comments include `episodeId` and `transcriptSegmentId`.
- Sample community data is added.
- Data shape is compatible with future Supabase tables.

### RF-019: Add comment state management

Priority: High  
Due: July 21, 2026  
Feature area: Comments

Acceptance criteria:

- App can hold comment state for the current browser session.
- New comments can be added without a page refresh.
- Comments remain attached to the correct transcript segment.
- State layer is isolated so it can later be replaced by Supabase.

Status: Completed July 21, 2026 with local community state in `CommunityProvider`.

### RF-020: Build timestamped comment UI

Priority: High  
Due: July 21, 2026  
Feature area: Comments

Acceptance criteria:

- Transcript segments show comment counts or comment status.
- A signed-in listener can open a comment form for a segment.
- A signed-in listener can submit a comment.
- A signed-out visitor sees a clear sign-in prompt.
- New comments render under the selected transcript segment.

Status: Completed July 21, 2026 with timestamped comment UI on episode detail pages.

### RF-021: Add replies to comments

Priority: High  
Due: July 22, 2026  
Feature area: Replies

Acceptance criteria:

- Each comment can display replies.
- A signed-in listener can add a reply.
- Replies appear under the correct parent comment.
- Empty reply states are clear.

Status: Completed July 22, 2026 with nested reply forms and local reply state on timestamped comments.

### RF-022: Add likes and reactions

Priority: Normal  
Due: July 22, 2026  
Feature area: Reactions

Acceptance criteria:

- Comments have a reaction or like button.
- Reaction count updates in the UI.
- Interaction state is clear to the user.
- Reaction behavior is covered by tests.

Status: Completed July 22, 2026 with signed-in reaction toggles and test coverage.

### RF-023: Add saved episodes and bookmarks

Priority: High  
Due: July 23, 2026  
Feature area: Saved Items

Acceptance criteria:

- Signed-in listener can save an episode.
- Signed-in listener can save or bookmark a transcript segment.
- Saved state is visible in the episode UI.
- Account page reflects saved items or placeholder saved item counts.

### RF-024: Create discussion board page

Priority: High  
Due: July 23, 2026  
Feature area: Discussions

Acceptance criteria:

- Discussion board route exists.
- Episode detail page links to the discussion board.
- Discussion board shows seeded thread prompts.
- Thread cards show title, author, reply count, and related episode.

### RF-025: Add discussion thread detail view

Priority: Normal  
Due: July 24, 2026  
Feature area: Discussions

Acceptance criteria:

- Thread detail route or panel exists.
- Thread detail shows original prompt and replies.
- Signed-in listener can add a reply or see a sign-in prompt.
- Layout works on mobile and desktop.

### RF-026: Update account page for engagement

Priority: Normal  
Due: July 24, 2026  
Feature area: Account

Acceptance criteria:

- Account page shows saved episodes/bookmarks count.
- Account page shows comment or discussion activity.
- Empty states explain what will appear there.
- Local session flow still works.

### RF-027: Add component tests for Sprint 2 interactions

Priority: High  
Due: July 25, 2026  
Feature area: Testing

Acceptance criteria:

- Tests cover adding a timestamped comment.
- Tests cover signed-out comment prompt.
- Tests cover replies.
- Tests cover reactions.
- Tests cover saved/bookmarked state.

### RF-028: Add e2e test for community demo flow

Priority: High  
Due: July 25, 2026  
Feature area: Testing

Acceptance criteria:

- E2E test signs in or signs up.
- E2E test opens an episode transcript.
- E2E test adds a timestamped comment.
- E2E test reacts or replies.
- E2E test saves an episode or transcript moment.
- E2E test verifies discussion board navigation.

### RF-029: Complete Sprint 2 QA pass

Priority: High  
Due: July 26, 2026  
Feature area: QA

Acceptance criteria:

- `npm run lint` passes.
- `npm run test` passes.
- `npm run test:e2e` passes.
- `npm run build` passes.
- Desktop and mobile interaction flows are checked.
- Known limitations are documented.

### RF-030: Write Sprint 2 recap

Priority: High  
Due: July 26, 2026  
Feature area: Portfolio

Acceptance criteria:

- Sprint 2 recap is added to the repo.
- Completed community features are listed.
- Demo flow is documented.
- Test and QA results are summarized.
- Sprint 3 handoff notes are included.

## Recommended Build Order

1. Confirm Sprint 2 scope and data model.
2. Add sample community data and state management.
3. Build timestamped comment UI.
4. Add replies.
5. Add reactions.
6. Add saved/bookmark behavior.
7. Add discussion board.
8. Update account page.
9. Add tests.
10. Complete QA and recap.

## Main Risk

The biggest Sprint 2 risk is trying to build too many community features at production depth.

The right target is a believable, tested, demoable interaction loop. It is better to have timestamped comments, replies, reactions, and saves working with local/sample data than to spend the whole sprint trying to solve full backend persistence without a demoable product.
