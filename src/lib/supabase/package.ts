type SupabaseClientFactory = (
  supabaseUrl: string,
  supabaseKey: string,
  options?: unknown,
) => unknown;

type SupabaseSsrModule = {
  createBrowserClient: SupabaseClientFactory;
  createServerClient: SupabaseClientFactory;
};

const supabaseSsrPackage = "@supabase/ssr";

export async function loadSupabaseSsrPackage(): Promise<SupabaseSsrModule> {
  try {
    return (await import(supabaseSsrPackage)) as SupabaseSsrModule;
  } catch (error) {
    throw new Error(
      "Supabase client utilities require @supabase/ssr. Run `npm install @supabase/supabase-js @supabase/ssr` before using Supabase features.",
      { cause: error },
    );
  }
}
