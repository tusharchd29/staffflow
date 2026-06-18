'use client'
import { useRouter } from 'next/navigation'
import { getSupabase } from '../../lib/supabase'
import { useState } from 'react'

interface Props {
  jobId: string
  jobType: string
  status: string
}

export default function JobActions({ jobId, jobType, status }: Props) {
  const router = useRouter()
  const [showDetail, setShowDetail] = useState(false)
  const [marking, setMarking] = useState(false)

  const markFilled = async () => {
    setMarking(true)
    const supabase = getSupabase()
    await supabase.from('jobs').update({ status: 'Filled' }).eq('id', jobId)
    setMarking(false)
    router.refresh()
  }

  return (
    <div style={{ display: "flex", gap: 7, marginTop: 4 }}>
      <button
        onClick={markFilled}
        disabled={status === 'Filled' || marking}
        style={{
          flex: 1, padding: "7px 0", fontSize: 12,
          background: status === 'Filled' ? 'var(--sand)' : 'var(--sand)',
          border: "1px solid var(--border)", borderRadius: 7,
          cursor: status === 'Filled' ? 'not-allowed' : 'pointer',
          color: status === 'Filled' ? 'var(--text-muted)' : 'var(--text-secondary)'
        }}
      >
        {marking ? '...' : status === 'Filled' ? 'Filled ✓' : 'Mark Filled'}
      </button>
      {status !== "Filled" && (
        <a
          href={`/candidates?role=${encodeURIComponent(jobType)}`}
          style={{
            flex: 1, padding: "7px 0", fontSize: 12, fontWeight: 600,
            background: "var(--amber)", border: "none", borderRadius: 7,
            cursor: "pointer", color: "white", textDecoration: "none",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}
        >
          Match Workers
        </a>
      )}
    </div>
  )
}
