import { createClient } from './supabase'

export async function getSession() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function getProfile(userId: string) {
  const supabase = createClient()
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  return data
}

export async function getEnrolment(userId: string, program = 'mlat-level-1') {
  const supabase = createClient()
  const { data } = await supabase
    .from('enrolments')
    .select('*')
    .eq('user_id', userId)
    .eq('program', program)
    .eq('status', 'active')
    .single()
  return data
}
