'use client'

interface Props {
  timesheets: any[]
  totalBillable: number
  hst: number
}

export default function InvoiceButton({ timesheets, totalBillable, hst }: Props) {
  const generate = () => {
    const total = totalBillable + hst
    const today = new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })
    const invoiceNum = `INV-${Date.now().toString().slice(-6)}`

    const rows = timesheets.map(t => {
      const reg = t.regular_hours * t.hourly_rate
      const ot = t.overtime_hours * t.hourly_rate * 1.5
      const amt = reg + ot
      return `
        <tr>
          <td>${t.candidates?.full_name || '—'}</td>
          <td>${t.candidates?.role || '—'}</td>
          <td>${t.clients?.company_name || '—'}</td>
          <td>${t.week_start} – ${t.week_end}</td>
          <td style="text-align:center">${t.regular_hours}h</td>
          <td style="text-align:center">${t.overtime_hours > 0 ? `+${t.overtime_hours}h` : '—'}</td>
          <td style="text-align:right">$${t.hourly_rate}/hr</td>
          <td style="text-align:right;font-weight:600">$${amt.toLocaleString(undefined,{maximumFractionDigits:0})}</td>
        </tr>`
    }).join('')

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Invoice ${invoiceNum} — Labour Max Staffing</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 13px; color: #2C1A0E; background: white; padding: 48px; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; padding-bottom: 24px; border-bottom: 2px solid #2C1A0E; }
  .brand { font-size: 28px; font-weight: 700; color: #2C1A0E; letter-spacing: -0.5px; }
  .brand span { color: #C4841D; }
  .tagline { font-size: 12px; color: #9C8472; margin-top: 3px; }
  .invoice-meta { text-align: right; }
  .invoice-num { font-size: 20px; font-weight: 700; color: #C4841D; }
  .meta-row { font-size: 12px; color: #6B5744; margin-top: 3px; }
  .from-to { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 36px; }
  .section-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #9C8472; margin-bottom: 8px; }
  .name { font-size: 15px; font-weight: 600; margin-bottom: 4px; }
  .detail { font-size: 12px; color: #6B5744; line-height: 1.6; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 28px; }
  thead tr { background: #2C1A0E; color: white; }
  thead th { padding: 10px 12px; text-align: left; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
  tbody tr:nth-child(even) { background: #F5F0E8; }
  tbody td { padding: 10px 12px; border-bottom: 1px solid #DDD4C4; font-size: 12px; }
  .totals { margin-left: auto; width: 280px; }
  .total-row { display: flex; justify-content: space-between; padding: 7px 0; font-size: 13px; border-bottom: 1px solid #DDD4C4; }
  .total-row.grand { font-size: 18px; font-weight: 700; color: #C4841D; border-bottom: none; padding-top: 12px; }
  .footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid #DDD4C4; display: flex; justify-content: space-between; font-size: 11px; color: #9C8472; }
  @media print { body { padding: 24px; } }
</style>
</head>
<body>
<div class="header">
  <div>
    <div class="brand">Labour<span>Max</span> Staffing</div>
    <div class="tagline">Staffing Agency · Brampton, ON · info@labourmax.ca</div>
  </div>
  <div class="invoice-meta">
    <div class="invoice-num">${invoiceNum}</div>
    <div class="meta-row">Date: ${today}</div>
    <div class="meta-row">Due: Net 30</div>
  </div>
</div>

<div class="from-to">
  <div>
    <div class="section-label">From</div>
    <div class="name">Labour Max Staffing Inc.</div>
    <div class="detail">123 Queen St W, Brampton, ON L6X 1A1<br>info@labourmax.ca · (905) 555-0100<br>HST #: 123456789 RT0001</div>
  </div>
  <div>
    <div class="section-label">Bill To</div>
    <div class="name">Client Accounts</div>
    <div class="detail">Multiple clients — see line items below<br>GTA Region, Ontario</div>
  </div>
</div>

<table>
  <thead>
    <tr>
      <th>Worker</th><th>Role</th><th>Client</th><th>Week</th>
      <th style="text-align:center">Reg Hrs</th><th style="text-align:center">OT Hrs</th>
      <th style="text-align:right">Rate</th><th style="text-align:right">Amount</th>
    </tr>
  </thead>
  <tbody>${rows}</tbody>
</table>

<div class="totals">
  <div class="total-row"><span>Subtotal</span><span>$${totalBillable.toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>
  <div class="total-row"><span>HST (13%)</span><span>$${hst.toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>
  <div class="total-row grand"><span>Total Due</span><span>$${total.toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>
</div>

<div class="footer">
  <span>Payment due within 30 days · EFT preferred · info@labourmax.ca</span>
  <span>Generated by StaffFlow · ${today}</span>
</div>
</body>
</html>`

    const win = window.open('', '_blank')
    if (win) {
      win.document.write(html)
      win.document.close()
      setTimeout(() => win.print(), 500)
    }
  }

  return (
    <button onClick={generate} style={{ marginTop: 6, padding: '7px 16px', fontSize: 12, fontWeight: 600, background: 'var(--amber)', color: 'white', border: 'none', borderRadius: 7, cursor: 'pointer' }}>
      Generate Invoice
    </button>
  )
}
