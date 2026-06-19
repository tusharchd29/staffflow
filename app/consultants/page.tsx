export const dynamic = 'force-dynamic'
import { getSupabase, AGENCY_ID } from '../../lib/supabase'
import AppShell from "../components/AppShell";
import ConsultantBoard from "../components/ConsultantBoard";

async function getData() {
  const supabase = getSupabase()
  const [{ data: candidates }, { data: placements }] = await Promise.all([
    supabase.from('candidates').select('*').eq('agency_id', AGENCY_ID),
    supabase.from('placements').select('*, clients(company_name, city)').eq('agency_id', AGENCY_ID).eq('status', 'Active'),
  ])
  return { candidates: candidates || [], placements: placements || [] }
}

export default async function ConsultantsPage() {
  const { candidates, placements } = await getData()
  return (
    <AppShell>
      <ConsultantBoard candidates={candidates} placements={placements} />
    </AppShell>
  )
}
