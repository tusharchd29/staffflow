import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://pxirxvmmqazosirbffge.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4aXJ4dm1tcWF6b3NpcmJmZmdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MjU2NDQsImV4cCI6MjA5NTEwMTY0NH0.6L8nMeQSYZ-rTonyf9cY3io3Ml4ddzoQxDUR1wsKrjg',
  { db: { schema: 'staffflow' } }
)
const AGENCY_ID = '00000000-0000-0000-0000-000000000001'

const clients = [
  { company_name: 'TruckPro Logistics', contact_name: 'Raj Sharma', email: 'raj@truckpro.ca', phone: '+1-905-555-0101', city: 'Brampton, ON', industry: 'Transport' },
  { company_name: 'BuildCore Inc.', contact_name: 'Tom Whitfield', email: 'tom@buildcore.ca', phone: '+1-416-555-0102', city: 'Scarborough, ON', industry: 'Construction' },
  { company_name: 'Maple Warehousing', contact_name: 'Linda Chow', email: 'linda@maplewh.ca', phone: '+1-905-555-0103', city: 'Mississauga, ON', industry: 'Logistics' },
  { company_name: 'FastFreight GTA', contact_name: 'Priya Nair', email: 'priya@fastfreight.ca', phone: '+1-416-555-0104', city: 'Etobicoke, ON', industry: 'Transport' },
  { company_name: 'SteelTech Mfg.', contact_name: "James O'Brien", email: 'james@steeltech.ca', phone: '+1-905-555-0105', city: 'Oshawa, ON', industry: 'Manufacturing' },
  { company_name: 'AeroLogix Inc.', contact_name: 'Sandra Patel', email: 'sandra@aerologix.ca', phone: '+1-905-555-0106', city: 'Brampton, ON', industry: 'Logistics' },
  { company_name: 'Ontario Cold Storage', contact_name: 'Derek Maas', email: 'derek@ontariocold.ca', phone: '+1-905-555-0107', city: 'Mississauga, ON', industry: 'Warehousing' },
  { company_name: 'Metro Transit Works', contact_name: 'Angela Yu', email: 'angela@metrotransit.ca', phone: '+1-416-555-0108', city: 'Toronto, ON', industry: 'Transport' },
  { company_name: 'Pinnacle Packaging', contact_name: 'Mike Kowalski', email: 'mike@pinnaclepkg.ca', phone: '+1-905-555-0109', city: 'Brampton, ON', industry: 'Manufacturing' },
  { company_name: 'GreenLeaf Distribution', contact_name: 'Fatima Hassan', email: 'fatima@greenleaf.ca', phone: '+1-905-555-0110', city: 'Mississauga, ON', industry: 'Logistics' },
  { company_name: 'Ridgeline Construction', contact_name: 'Chris Dubois', email: 'chris@ridgeline.ca', phone: '+1-416-555-0111', city: 'Scarborough, ON', industry: 'Construction' },
  { company_name: 'Nexus Auto Parts', contact_name: 'Harpreet Gill', email: 'harpreet@nexusauto.ca', phone: '+1-905-555-0112', city: 'Brampton, ON', industry: 'Manufacturing' },
]

const firstNames = ['Gurpreet','Parminder','Marcus','Taiwo','Ahmed','Harjit','Raj','Carlos','Jaspreet','Mandeep','Sukhwinder','Balvinder','Navdeep','Kulwinder','Amarjit','Diljit','Simran','Navneet','Rupinder','Paramjit','James','Michael','David','Robert','John','Kevin','Brian','Daniel','Christopher','Anthony','Emmanuel','Chukwuemeka','Olumide','Adebayo','Segun','Kwame','Kofi','Amadou','Ibrahim','Mohammed','Wei','Jian','Fang','Xiao','Ming','Hyun','Sung','Pedro','Jose','Miguel','Luis','Andrei','Mihai','Pavel','Stefan','Bogdan','Ravi','Arjun','Vikram','Sanjay','Deepak','Anil','Suresh','Ramesh','Mohit','Amit']
const lastNames = ['Singh','Kaur','Johnson','Adeyemi','Hassan','Brar','Dhaliwal','Mendez','Gill','Sharma','Kumar','Patel','Khan','Ahmed','Ali','Williams','Brown','Davis','Miller','Wilson','Okonkwo','Eze','Nwosu','Mensah','Asante','Diallo','Toure','Zhang','Wang','Li','Chen','Liu','Park','Kim','Lee','Rodriguez','Martinez','Garcia','Lopez','Hernandez','Popescu','Ionescu','Constantin','Verma','Gupta','Mishra','Yadav','Tiwari','Joshi','Nair','Pillai','Iyer','Reddy','Rao']
const cities = ['Brampton, ON','Mississauga, ON','Scarborough, ON','Etobicoke, ON','Toronto, ON','Oshawa, ON']
const roles = ['AZ Driver','AZ Driver','AZ Driver','DZ Driver','DZ Driver','DZ Driver','General Labour','General Labour','General Labour','General Labour','Forklift Operator','Forklift Operator','Warehouse Associate','Warehouse Associate','Industrial Worker']
const licenseMap: Record<string,string|null> = {'AZ Driver':'AZ','DZ Driver':'DZ','General Labour':null,'Forklift Operator':'Forklift Cert.','Warehouse Associate':null,'Industrial Worker':null}
const skillMap: Record<string,string[]> = {
  'AZ Driver':['Highway Transport','Shunting','TDG','Log Books','City Driving'],
  'DZ Driver':['City Delivery','Route Planning','Customer Service','Liftgate','Hand Truck'],
  'General Labour':['Material Handling','Site Cleanup','Steel-toed Boots','Flagging','Lifting 50lbs'],
  'Forklift Operator':['Counterbalance','Reach Truck','Order Picking','RF Scanner','Inventory'],
  'Warehouse Associate':['Pick & Pack','Shipping','Receiving','RF Scanner','Inventory Count'],
  'Industrial Worker':['Assembly Line','WHMIS','Machine Operation','Quality Control','Blueprint Reading'],
}
const statusWeights = ['Applied','Applied','Applied','Screened','Screened','Background Check','Background Check','Shortlisted','Interview','Offered','Placed','Placed','Placed']

function makeCandidates(count: number) {
  const used = new Set<string>()
  const out = []
  for (let i = 0; i < count; i++) {
    let name = ''
    for (let t = 0; t < 30; t++) {
      const fn = firstNames[Math.floor(Math.random() * firstNames.length)]
      const ln = lastNames[Math.floor(Math.random() * lastNames.length)]
      const candidate = `${fn} ${ln}`
      if (!used.has(candidate)) { used.add(candidate); name = candidate; break }
    }
    if (!name) name = `Worker ${i + 1}`
    const role = roles[Math.floor(Math.random() * roles.length)]
    const city = cities[Math.floor(Math.random() * cities.length)]
    const status = statusWeights[Math.floor(Math.random() * statusWeights.length)]
    const skills = [...(skillMap[role] || [])].sort(() => Math.random() - 0.5).slice(0, 2 + Math.floor(Math.random() * 3))
    const bias = ['Placed','Offered','Shortlisted'].includes(status) ? 0.88 : 0.52
    const isDriver = role.includes('Driver') || role === 'Forklift Operator'
    out.push({
      agency_id: AGENCY_ID,
      full_name: name,
      role,
      license_class: licenseMap[role] || null,
      city,
      phone: `+1-${['905','416','647'][Math.floor(Math.random()*3)]}-555-${String(1000+i).padStart(4,'0')}`,
      email: `${name.toLowerCase().replace(/[^a-z]/g,'.')}@email.com`,
      status,
      rating: parseFloat((3.8 + Math.random() * 1.2).toFixed(1)),
      skills,
      criminal_check: Math.random() < bias,
      cvos_abstract: isDriver ? Math.random() < bias : true,
      whmis_cert: Math.random() < bias,
      reference_verified: Math.random() < bias,
      drug_test: Math.random() < bias,
      notes: '',
    })
  }
  return out
}

const jobTemplates = [
  { title:'AZ Highway Driver', job_type:'Transport', openings:4, filled:1, rate_min:27, rate_max:30, status:'Urgent', requirements:['Class AZ','CVOS Clean','2+ yrs exp','TDG Asset'], description:'City and highway runs across GTA. Immediate start.' },
  { title:'DZ City Delivery Driver', job_type:'Transport', openings:3, filled:1, rate_min:24, rate_max:27, status:'Active', requirements:['Class DZ','CVOS Clean','Customer Service'], description:'Last-mile delivery across GTA.' },
  { title:'General Labour x5', job_type:'General Labour', openings:5, filled:2, rate_min:18, rate_max:21, status:'Urgent', requirements:['Steel-toed boots','Physical fitness','Background check'], description:'Site prep, material handling, cleanup.' },
  { title:'Forklift Operator', job_type:'Industrial', openings:2, filled:0, rate_min:22, rate_max:25, status:'Active', requirements:['Forklift Cert.','CVOS','Warehouse exp.'], description:'Counterbalance and reach truck. Afternoon shift.' },
  { title:'Assembly Line Operator', job_type:'Industrial', openings:4, filled:4, rate_min:20, rate_max:22, status:'Filled', requirements:['WHMIS','Mfg. exp.','Steel-toed boots'], description:'Automotive parts assembly. Rotating shifts.' },
  { title:'Warehouse Associate x3', job_type:'General Labour', openings:3, filled:1, rate_min:19, rate_max:22, status:'Active', requirements:['RF Scanner','Pick & Pack','Background check'], description:'Pick, pack, ship. Day and afternoon shifts.' },
  { title:'AZ Long Haul Driver', job_type:'Transport', openings:2, filled:0, rate_min:29, rate_max:34, status:'Urgent', requirements:['Class AZ','CVOS Clean','Logbooks','3+ yrs exp'], description:'Long haul Ontario–Quebec corridor. Home weekends.' },
  { title:'Industrial Cleaner', job_type:'General Labour', openings:3, filled:3, rate_min:17, rate_max:19, status:'Filled', requirements:['WHMIS','Background check','Evening availability'], description:'Commercial cleaning for industrial facilities.' },
  { title:'Reach Truck Operator', job_type:'Industrial', openings:2, filled:1, rate_min:23, rate_max:26, status:'Active', requirements:['Reach Truck Cert.','WHMIS','RF Scanner'], description:'High-bay racking facility. Raymond reach trucks.' },
  { title:'DZ Flatbed Driver', job_type:'Transport', openings:2, filled:0, rate_min:25, rate_max:28, status:'Active', requirements:['Class DZ','Flatbed exp.','CVOS Clean'], description:'Flatbed hauling, construction materials, GTA.' },
  { title:'Shipping & Receiving Clerk', job_type:'General Labour', openings:1, filled:0, rate_min:20, rate_max:23, status:'Active', requirements:['RF Scanner','Inventory','Background check'], description:'Manage inbound/outbound shipments.' },
  { title:'Machine Operator', job_type:'Industrial', openings:3, filled:1, rate_min:21, rate_max:24, status:'Active', requirements:['WHMIS','Machine ops','Quality Control'], description:'CNC and press machine operation.' },
  { title:'AZ Local Driver', job_type:'Transport', openings:3, filled:2, rate_min:26, rate_max:29, status:'Active', requirements:['Class AZ','CVOS Clean','City driving'], description:'Local GTA runs, daily home time.' },
  { title:'General Labour – Nights', job_type:'General Labour', openings:4, filled:0, rate_min:19, rate_max:21, status:'Urgent', requirements:['Steel-toed boots','Night shift','Background check'], description:'Night shift material handling and production support.' },
  { title:'Quality Control Inspector', job_type:'Industrial', openings:1, filled:0, rate_min:22, rate_max:25, status:'Active', requirements:['WHMIS','Blueprint Reading','Mfg. exp.'], description:'Inspect automotive parts against spec.' },
  { title:'Cold Storage Picker', job_type:'General Labour', openings:3, filled:2, rate_min:20, rate_max:23, status:'Active', requirements:['Cold storage exp.','RF Scanner','Steel-toed boots'], description:'Order picking in refrigerated warehouse (-20°C).' },
  { title:'G Licensed Courier', job_type:'Transport', openings:2, filled:1, rate_min:19, rate_max:22, status:'Active', requirements:['Class G','Clean abstract','Customer Service'], description:'Local courier, cargo van, GTA Metro.' },
  { title:'Pallet Jack Operator', job_type:'General Labour', openings:2, filled:0, rate_min:18, rate_max:20, status:'Active', requirements:['Electric pallet jack','RF Scanner','Background check'], description:'Unload containers, stage for production.' },
  { title:'DZ Tanker Driver', job_type:'Transport', openings:1, filled:0, rate_min:28, rate_max:32, status:'Urgent', requirements:['Class DZ','TDG','CVOS Clean','Tanker endorsement'], description:'Liquid tanker transport, industrial chemicals.' },
  { title:'Inventory Control Analyst', job_type:'General Labour', openings:1, filled:1, rate_min:21, rate_max:24, status:'Filled', requirements:['Inventory systems','Excel','Background check'], description:'Cycle counts, discrepancy resolution.' },
]

async function seed() {
  console.log('Starting seed...')

  await supabase.from('timesheets').delete().eq('agency_id', AGENCY_ID)
  await supabase.from('placements').delete().eq('agency_id', AGENCY_ID)
  await supabase.from('jobs').delete().eq('agency_id', AGENCY_ID)
  await supabase.from('candidates').delete().eq('agency_id', AGENCY_ID)
  await supabase.from('clients').delete().eq('agency_id', AGENCY_ID)
  console.log('Cleared old data')

  const { data: insertedClients, error: ce } = await supabase.from('clients').insert(clients.map(c => ({ ...c, agency_id: AGENCY_ID }))).select('id')
  if (ce) { console.error('Clients:', ce.message); return }
  const clientIds = insertedClients!.map(c => c.id)
  console.log(`${clientIds.length} clients inserted`)

  const allCandidates = makeCandidates(200)
  let allCandidateIds: string[] = []
  for (let i = 0; i < allCandidates.length; i += 50) {
    const { data, error } = await supabase.from('candidates').insert(allCandidates.slice(i, i+50)).select('id,status')
    if (error) { console.error('Candidates batch:', error.message); return }
    allCandidateIds.push(...data!.map((c:any) => c.id))
    process.stdout.write(`  candidates ${i+data!.length}/200\r`)
  }
  console.log(`200 candidates inserted              `)

  const jobs = jobTemplates.map((j, idx) => ({
    agency_id: AGENCY_ID, client_id: clientIds[idx % clientIds.length], ...j,
    city: cities[idx % cities.length],
    deadline: new Date(Date.now() + (5 + idx * 2) * 86400000).toISOString().split('T')[0],
    posted_at: new Date(Date.now() - (idx * 2 + 1) * 86400000).toISOString(),
  }))
  const { data: insertedJobs, error: je } = await supabase.from('jobs').insert(jobs).select('id')
  if (je) { console.error('Jobs:', je.message); return }
  console.log(`${insertedJobs!.length} jobs inserted`)

  const { data: placed } = await supabase.from('candidates').select('id').eq('agency_id', AGENCY_ID).eq('status', 'Placed')
  const placements = (placed || []).map((c:any, i:number) => ({
    agency_id: AGENCY_ID, candidate_id: c.id,
    client_id: clientIds[i % clientIds.length],
    job_id: insertedJobs![i % insertedJobs!.length].id,
    status: 'Active',
    start_date: new Date(Date.now() - (10 + i * 3) * 86400000).toISOString().split('T')[0],
    end_date: new Date(Date.now() + (30 + i * 5) * 86400000).toISOString().split('T')[0],
    hourly_rate: 22 + Math.floor(Math.random() * 10),
  }))
  if (placements.length > 0) {
    const { error: pe } = await supabase.from('placements').insert(placements)
    if (pe) console.error('Placements:', pe.message)
    else console.log(`${placements.length} placements inserted`)
  }

  const { data: placementRows } = await supabase.from('placements').select('id,candidate_id,client_id,hourly_rate').eq('agency_id', AGENCY_ID).limit(40)
  const timesheets = (placementRows || []).flatMap((p:any, i:number) =>
    [0,1].map(w => {
      const ws = new Date(Date.now() - (7 + w * 7 + i) * 86400000)
      ws.setDate(ws.getDate() - ws.getDay() + 1)
      const we = new Date(ws); we.setDate(ws.getDate() + 4)
      const reg = Math.min(36 + Math.floor(Math.random() * 12), 44)
      const ot = Math.random() > 0.7 ? Math.floor(Math.random() * 8) : 0
      const s = ['Approved','Approved','Approved','Pending','Pending','Rejected'][Math.floor(Math.random()*6)]
      return { agency_id: AGENCY_ID, candidate_id: p.candidate_id, placement_id: p.id, client_id: p.client_id, week_start: ws.toISOString().split('T')[0], week_end: we.toISOString().split('T')[0], regular_hours: reg, overtime_hours: ot, hourly_rate: p.hourly_rate, status: s, submitted_at: new Date(we.getTime() + 86400000).toISOString(), reviewed_at: null, rejection_note: null }
    })
  )
  for (let i = 0; i < timesheets.length; i += 50) {
    const { error: te } = await supabase.from('timesheets').insert(timesheets.slice(i, i+50))
    if (te) { console.error('Timesheets:', te.message); break }
  }
  console.log(`${timesheets.length} timesheets inserted`)
  console.log('DONE')
}

seed().catch(console.error)
