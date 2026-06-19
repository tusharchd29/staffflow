'use client'
import { useState } from 'react'
import { getSupabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function TimesheetActions({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [rejectNote, setRejectNote] = useState('')
  const [showReject, setShowReject] = useState(false)

  const update = async (status: string, note?: string) => {
    setLoading(status)
    await getSupabase().from('timesheets').update({ status, reviewed_at: new Date().toISOString(), rejection_note: note || null }).eq('id', id)
    setLoading(null)
    router.refresh()
  }

  if (showReject) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, minWidth: 160 }}>
      <input value={rejectNote} onChange={e => setRejectNote(e.target.value)} placeholder="Reason..." style={{ padding: '4px 7px', fontSize: 11, border: '1px solid var(--border)', borderRadius: 5, outline: 'none' }} />
      <div style={{ display: 'flex', gap: 4 }}>
        <button onClick={() => update('Rejected', rejectNote)} style={{ flex: 1, padding: '4px 0', fontSize: 11, fontWeight: 600, background: 'var(--clay)', color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer' }}>Confirm</button>
        <button onClick={() => setShowReject(false)} style={{ flex: 1, padding: '4px 0', fontSize: 11, background: 'var(--sand)', border: '1px solid var(--border)', borderRadius: 5, cursor: 'pointer', color: 'var(--text-secondary)' }}>Cancel</button>
      </div>
    </div>
  )

  return (
    <div style={{ display: 'flex', gap: 5 }}>
      <button onClick={() => update('Approved')} disabled={!!loading} style={{ padding: '5px 10px', fontSize: 11, fontWeight: 600, background: 'var(--sage)', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
        {loading === 'Approved' ? '...' : 'Approve'}
      </button>
      <button onClick={() => setShowReject(true)} style={{ padding: '5px 10px', fontSize: 11, background: 'var(--sand)', color: 'var(--clay)', border: '1px solid var(--border)', borderRadius: 6, cursor: 'pointer' }}>
        Reject
      </button>
    </div>
  )
}
