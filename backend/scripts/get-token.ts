/// <reference types="node" />
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

// Uses the anon key (not the service key) — this simulates a real client sign-in.
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

const email = process.argv[2]
const password = process.argv[3]

if (!email || !password) {
  console.error('Usage: npx tsx scripts/get-token.ts <email> <password>')
  process.exit(1)
}

void (async () => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error || !data.session) {
    console.error('Sign-in failed:', error?.message ?? 'No session returned')
    process.exit(1)
  }

  console.log('\n--- Supabase session token ---')
  console.log(data.session.access_token)
  console.log('\nExpires:', new Date(data.session.expires_at! * 1000).toLocaleString())
  console.log('User ID:', data.user?.id ?? 'unknown')
})()
