import { useState } from 'react';
import { projects, productionMonthly } from '../data/mockData';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';

const tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'#111c2d', border:'1px solid #243447', borderRadius:8, padding:'10px 14px', fontSize:12 }}>
      <div style={{ color:'#8aa3be', marginBottom:4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }}>{p.name}: {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}</div>
      ))}
    </div>
  );
};

const STATUS_BADGE = {
  Active:      'badge-green',
  Development: 'badge-orange',
  Retired:     'badge-gray',
};

const TYPE_COLORS = { Solar: '#ffcc02', Wind: '#2196f3' };

export default function Projects() {
  const [selected, setSelected] = useState(null);

  const totalCap   = projects.reduce((s, p) => s + p.capacity_mw, 0);
  const totalProd  = projects.reduce((s, p) => s + p.production_ytd_mwh, 0);
  const totalEmiss = projects.reduce((s, p) => s + p.emissions_avoided_ytd_mtco2, 0);

  const byMarket = Object.entries(
    projects.reduce((acc, p) => {
      acc[p.market] = (acc[p.market] || 0) + p.capacity_mw;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const byType = [
    { name: 'Solar', value: projects.filter(p => p.type === 'Solar').reduce((s,p) => s+p.capacity_mw, 0) },
    { name: 'Wind',  value: projects.filter(p => p.type === 'Wind').reduce((s,p) => s+p.capacity_mw, 0) },
  ];

  const selectedProject = selected != null ? projects[selected] : null;

  return (
    <div>
      <div className="page-hdr">
        <div className="page-title">Project Dashboard</div>
        <div className="page-sub">Production &amp; emissions data across all Clearloop projects</div>
      </div>

      <div className="notice notice-orange">
        <span>🔗</span>
        Firebase integration ready — configure <code style={{ fontFamily:'monospace', background:'rgba(255,152,0,0.1)', padding:'1px 5px', borderRadius:4 }}>.env</code> with your project credentials to replace mock data with live Firestore queries.
      </div>

      {/* KPIs */}
      <div className="metric-grid">
        <div className="metric-card mc-green">
          <div className="metric-label">Total Capacity</div>
          <div className="metric-value">{totalCap}</div>
          <div className="metric-unit">MW</div>
        </div>
        <div className="metric-card mc-blue">
          <div className="metric-label">Production YTD</div>
          <div className="metric-value">{(totalProd/1000).toFixed(0)}K</div>
          <div className="metric-unit">MWh</div>
        </div>
        <div className="metric-card mc-teal">
          <div className="metric-label">CO₂ Avoided YTD</div>
          <div className="metric-value">{(totalEmiss/1000).toFixed(0)}K</div>
          <div className="metric-unit">MT CO₂</div>
        </div>
        <div className="metric-card mc-orange">
          <div className="metric-label">Active Projects</div>
          <div className="metric-value">{projects.filter(p=>p.status==='Active').length}</div>
          <div className="metric-unit">of {projects.length} total</div>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid-2-1" style={{ marginBottom:20 }}>
        <div className="card">
          <div className="card-hdr">
            <span className="card-title">Monthly Production &amp; CO₂ Avoided</span>
            <span className="chip chip-green">2024</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={productionMonthly} margin={{ top:4, right:4, bottom:0, left:0 }}>
              <defs>
                <linearGradient id="gP" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#00c853" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00c853" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gE" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#1de9b6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#1de9b6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize:11 }} />
              <YAxis tick={{ fontSize:11 }} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
              <Tooltip content={tip} />
              <Area type="monotone" dataKey="mwh"              name="MWh"          stroke="#00c853" fill="url(#gP)" strokeWidth={2} />
              <Area type="monotone" dataKey="emissions_avoided" name="MT CO₂ Avd."  stroke="#1de9b6" fill="url(#gE)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="card-hdr"><span className="card-title">Capacity Mix</span></div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={byType} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%`} labelLine={false} fontSize={11}>
                {byType.map((entry, i) => (
                  <Cell key={i} fill={TYPE_COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip content={tip} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display:'flex', gap:12, justifyContent:'center', marginTop:4 }}>
            {byType.map(t => (
              <div key={t.name} style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, color:'var(--text-secondary)' }}>
                <div style={{ width:10, height:10, borderRadius:2, background: TYPE_COLORS[t.name] }} />
                {t.name}: {t.value} MW
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Capacity by market */}
      <div className="card" style={{ marginBottom:20 }}>
        <div className="card-hdr"><span className="card-title">Capacity by Market (MW)</span></div>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={byMarket} margin={{ top:0, right:8, bottom:0, left:0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize:11 }} />
            <YAxis tick={{ fontSize:11 }} />
            <Tooltip content={tip} />
            <Bar dataKey="value" name="MW" fill="#2196f3" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Project table */}
      <div className="card">
        <div className="card-hdr">
          <span className="card-title">All Projects</span>
          <span style={{ fontSize:12, color:'var(--text-muted)' }}>Click row to expand</span>
        </div>
        <div className="tbl-wrap">
          <table className="dt">
            <thead>
              <tr>
                <th>ID</th>
                <th>Project</th>
                <th>Type</th>
                <th>State</th>
                <th>Market</th>
                <th>Capacity (MW)</th>
                <th>Production YTD (MWh)</th>
                <th>CO₂ Avoided (MT)</th>
                <th>CF</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p, i) => (
                <>
                  <tr key={p.id} onClick={() => setSelected(selected === i ? null : i)} style={{ cursor:'pointer' }}>
                    <td style={{ color:'var(--text-muted)', fontSize:11 }}>{p.id}</td>
                    <td className="td-primary">{p.name}</td>
                    <td>
                      <span className={`badge ${p.type==='Solar' ? 'badge-orange' : 'badge-blue'}`}>{p.type}</span>
                    </td>
                    <td>{p.state}</td>
                    <td><span className="badge badge-gray">{p.market}</span></td>
                    <td style={{ fontVariantNumeric:'tabular-nums' }}>{p.capacity_mw}</td>
                    <td style={{ fontVariantNumeric:'tabular-nums' }}>{p.production_ytd_mwh.toLocaleString()}</td>
                    <td style={{ fontVariantNumeric:'tabular-nums', color:'var(--green-light)' }}>{p.emissions_avoided_ytd_mtco2.toLocaleString()}</td>
                    <td>{(p.capacity_factor * 100).toFixed(0)}%</td>
                    <td><span className={`badge ${STATUS_BADGE[p.status]}`}>{p.status}</span></td>
                  </tr>
                  {selected === i && (
                    <tr key={`${p.id}-detail`}>
                      <td colSpan={10} style={{ background:'rgba(33,150,243,0.04)', padding:'14px 20px' }}>
                        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
                          <div>
                            <div style={{ fontSize:10, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:4 }}>Online Date</div>
                            <div style={{ fontSize:13, color:'var(--text-primary)' }}>{p.online_date}</div>
                          </div>
                          <div>
                            <div style={{ fontSize:10, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:4 }}>Emission Rate</div>
                            <div style={{ fontSize:13, color:'var(--text-primary)' }}>{(p.emissions_avoided_ytd_mtco2 / p.production_ytd_mwh * 1000).toFixed(1)} kg CO₂/MWh</div>
                          </div>
                          <div>
                            <div style={{ fontSize:10, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:4 }}>Revenue Streams</div>
                            <div style={{ fontSize:13, color:'var(--text-primary)' }}>RECs + PPA + ITC</div>
                          </div>
                          <div>
                            <div style={{ fontSize:10, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:4 }}>Firebase Collection</div>
                            <div style={{ fontFamily:'monospace', fontSize:12, color:'var(--blue-light)' }}>projects/{p.id}/production</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
