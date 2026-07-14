type SupabaseConfig = {
  url: string;
  anonKey: string;
};

const missingValueMessages: Record<keyof SupabaseConfig, string> = {
  url: "Missing NEXT_PUBLIC_SUPABASE_URL. Add it to .env.local.",
  anonKey: "Missing NEXT_PUBLIC_SUPABASE_ANON_KEY. Add it to .env.local.",
};

export function getSupabaseConfig(): SupabaseConfig {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url) {
    throw new Error(missingValueMessages.url);
  }

  if (!anonKey) {
    throw new Error(missingValueMessages.anonKey);
  }

  return {
    url,
    anonKey,
  };
}
