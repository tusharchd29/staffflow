export const dynamic = 'force-dynamic'
import { getSupabase, AGENCY_ID } from '../../lib/supabase'
import AppShell from "../components/AppShell";
import AddCandidateButton from "../components/AddCandidateButton";
import CandidateGrid from "../components/CandidateGrid";
import { Suspense } from 'react';

async function getCandidates() {
  const supabase = getSupabase()
  const { data } = await supabase
    .from('candidates')
    .select('*')
    .eq('agency_id', AGENCY_ID)
    .order('created_at', { ascending: false })
  return data || []
}

export default async function CandidatesPage() {
  const candidates = await getCandidates()

  return (
    <AppShell>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 12 }}>
        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{candidates.length} workers in system</div>
        <AddCandidateButton />
      </div>
      <Suspense fallback={<div style={{ padding: 20, color: 'var(--text-muted)' }}>Loading...</div>}>
        <CandidateGrid candidates={candidates} />
      </Suspense>
    </AppShell>
  )
}
