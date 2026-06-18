'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { getSupabase } from '../../lib/supabase'

export default function TimesheetActions({ id }: { id: string }) {
  const [loading, setLoading] = useState<string | null>(null)
  const [rejectNote, setRejectNote] = useState('')
  const [showReject, setShowReject] = useState(false)

  const update = async (status: string, note?: string) => {
    setLoading(status)
    const supabase = getSupabase()
    await supabase.from('timesheets').update({
      status,
      reviewed_at: new Date().toISOString(),
      rejection_note: note || null,
    }).eq('id', id)
    setLoading(null)
    window.location.reload()
  }

  if (showReject) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 180 }}>
        <input
          value={rejectNote}
          onChange={e => setRejectNote(e.target.value)}
          placeholder="Reason for rejection..."
          style={{ padding: '5px 8px', fontSize: 11, border: '1px solid var(--border)', borderRadius: 6, outline: 'none' }}
        />
        <div style={{ display: 'flex', gap: 5 }}>
          <button onClick={() => update('Rejected', rejectNote)} style={{ flex: 1, padding: '5px 0', fontSize: 11, fontWeight: 600, background: 'var(--clay)', color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer' }}>
            Confirm
          </button>
          <button onClick={() => setShowReject(false)} style={{ flex: 1, padding: '5px 0', fontSize: 11, background: 'var(--sand)', border: '1px solid var(--border)', borderRadius: 5, cursor: 'pointer', color: 'var(--text-secondary)' }}>
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', gap: 6 }}>
      <button onClick={() => update('Approved')} disabled={!!loading} style={{ padding: '5px 10px', fontSize: 11, fontWeight: 600, background: 'var(--sage)', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
        {loading === 'Approved' ? '...' : 'Approve'}
      </button>
      <button onClick={() => setShowReject(true)} style={{ padding: '5px 10px', fontSize: 11, background: 'var(--sand)', color: 'var(--clay)', border: '1px solid var(--border)', borderRadius: 6, cursor: 'pointer' }}>
        Reject
      </button>
    </div>
  )
}
