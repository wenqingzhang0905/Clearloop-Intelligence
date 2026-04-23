import { projects, productionMonthly, lmerData } from '../data/mockData';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
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

export default function Overview({ setPage }) {
  const totalCap    = projects.reduce((s, p) => s + p.capacity_mw, 0);
  const totalProd   = projects.reduce((s, p) => s + p.production_ytd_mwh, 0);
  const totalEmiss  = projects.reduce((s, p) => s + p.emissions_avoided_ytd_mtco2, 0);
  const active      = projects.filter(p => p.status === 'Active').length;

  return (
    <div>
      <div className="page-hdr">
        <div className="page-title">Clearloop Intelligence</div>
        <div className="page-sub">Unified platform for project performance, market data, and policy intelligence</div>
      </div>

      {/* KPI row */}
      <div className="metric-grid">
        <div className="metric-card mc-green">
          <div className="metric-icon">⚡</div>
          <div className="metric-label">Total Portfolio Capacity</div>
          <div className="metric-value">{totalCap.toLocaleString()}</div>
          <div className="metric-unit">MW installed</div>
          <div className="metric-chg chg-pos">▲ 40 MW added YTD</div>
        </div>
        <div className="metric-card mc-blue">
          <div className="metric-icon">🔋</div>
          <div className="metric-label">Production YTD</div>
          <div className="metric-value">{(totalProd / 1000).toFixed(0)}K</div>
          <div className="metric-unit">MWh generated</div>
          <div className="metric-chg chg-pos">▲ 12% vs. prior year</div>
        </div>
        <div className="metric-card mc-teal">
          <div className="metric-icon">🌿</div>
          <div className="metric-label">CO₂ Avoided YTD</div>
          <div className="metric-value">{(totalEmiss / 1000).toFixed(0)}K</div>
          <div className="metric-unit">metric tons CO₂</div>
          <div className="metric-chg chg-pos">▲ 9% vs. prior year</div>
        </div>
        <div className="metric-card mc-orange">
          <div className="metric-icon">🏭</div>
          <div className="metric-label">Active Projects</div>
          <div className="metric-value">{active}</div>
          <div className="metric-unit">of {projects.length} total</div>
          <div className="metric-chg" style={{ color:'#8aa3be' }}>1 in development</div>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid-2-1">
        <div className="card">
          <div className="card-hdr">
            <span className="card-title">Portfolio Production &amp; Emissions Avoided</span>
            <span className="chip chip-green">2024 YTD</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={productionMonthly} margin={{ top:4, right:4, bottom:0, left:4 }}>
              <defs>
                <linearGradient id="gProd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#00c853" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00c853" stopOpacity={0}   />
                </linearGradient>
                <linearGradient id="gEmiss" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#1de9b6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#1de9b6" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize:11 }} />
              <YAxis tick={{ fontSize:11 }} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
              <Tooltip content={tip} />
              <Area type="monotone" dataKey="mwh"             name="MWh"         stroke="#00c853" fill="url(#gProd)"  strokeWidth={2} />
              <Area type="monotone" dataKey="emissions_avoided" name="MT CO₂ Avoided" stroke="#1de9b6" fill="url(#gEmiss)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="card-hdr">
            <span className="card-title">LMER by Market</span>
            <span style={{ fontSize:10, color:'var(--text-muted)' }}>kg CO₂/kWh · 2024</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={[...lmerData].sort((a,b) => b.lmer - a.lmer)} layout="vertical" margin={{ top:0, right:10, bottom:0, left:10 }}>
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 0.55]} tick={{ fontSize:10 }} />
              <YAxis type="category" dataKey="market" tick={{ fontSize:11 }} width={55} />
              <Tooltip content={tip} />
              <Bar dataKey="lmer" name="LMER" fill="#2196f3" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Module quick links */}
      <div style={{ fontSize:13, color:'var(--text-secondary)', marginBottom:12 }}>Quick access</div>
      <div className="quick-grid">
        <div className="quick-card" onClick={() => setPage('projects')}>
          <div className="qc-icon">⚡</div>
          <div className="qc-label">Project Dashboard</div>
          <div className="qc-desc">Real-time production &amp; emissions by project. Firebase-connected for live data.</div>
        </div>
        <div className="quick-card" onClick={() => setPage('market')}>
          <div className="qc-icon">📊</div>
          <div className="qc-label">Market Data</div>
          <div className="qc-desc">LMER trends by ISO/RTO, WattTime MOER by balancing authority, regional maps.</div>
        </div>
        <div className="quick-card" onClick={() => setPage('intelligence')}>
          <div className="qc-icon">🔬</div>
          <div className="qc-label">Market Intelligence</div>
          <div className="qc-desc">EPA eGRID emission factors, state RPS tracker, federal &amp; state policy landscape.</div>
        </div>
      </div>
    </div>
  );
}
