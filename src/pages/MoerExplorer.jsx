import { useMemo, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { BALANCING_AUTHORITIES, generateMoerDay } from '../data/moerMock';
import { FIREBASE_CONNECTED } from '../lib/firebase';

const tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#111c2d', border: '1px solid #243447', borderRadius: 8, padding: '10px 14px', fontSize: 12 }}>
      <div style={{ color: '#8aa3be', marginBottom: 4 }}>{label}</div>
      <div style={{ color: '#00c853' }}>MOER: {payload[0].value.toFixed(3)} kg CO₂/kWh</div>
    </div>
  );
};

function timeToMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

export default function MoerExplorer() {
  const [ba, setBa] = useState('TVA');
  const [date, setDate] = useState('2025-03-01');
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('23:55');

  const fullDay = useMemo(() => generateMoerDay(ba, date), [ba, date]);

  const filtered = useMemo(() => {
    const startMin = timeToMinutes(startTime);
    const endMin = timeToMinutes(endTime);
    return fullDay.filter(p => {
      const m = timeToMinutes(p.time);
      return m >= startMin && m <= endMin;
    });
  }, [fullDay, startTime, endTime]);

  const stats = useMemo(() => {
    if (!filtered.length) return null;
    const values = filtered.map(p => p.moer);
    return {
      min: Math.min(...values),
      max: Math.max(...values),
      avg: values.reduce((s, v) => s + v, 0) / values.length,
      count: values.length,
    };
  }, [filtered]);

  const baMeta = BALANCING_AUTHORITIES.find(b => b.ba === ba);

  return (
    <div>
      <div className="page-hdr">
        <div className="page-title">MOER Explorer</div>
        <div className="page-sub">WattTime Marginal Operating Emission Rate · 5-minute interval · by Balancing Authority</div>
      </div>

      {!FIREBASE_CONNECTED && (
        <div className="card" style={{ marginBottom: 20, borderLeft: '3px solid #ff9800' }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
            <strong style={{ color: '#ff9800' }}>Demo mode — mock data.</strong> Firebase is not yet connected.
            The chart below is generated from a deterministic mock series. To wire up live data, see{' '}
            <code>src/lib/firebase.js</code> (<code>fetchMoerData</code>) — I need: the Firestore collection name,
            the field names for BA / timestamp / MOER value, and your Firebase project config (or env vars).
          </div>
        </div>
      )}

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-hdr">
          <span className="card-title">Query Parameters</span>
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <label style={{ display: 'block', fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 }}>
              Balancing Authority
            </label>
            <select
              value={ba}
              onChange={e => setBa(e.target.value)}
              style={{ background: '#111c2d', color: 'var(--text-primary)', border: '1px solid #243447', borderRadius: 6, padding: '8px 12px', fontSize: 13 }}
            >
              {BALANCING_AUTHORITIES.map(b => (
                <option key={b.ba} value={b.ba}>{b.ba} — {b.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 }}>
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              style={{ background: '#111c2d', color: 'var(--text-primary)', border: '1px solid #243447', borderRadius: 6, padding: '8px 12px', fontSize: 13 }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 }}>
              Start Time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
              step={300}
              style={{ background: '#111c2d', color: 'var(--text-primary)', border: '1px solid #243447', borderRadius: 6, padding: '8px 12px', fontSize: 13 }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 }}>
              End Time
            </label>
            <input
              type="time"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
              step={300}
              style={{ background: '#111c2d', color: 'var(--text-primary)', border: '1px solid #243447', borderRadius: 6, padding: '8px 12px', fontSize: 13 }}
            />
          </div>
        </div>
      </div>

      {stats && (
        <div className="grid-1-1" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
          <div className="card">
            <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 }}>Min MOER</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#00c853' }}>{stats.min.toFixed(3)}</div>
          </div>
          <div className="card">
            <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 }}>Max MOER</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#f44336' }}>{stats.max.toFixed(3)}</div>
          </div>
          <div className="card">
            <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 }}>Average MOER</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>{stats.avg.toFixed(3)}</div>
          </div>
          <div className="card">
            <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 }}>Data Points</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>{stats.count}</div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-hdr">
          <span className="card-title">{baMeta?.name} ({ba}) — MOER on {date}</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>kg CO₂/kWh · 5-min interval</span>
        </div>
        <ResponsiveContainer width="100%" height={340}>
          <LineChart data={filtered} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="time" tick={{ fontSize: 11 }} minTickGap={40} />
            <YAxis tick={{ fontSize: 11 }} domain={['auto', 'auto']} tickFormatter={v => v.toFixed(2)} />
            <Tooltip content={tip} />
            <Line type="monotone" dataKey="moer" name="MOER" stroke="#00c853" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
        <div style={{ marginTop: 16, padding: '10px 0', borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--text-muted)', display: 'flex', gap: 20 }}>
          <span>Source: WattTime API (via Firebase)</span>
          <span>|</span>
          <span>Unit: kg CO₂/kWh</span>
          <span>|</span>
          <span>Interval: 5 minutes</span>
        </div>
      </div>
    </div>
  );
}
