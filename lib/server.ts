import { createClient as createSupabaseClient } from "@supabase/supabase-js"

export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.warn(
      "[v0] Supabase credentials not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables.",
    )
    // Return a dummy client that won't crash - it will fail gracefully on API calls
    return createSupabaseClient("https://placeholder.supabase.co", "dummy-key")
  }

  return createSupabaseClient(url, key)
}

// Export as createClient for easier imports
export { createServerClient as createClient }
