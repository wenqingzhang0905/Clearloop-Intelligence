import { useState } from 'react';
import { epaEgridData, rpsData, policyData } from '../data/mockData';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'#111c2d', border:'1px solid #243447', borderRadius:8, padding:'10px 14px', fontSize:12 }}>
      <div style={{ color:'#8aa3be', marginBottom:4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }}>{p.name}: {p.value.toLocaleString()}</div>
      ))}
    </div>
  );
};

const CO2_COLOR = (val) => {
  if (val > 1000) return '#f44336';
  if (val > 800)  return '#ff9800';
  if (val > 600)  return '#ffeb3b';
  return '#00c853';
};

const RPS_STATUS_BADGE = {
  'On Track': 'badge-green',
  'At Risk':  'badge-orange',
  'Achieved': 'badge-teal',
};

const POLICY_IMPACT_BADGE = {
  'High':   'badge-green',
  'Medium': 'badge-blue',
  'Low':    'badge-gray',
};

const POLICY_STATUS_BADGE = {
  'Active':   'badge-green',
  'Proposed': 'badge-orange',
  'Expired':  'badge-gray',
};

const TABS = ['EPA eGRID', 'RPS Tracker', 'Policy Landscape'];

export default function MarketIntelligence() {
  const [tab, setTab] = useState(0);

  return (
    <div>
      <div className="page-hdr">
        <div className="page-title">Market Intelligence</div>
        <div className="page-sub">EPA eGRID emission factors · State RPS tracker · Federal &amp; state policy</div>
      </div>

      {/* Tab bar */}
      <div style={{ display:'flex', gap:4, marginBottom:20, borderBottom:'1px solid var(--border)', paddingBottom:0 }}>
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            style={{
              padding:'9px 18px',
              background: 'none',
              border: 'none',
              borderBottom: tab === i ? '2px solid var(--green)' : '2px solid transparent',
              color: tab === i ? 'var(--green)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: tab === i ? 600 : 400,
              transition: 'all 0.12s',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── TAB 0: EPA eGRID ────────────────────────────── */}
      {tab === 0 && (
        <div>
          <div className="notice notice-green">
            <span>📋</span>
            Source: EPA eGRID 2023 data. CO₂ rates in lbs/MWh. Non-hydro RE% = % of generation from wind, solar, geothermal, biomass.
          </div>

          <div className="grid-1-1">
            <div className="card">
              <div className="card-hdr">
                <span className="card-title">CO₂ Emission Rate by Subregion (lbs/MWh)</span>
                <span className="chip chip-blue">eGRID 2023</span>
              </div>
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={[...epaEgridData].sort((a,b)=>b.co2-a.co2)} margin={{ top:4, right:8, bottom:20, left:0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="subregion" tick={{ fontSize:10 }} angle={-35} textAnchor="end" />
                  <YAxis tick={{ fontSize:10 }} />
                  <Tooltip content={tip} />
                  <Bar dataKey="co2" name="CO₂ (lbs/MWh)" radius={[4,4,0,0]}>
                    {[...epaEgridData].sort((a,b)=>b.co2-a.co2).map((d,i) => (
                      <Cell key={i} fill={CO2_COLOR(d.co2)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <div className="card-hdr">
                <span className="card-title">Non-Hydro Renewable % by Subregion</span>
              </div>
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={[...epaEgridData].sort((a,b)=>b.re_pct-a.re_pct)} margin={{ top:4, right:8, bottom:20, left:0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="subregion" tick={{ fontSize:10 }} angle={-35} textAnchor="end" />
                  <YAxis tick={{ fontSize:10 }} unit="%" />
                  <Tooltip content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    return (
                      <div style={{ background:'#111c2d', border:'1px solid #243447', borderRadius:8, padding:'10px 14px', fontSize:12 }}>
                        <div style={{ color:'#8aa3be', marginBottom:4 }}>{label}</div>
                        <div style={{ color:'#00c853' }}>RE%: {payload[0]?.value}%</div>
                      </div>
                    );
                  }} />
                  <Bar dataKey="re_pct" name="Non-hydro RE%" fill="#00c853" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <div className="card-hdr">
              <span className="card-title">eGRID Subregion Detail</span>
              <span style={{ fontSize:11, color:'var(--text-muted)' }}>All emission rates in lbs/MWh</span>
            </div>
            <div className="tbl-wrap">
              <table className="dt">
                <thead>
                  <tr>
                    <th>Subregion</th>
                    <th>Name</th>
                    <th>Region</th>
                    <th>CO₂ (lbs/MWh)</th>
                    <th>SO₂ (lbs/MWh)</th>
                    <th>NOₓ (lbs/MWh)</th>
                    <th>Non-Hydro RE%</th>
                    <th>Intensity</th>
                  </tr>
                </thead>
                <tbody>
                  {[...epaEgridData].sort((a,b)=>b.co2-a.co2).map(d => (
                    <tr key={d.subregion}>
                      <td className="td-primary">{d.subregion}</td>
                      <td>{d.name}</td>
                      <td><span className="badge badge-gray">{d.region}</span></td>
                      <td style={{ fontWeight:600, color: CO2_COLOR(d.co2), fontVariantNumeric:'tabular-nums' }}>{d.co2}</td>
                      <td style={{ fontVariantNumeric:'tabular-nums' }}>{d.so2}</td>
                      <td style={{ fontVariantNumeric:'tabular-nums' }}>{d.nox}</td>
                      <td style={{ color:'var(--green-light)' }}>{d.re_pct}%</td>
                      <td style={{ width:120 }}>
                        <div className="em-bar-bg">
                          <div className="em-bar-fill" style={{ width:`${(d.co2/1200)*100}%`, background: CO2_COLOR(d.co2) }} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 1: RPS Tracker ──────────────────────────── */}
      {tab === 1 && (
        <div>
          <div className="notice notice-green">
            <span>📌</span>
            Renewable Portfolio Standards (RPS) — state-mandated minimum % of retail electricity sales from eligible renewable sources. Data as of Q1 2025.
          </div>

          <div className="metric-grid" style={{ gridTemplateColumns:'repeat(3,1fr)' }}>
            <div className="metric-card mc-green">
              <div className="metric-label">States On Track</div>
              <div className="metric-value">{rpsData.filter(r=>r.status==='On Track').length}</div>
              <div className="metric-unit">of {rpsData.length} tracked</div>
            </div>
            <div className="metric-card mc-teal">
              <div className="metric-label">Achieved</div>
              <div className="metric-value">{rpsData.filter(r=>r.status==='Achieved').length}</div>
              <div className="metric-unit">targets surpassed</div>
            </div>
            <div className="metric-card mc-orange">
              <div className="metric-label">At Risk</div>
              <div className="metric-value">{rpsData.filter(r=>r.status==='At Risk').length}</div>
              <div className="metric-unit">need acceleration</div>
            </div>
          </div>

          <div className="card">
            <div className="card-hdr">
              <span className="card-title">State RPS Progress</span>
              <span style={{ fontSize:11, color:'var(--text-muted)' }}>Current % vs. target requirement</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {[...rpsData].sort((a,b) => b.requirement - a.requirement).map(r => {
                const pct = Math.min((r.current / r.requirement) * 100, 100);
                return (
                  <div key={r.state}>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:5 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <span style={{ width:32, fontSize:12, fontWeight:700, color:'var(--text-primary)' }}>{r.state}</span>
                        <span style={{ fontSize:13, color:'var(--text-secondary)' }}>{r.name}</span>
                        <span className={`badge ${RPS_STATUS_BADGE[r.status]}`}>{r.status}</span>
                        <span style={{ fontSize:11, color:'var(--text-muted)' }}>{r.policy}</span>
                      </div>
                      <div style={{ display:'flex', alignItems:'center', gap:12, fontSize:12 }}>
                        <span style={{ color:'var(--text-muted)' }}>Target: <span style={{ color:'var(--text-primary)', fontWeight:600 }}>{r.requirement}%</span> by {r.target_year}</span>
                        <span style={{ color: r.current >= r.requirement ? 'var(--green)' : 'var(--text-secondary)', fontWeight:600, minWidth:40, textAlign:'right' }}>
                          {r.current}% now
                        </span>
                      </div>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <div className="prog-wrap" style={{ flex:1 }}>
                        <div className={`prog-fill ${r.status === 'Achieved' ? 'prog-green' : r.status === 'At Risk' ? 'prog-orange' : 'prog-blue'}`}
                          style={{ width:`${pct}%` }}
                        />
                      </div>
                      <span style={{ fontSize:10, color:'var(--text-muted)', minWidth:36, textAlign:'right' }}>{pct.toFixed(0)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: Policy Landscape ──────────────────────── */}
      {tab === 2 && (
        <div>
          <div className="notice notice-green">
            <span>📜</span>
            Key federal and state policies impacting renewable energy development, RECs, and clean energy markets. Updated Q1 2025.
          </div>

          <div className="metric-grid" style={{ gridTemplateColumns:'repeat(4,1fr)' }}>
            <div className="metric-card mc-green">
              <div className="metric-label">Active Policies</div>
              <div className="metric-value">{policyData.filter(p=>p.status==='Active').length}</div>
              <div className="metric-unit">tracked</div>
            </div>
            <div className="metric-card mc-orange">
              <div className="metric-label">Proposed</div>
              <div className="metric-value">{policyData.filter(p=>p.status==='Proposed').length}</div>
              <div className="metric-unit">pending</div>
            </div>
            <div className="metric-card mc-blue">
              <div className="metric-label">High Impact</div>
              <div className="metric-value">{policyData.filter(p=>p.impact==='High').length}</div>
              <div className="metric-unit">policies</div>
            </div>
            <div className="metric-card mc-purple">
              <div className="metric-label">REC Markets</div>
              <div className="metric-value">{policyData.filter(p=>p.category==='RECs').length}</div>
              <div className="metric-unit">active</div>
            </div>
          </div>

          <div className="card">
            <div className="card-hdr">
              <span className="card-title">Policy &amp; Incentive Tracker</span>
            </div>
            <div className="tbl-wrap">
              <table className="dt">
                <thead>
                  <tr>
                    <th>Policy / Program</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Value / Rate</th>
                    <th>Expiry</th>
                    <th>Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {policyData.map(p => (
                    <tr key={p.name}>
                      <td className="td-primary" style={{ maxWidth:300 }}>{p.name}</td>
                      <td style={{ fontSize:12 }}>{p.type}</td>
                      <td><span className="badge badge-gray">{p.category}</span></td>
                      <td><span className={`badge ${POLICY_STATUS_BADGE[p.status]}`}>{p.status}</span></td>
                      <td style={{ fontFamily:'monospace', fontSize:12, color:'var(--green-light)' }}>{p.value}</td>
                      <td style={{ color:'var(--text-muted)', fontSize:12 }}>{p.expiry}</td>
                      <td><span className={`badge ${POLICY_IMPACT_BADGE[p.impact]}`}>{p.impact}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
