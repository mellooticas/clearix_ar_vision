import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

/**
 * Browser client - SEM auto-refresh.
 *
 * O middleware (src/middleware.ts) ja chama supabase.auth.getUser()
 * server-side, que refresca o cookie automaticamente (padrao @supabase/ssr).
 * Deixar autoRefreshToken=true no browser cria disputa de navigator.locks
 * entre re-execucoes do auth-context (hydration / Strict Mode) ou multiplas
 * tabs do mesmo app, travando os fetches em pending para sempre.
 *
 * Padronizacao ecossistema 2026-05-21: ver clearix_clinics commit 1f6153b.
 */
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    detectSessionInUrl: false,
    persistSession: true,
  },
})
