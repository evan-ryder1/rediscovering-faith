# Supabase Client Setup

Status: utility structure added, package installation pending network access.

Supabase's current Next.js SSR guidance uses:

- `@supabase/supabase-js`
- `@supabase/ssr`

Install them before using Supabase-backed features:

```bash
npm install @supabase/supabase-js @supabase/ssr
```

## Environment Variables

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are used by the current client utilities. `SUPABASE_SERVICE_ROLE_KEY` is listed for future server-only admin workflows and must never be exposed to the browser.

## Utility Files

- `src/lib/supabase/env.ts` validates required public Supabase environment variables.
- `src/lib/supabase/client.ts` creates a browser client for Client Components.
- `src/lib/supabase/server.ts` creates a cookie-aware server client for Server Components, Server Actions, and Route Handlers.

## Notes

- The helper functions are asynchronous because the Supabase package could not be installed while this documentation was created.
- Once the package is installed, the dynamic loader can be converted to direct imports if desired.
- Server-side authorization should use verified Supabase Auth data. Do not trust a raw session object alone for protected data access.
