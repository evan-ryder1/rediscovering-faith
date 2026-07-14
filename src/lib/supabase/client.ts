"use client";

import { getSupabaseConfig } from "./env";
import { loadSupabaseSsrPackage } from "./package";

export async function createSupabaseBrowserClient<TClient = unknown>() {
  const { url, anonKey } = getSupabaseConfig();
  const { createBrowserClient } = await loadSupabaseSsrPackage();

  return createBrowserClient(url, anonKey) as TClient;
}
