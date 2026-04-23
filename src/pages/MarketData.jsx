import { useState } from 'react';
import { lmerData, lmerHistorical, wattTimeData } from '../data/mockData';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'#111c2d', border:'1px solid #243447', borderRadius:8, padding:'10px 14px', fontSize:12 }}>
      <div style={{ color:'#8aa3be', marginBottom:4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }}>{p.name}: {p.value}</div>
      ))}
    </div>
  );
};

function lmerColor(val) {
  if (val >= 0.45) return '#f44336';
  if (val >= 0.36) return '#ff9800';
  if (val >= 0.28) return '#ffeb3b';
  return '#00c853';
}

function emissionBarStyle(val, max = 0.55) {
  const pct = (val / max) * 100;
  const color = lmerColor(val);
  return { width: `${pct}%`, background: color };
}

const LINE_COLORS = {
  MISO:  '#f44336',
  PJM:   '#ff9800',
  ERCOT: '#ffeb3b',
  CAISO: '#00c853',
  SPP:   '#9c27b0',
};

export default function MarketData() {
  const [selectedMarket, setSelectedMarket] = useState('ERCOT');

  const selected = lmerData.find(d => d.market === selectedMarket);
  const wattSelected = wattTimeData.filter(d => d.market === selectedMarket);

  return (
    <div>
      <div className="page-hdr">
        <div className="page-title">Market Data</div>
        <div className="page-sub">Long-Run Marginal Emission Rates (LMER) · WattTime MOER · Regional analysis</div>
      </div>

      {/* Market selector — region grid */}
      <div className="card" style={{ marginBottom:20 }}>
        <div className="card-hdr">
          <span className="card-title">ISO/RTO Markets — 2024 LMER (kg CO₂/kWh)</span>
          <span style={{ fontSize:11, color:'var(--text-muted)' }}>
            <span style={{ color:'#00c853' }}>● Low</span>
            &nbsp;&nbsp;<span style={{ color:'#ffeb3b' }}>● Moderate</span>
            &nbsp;&nbsp;<span style={{ color:'#ff9800' }}>● High</span>
            &nbsp;&nbsp;<span style={{ color:'#f44336' }}>● Very High</span>
          </span>
        </div>
        <div className="region-grid">
          {lmerData.map(d => (
            <div
              key={d.market}
              className={`region-card ${selectedMarket === d.market ? 'selected' : ''}`}
              onClick={() => setSelectedMarket(d.market)}
            >
              <div className="rc-market">{d.market}</div>
              <div className="rc-name">{d.full_name}</div>
              <div className="rc-value" style={{ color: lmerColor(d.lmer) }}>{d.lmer.toFixed(3)}</div>
              <div className="rc-unit">kg CO₂/kWh</div>
              <div className={`rc-trend ${d.trend < 0 ? 'neg' : 'pos'}`}>
                {d.trend < 0 ? '▼' : '▲'} {Math.abs(d.trend).toFixed(3)} yr/yr
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts row */}
      <div className="grid-1-1">
        <div className="card">
          <div className="card-hdr">
            <span className="card-title">LMER Comparison — All Markets</span>
            <span className="chip chip-blue">2024</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={[...lmerData].sort((a,b) => b.lmer - a.lmer)} margin={{ top:4, right:8, bottom:0, left:0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="market" tick={{ fontSize:11 }} />
              <YAxis tick={{ fontSize:11 }} domain={[0, 0.55]} tickFormatter={v => v.toFixed(2)} />
              <Tooltip content={tip} />
              <Bar dataKey="lmer" name="LMER (kg CO₂/kWh)" radius={[4,4,0,0]}>
                {[...lmerData].sort((a,b) => b.lmer - a.lmer).map((d, i) => (
                  <Cell key={i} fill={lmerColor(d.lmer)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="card-hdr">
            <span className="card-title">LMER Trends 2019–2024</span>
            <span style={{ fontSize:10, color:'var(--text-muted)' }}>Selected markets</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={lmerHistorical} margin={{ top:4, right:8, bottom:0, left:0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" tick={{ fontSize:11 }} />
              <YAxis tick={{ fontSize:11 }} domain={[0.15, 0.55]} tickFormatter={v => v.toFixed(2)} />
              <Tooltip content={tip} />
              {Object.entries(LINE_COLORS).map(([key, color]) => (
                <Line key={key} type="monotone" dataKey={key} name={key} stroke={color} strokeWidth={2} dot={false} />
              ))}
            </LineChart>
          </ResponsiveContainer>
          <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginTop:8 }}>
            {Object.entries(LINE_COLORS).map(([k, c]) => (
              <div key={k} style={{ display:'flex', alignItems:'center', gap:4, fontSize:11, color:'var(--text-secondary)' }}>
                <div style={{ width:20, height:2, background:c, borderRadius:1 }} />
                {k}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected market deep dive */}
      {selected && (
        <div className="card" style={{ marginBottom:20 }}>
          <div className="card-hdr">
            <span className="card-title">{selected.market} — {selected.full_name}</span>
            <span className="chip chip-blue">Selected</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20, marginBottom:16 }}>
            <div>
              <div style={{ fontSize:10, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:6 }}>2024 LMER</div>
              <div style={{ fontSize:28, fontWeight:700, color: lmerColor(selected.lmer) }}>{selected.lmer.toFixed(3)}</div>
              <div style={{ fontSize:11, color:'var(--text-muted)' }}>kg CO₂/kWh</div>
            </div>
            <div>
              <div style={{ fontSize:10, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:6 }}>Year-over-Year Trend</div>
              <div style={{ fontSize:28, fontWeight:700, color: selected.trend < 0 ? 'var(--green)' : 'var(--red)' }}>
                {selected.trend < 0 ? '▼' : '▲'} {Math.abs(selected.trend).toFixed(3)}
              </div>
              <div style={{ fontSize:11, color:'var(--text-muted)' }}>kg CO₂/kWh per year</div>
            </div>
            <div>
              <div style={{ fontSize:10, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:6 }}>Intensity vs. Avg</div>
              <div style={{ fontSize:28, fontWeight:700, color:'var(--text-primary)' }}>
                {((selected.lmer / (lmerData.reduce((s,d)=>s+d.lmer,0)/lmerData.length) - 1)*100).toFixed(0)}%
              </div>
              <div style={{ fontSize:11, color:'var(--text-muted)' }}>vs. national average</div>
            </div>
            <div>
              <div style={{ fontSize:10, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:6 }}>Data Source</div>
              <div style={{ fontSize:13, color:'var(--text-primary)' }}>EPA eGRID</div>
              <div style={{ fontSize:11, color:'var(--text-muted)' }}>+ WattTime LMER API</div>
            </div>
          </div>
          <div style={{ fontSize:10, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:8 }}>Emission Intensity</div>
          <div className="em-bar">
            <div className="em-bar-bg" style={{ flex:1 }}>
              <div className="em-bar-fill" style={emissionBarStyle(selected.lmer)} />
            </div>
            <span style={{ fontSize:12, color:'var(--text-secondary)', minWidth:50 }}>{selected.lmer.toFixed(3)}</span>
          </div>
        </div>
      )}

      {/* WattTime MOER */}
      <div className="card">
        <div className="card-hdr">
          <span className="card-title">WattTime — Marginal Operating Emission Rate (MOER)</span>
          <span style={{ fontSize:11, color:'var(--text-muted)' }}>kg CO₂/kWh · Live equivalent</span>
        </div>
        <div className="tbl-wrap">
          <table className="dt">
            <thead>
              <tr>
                <th>Balancing Authority</th>
                <th>Market</th>
                <th>MOER (kg CO₂/kWh)</th>
                <th>Emission Signal</th>
                <th>Intensity Bar</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {wattTimeData.map(d => (
                <tr key={d.ba}>
                  <td className="td-primary">{d.name}</td>
                  <td><span className="badge badge-gray">{d.market}</span></td>
                  <td style={{ fontVariantNumeric:'tabular-nums', fontWeight:600, color: lmerColor(d.moer) }}>{d.moer.toFixed(3)}</td>
                  <td>
                    <span className={`sig sig-${d.signal.toLowerCase()}`}>
                      <span className="sig-dot" />
                      {d.signal}
                    </span>
                  </td>
                  <td style={{ width:180 }}>
                    <div className="em-bar-bg">
                      <div className="em-bar-fill" style={emissionBarStyle(d.moer)} />
                    </div>
                  </td>
                  <td style={{ fontSize:11, color:'var(--text-muted)' }}>{new Date(d.updated).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop:16, padding:'10px 0', borderTop:'1px solid var(--border)', fontSize:11, color:'var(--text-muted)', display:'flex', gap:20 }}>
          <span>Source: WattTime API v3</span>
          <span>|</span>
          <span>Unit: kg CO₂/kWh (MOER = marginal operating emission rate)</span>
          <span>|</span>
          <span>Refresh: 5-minute intervals in production</span>
        </div>
      </div>
    </div>
  );
}
