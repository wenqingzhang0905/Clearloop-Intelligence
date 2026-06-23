// Mock 5-minute MOER (Marginal Operating Emission Rate) generator.
// Stands in for the Firebase-backed WattTime feed until real credentials are wired up.

export const BALANCING_AUTHORITIES = [
  { ba: 'TVA',   name: 'Tennessee Valley Authority', baseline: 0.62, amplitude: 0.18 },
  { ba: 'CISO',  name: 'California ISO',             baseline: 0.42, amplitude: 0.22 },
  { ba: 'ERCO',  name: 'ERCOT',                       baseline: 0.55, amplitude: 0.16 },
  { ba: 'PJM',   name: 'PJM Interconnection',         baseline: 0.58, amplitude: 0.14 },
  { ba: 'MISO',  name: 'Midcontinent ISO',            baseline: 0.66, amplitude: 0.12 },
];

// Deterministic pseudo-random so the same BA/date always renders the same series.
function seededRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h) || 1;
}

/**
 * Generates 5-minute MOER readings for one BA over one calendar day.
 * Shape: diurnal curve (lower overnight, peak in evening) + noise.
 */
export function generateMoerDay(ba, dateStr) {
  const meta = BALANCING_AUTHORITIES.find(b => b.ba === ba) ?? BALANCING_AUTHORITIES[0];
  const rand = seededRandom(hashSeed(`${ba}-${dateStr}`));
  const points = [];
  const intervalsPerDay = 24 * 60 / 5; // 288

  for (let i = 0; i < intervalsPerDay; i++) {
    const hour = (i * 5) / 60;
    // Diurnal pattern: trough ~4am, peak ~7pm
    const diurnal = Math.sin(((hour - 10) / 24) * 2 * Math.PI);
    const noise = (rand() - 0.5) * 0.06;
    const value = meta.baseline + meta.amplitude * 0.5 * diurnal + noise;

    const hh = String(Math.floor(i / 12)).padStart(2, '0');
    const mm = String((i % 12) * 5).padStart(2, '0');

    points.push({
      timestamp: `${dateStr}T${hh}:${mm}:00Z`,
      time: `${hh}:${mm}`,
      moer: Math.max(0.05, Math.round(value * 1000) / 1000),
    });
  }
  return points;
}
