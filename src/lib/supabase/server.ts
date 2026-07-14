import { cookies } from "next/headers";

import { getSupabaseConfig } from "./env";
import { loadSupabaseSsrPackage } from "./package";

type CookieToSet = {
  name: string;
  value: string;
  options?: Parameters<Awaited<ReturnType<typeof cookies>>["set"]>[2];
};

export async function createSupabaseServerClient<TClient = unknown>() {
  const { url, anonKey } = getSupabaseConfig();
  const cookieStore = await cookies();
  const { createServerClient } = await loadSupabaseSsrPackage();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot set cookies. Middleware or Server Actions can.
        }
      },
    },
  }) as TClient;
}
