import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: { schema: 'staffflow' }
})

// Type helpers
export type Agency = {
  id: string; name: string; email: string; phone: string; city: string; plan: string;
  trial_worker_limit: number; trial_job_limit: number; created_at: string;
}
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
export type Placement = {
  id: string; agency_id: string; candidate_id: string; job_id: string; client_id: string;
  start_date: string; end_date: string; hourly_rate: number; status: string;
}
export type Timesheet = {
  id: string; agency_id: string; candidate_id: string; placement_id: string;
  client_id: string; week_start: string; week_end: string;
  regular_hours: number; overtime_hours: number; hourly_rate: number;
  status: string; submitted_at: string; reviewed_at: string;
  rejection_note: string;
}

// The fixed agency for Labour Max demo
export const AGENCY_ID = '00000000-0000-0000-0000-000000000001'
