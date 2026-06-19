'use client'
import { useRouter } from 'next/navigation'
import { getSupabase } from '../../lib/supabase'
import { useState } from 'react'

interface Props {
  jobId: string
  jobType: string
  status: string
  matchRoles?: string[]
}

export default function JobActions({ jobId, jobType, status, matchRoles }: Props) {
  const router = useRouter()
  const [marking, setMarking] = useState(false)
  const [reopening, setReopening] = useState(false)

  const markFilled = async () => {
    setMarking(true)
    await getSupabase().from('jobs').update({ status: 'Filled' }).eq('id', jobId)
    setMarking(false)
    router.refresh()
  }

  const reopen = async () => {
    setReopening(true)
    await getSupabase().from('jobs').update({ status: 'Active' }).eq('id', jobId)
    setReopening(false)
    router.refresh()
  }

  const roles = matchRoles || [jobType]
  const matchUrl = `/candidates?role=${encodeURIComponent(roles[0])}&allRoles=${encodeURIComponent(roles.join(','))}`

  if (status === 'Filled') {
    return (
      <div style={{ display: 'flex', gap: 7, marginTop: 4 }}>
        <button onClick={reopen} disabled={reopening} style={{ flex: 1, padding: '7px 0', fontSize: 12, background: 'var(--sand)', border: '1px solid var(--border)', borderRadius: 7, cursor: 'pointer', color: 'var(--clay)' }}>
          {reopening ? '...' : 'Re-open'}
        </button>
        <span style={{ flex: 1, padding: '7px 0', fontSize: 12, fontWeight: 600, background: '#E8F5E9', color: '#388E3C', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓ Filled</span>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', gap: 7, marginTop: 4 }}>
      <button onClick={markFilled} disabled={marking} style={{ flex: 1, padding: '7px 0', fontSize: 12, background: 'var(--sand)', border: '1px solid var(--border)', borderRadius: 7, cursor: 'pointer', color: 'var(--text-secondary)' }}>
        {marking ? '...' : 'Mark Filled'}
      </button>
      <a href={matchUrl} style={{ flex: 1, padding: '7px 0', fontSize: 12, fontWeight: 600, background: 'var(--amber)', border: 'none', borderRadius: 7, cursor: 'pointer', color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Match Workers
      </a>
    </div>
  )
}
