import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pxirxvmmqazosirbffge.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4aXJ4dm1tcWF6b3NpcmJmZmdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MjU2NDQsImV4cCI6MjA5NTEwMTY0NH0.6L8nMeQSYZ-rTonyf9cY3io3Ml4ddzoQxDUR1wsKrjg'

export function getSupabase() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    db: { schema: 'staffflow' }
  })
}

// For client components
export const supabase = getSupabase()

export const AGENCY_ID = '00000000-0000-0000-0000-000000000001'

export type Candidate = {
  id: string; agency_id: string; full_name: string; role: string; license_class: string | null;
  city: string; phone: string; email: string; status: string; rating: number;
  skills: string[]; criminal_check: boolean; cvos_abstract: boolean;
  whmis_cert: boolean; reference_verified: boolean; drug_test: boolean;
  notes: string; created_at: string;
}
export type Client = {
  id: string; agency_id: string; company_name: string; contact_name: string;
  email: string; phone: string; city: string; industry: string; notes: string;
}
export type Job = {
  id: string; agency_id: string; client_id: string; title: string; job_type: string;
  city: string; openings: number; filled: number; rate_min: number; rate_max: number;
  status: string; deadline: string; description: string; requirements: string[];
  posted_at: string;
}
export type Timesheet = {
  id: string; agency_id: string; candidate_id: string; placement_id: string;
  client_id: string; week_start: string; week_end: string;
  regular_hours: number; overtime_hours: number; hourly_rate: number;
  status: string; submitted_at: string; reviewed_at: string; rejection_note: string;
}
