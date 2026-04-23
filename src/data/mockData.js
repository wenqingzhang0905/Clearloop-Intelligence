export const projects = [
  {
    id: 'CLR-001', name: 'Pecos Wind Farm', type: 'Wind', state: 'TX', market: 'ERCOT',
    capacity_mw: 120, production_ytd_mwh: 285000, emissions_avoided_ytd_mtco2: 114000,
    status: 'Active', capacity_factor: 0.27, online_date: '2021-06-15',
  },
  {
    id: 'CLR-002', name: 'Mohave Solar Array', type: 'Solar', state: 'AZ', market: 'WECC',
    capacity_mw: 80, production_ytd_mwh: 156000, emissions_avoided_ytd_mtco2: 62400,
    status: 'Active', capacity_factor: 0.22, online_date: '2022-03-20',
  },
  {
    id: 'CLR-003', name: 'Allegheny Ridge Wind', type: 'Wind', state: 'PA', market: 'PJM',
    capacity_mw: 65, production_ytd_mwh: 142000, emissions_avoided_ytd_mtco2: 71000,
    status: 'Active', capacity_factor: 0.25, online_date: '2020-11-01',
  },
  {
    id: 'CLR-004', name: 'Abilene Solar Hub', type: 'Solar', state: 'TX', market: 'ERCOT',
    capacity_mw: 50, production_ytd_mwh: 98000, emissions_avoided_ytd_mtco2: 39200,
    status: 'Active', capacity_factor: 0.22, online_date: '2023-01-15',
  },
  {
    id: 'CLR-005', name: 'Iowa Prairie Wind', type: 'Wind', state: 'IA', market: 'MISO',
    capacity_mw: 100, production_ytd_mwh: 218000, emissions_avoided_ytd_mtco2: 98100,
    status: 'Active', capacity_factor: 0.25, online_date: '2021-09-10',
  },
  {
    id: 'CLR-006', name: 'Kern County Solar', type: 'Solar', state: 'CA', market: 'CAISO',
    capacity_mw: 40, production_ytd_mwh: 82000, emissions_avoided_ytd_mtco2: 20500,
    status: 'Development', capacity_factor: 0.23, online_date: '2025-03-01',
  },
];

export const productionMonthly = [
  { month: 'Jan', mwh: 38000, emissions_avoided: 15200 },
  { month: 'Feb', mwh: 42000, emissions_avoided: 16800 },
  { month: 'Mar', mwh: 56000, emissions_avoided: 22400 },
  { month: 'Apr', mwh: 68000, emissions_avoided: 27200 },
  { month: 'May', mwh: 75000, emissions_avoided: 30000 },
  { month: 'Jun', mwh: 82000, emissions_avoided: 32800 },
  { month: 'Jul', mwh: 88000, emissions_avoided: 35200 },
  { month: 'Aug', mwh: 85000, emissions_avoided: 34000 },
  { month: 'Sep', mwh: 72000, emissions_avoided: 28800 },
  { month: 'Oct', mwh: 61000, emissions_avoided: 24400 },
  { month: 'Nov', mwh: 45000, emissions_avoided: 18000 },
  { month: 'Dec', mwh: 39000, emissions_avoided: 15600 },
];

export const lmerData = [
  { market: 'MISO',   full_name: 'Midcontinent ISO',                    lmer: 0.452, trend: -0.012, year: 2024 },
  { market: 'SPP',    full_name: 'Southwest Power Pool',                 lmer: 0.478, trend: -0.009, year: 2024 },
  { market: 'SERC',   full_name: 'SERC Reliability Corp',                lmer: 0.415, trend: -0.011, year: 2024 },
  { market: 'PJM',    full_name: 'PJM Interconnection',                  lmer: 0.384, trend: -0.018, year: 2024 },
  { market: 'WECC',   full_name: 'Western Electricity Coordinating Council', lmer: 0.334, trend: -0.015, year: 2024 },
  { market: 'ERCOT',  full_name: 'Electric Reliability Council of Texas', lmer: 0.362, trend: -0.024, year: 2024 },
  { market: 'NYISO',  full_name: 'New York ISO',                         lmer: 0.296, trend: -0.022, year: 2024 },
  { market: 'ISO-NE', full_name: 'ISO New England',                      lmer: 0.271, trend: -0.019, year: 2024 },
  { market: 'CAISO',  full_name: 'California ISO',                       lmer: 0.218, trend: -0.031, year: 2024 },
];

export const lmerHistorical = [
  { year: '2019', MISO: 0.512, PJM: 0.448, ERCOT: 0.412, CAISO: 0.298, SPP: 0.521 },
  { year: '2020', MISO: 0.498, PJM: 0.432, ERCOT: 0.395, CAISO: 0.271, SPP: 0.509 },
  { year: '2021', MISO: 0.481, PJM: 0.415, ERCOT: 0.388, CAISO: 0.252, SPP: 0.497 },
  { year: '2022', MISO: 0.469, PJM: 0.401, ERCOT: 0.375, CAISO: 0.238, SPP: 0.488 },
  { year: '2023', MISO: 0.461, PJM: 0.392, ERCOT: 0.368, CAISO: 0.228, SPP: 0.483 },
  { year: '2024', MISO: 0.452, PJM: 0.384, ERCOT: 0.362, CAISO: 0.218, SPP: 0.478 },
];

export const wattTimeData = [
  { ba: 'MISO_MIDW', name: 'MISO Midwest',      moer: 0.441, signal: 'High',     market: 'MISO',   updated: '2024-01-15T14:30:00Z' },
  { ba: 'SPP_WAUE',  name: 'SPP West',           moer: 0.492, signal: 'High',     market: 'SPP',    updated: '2024-01-15T14:30:00Z' },
  { ba: 'SERC_SE',   name: 'SERC Southeast',     moer: 0.408, signal: 'Moderate', market: 'SERC',   updated: '2024-01-15T14:30:00Z' },
  { ba: 'PJM_ROAN',  name: 'PJM Roanoke',        moer: 0.392, signal: 'Moderate', market: 'PJM',    updated: '2024-01-15T14:30:00Z' },
  { ba: 'ERCT',      name: 'ERCOT All',           moer: 0.358, signal: 'Moderate', market: 'ERCOT',  updated: '2024-01-15T14:30:00Z' },
  { ba: 'WECC_NW',   name: 'WECC Northwest',      moer: 0.312, signal: 'Low',      market: 'WECC',   updated: '2024-01-15T14:30:00Z' },
  { ba: 'NYISO_NYC', name: 'NYISO NYC',           moer: 0.285, signal: 'Low',      market: 'NYISO',  updated: '2024-01-15T14:30:00Z' },
  { ba: 'ISONE_NEMA',name: 'ISO-NE N. Mass',      moer: 0.263, signal: 'Low',      market: 'ISO-NE', updated: '2024-01-15T14:30:00Z' },
  { ba: 'CAISO_NP',  name: 'CAISO North',         moer: 0.198, signal: 'Low',      market: 'CAISO',  updated: '2024-01-15T14:30:00Z' },
];

export const epaEgridData = [
  { subregion: 'ERCT', name: 'ERCOT All',              co2: 797,  so2: 0.48, nox: 0.86, re_pct: 31.2, region: 'South' },
  { subregion: 'RFCM', name: 'RFC Michigan',           co2: 1091, so2: 1.37, nox: 1.25, re_pct: 8.3,  region: 'Midwest' },
  { subregion: 'RFCE', name: 'RFC East',               co2: 748,  so2: 0.84, nox: 0.95, re_pct: 12.1, region: 'Northeast' },
  { subregion: 'RFCW', name: 'RFC West',               co2: 914,  so2: 1.12, nox: 1.08, re_pct: 9.4,  region: 'Midwest' },
  { subregion: 'CAMX', name: 'CAISO',                  co2: 481,  so2: 0.05, nox: 0.31, re_pct: 42.7, region: 'West' },
  { subregion: 'NYUP', name: 'NYISO Upstate',          co2: 314,  so2: 0.31, nox: 0.29, re_pct: 28.4, region: 'Northeast' },
  { subregion: 'NYCW', name: 'NYISO NYC/Westchester',  co2: 748,  so2: 0.41, nox: 0.59, re_pct: 5.2,  region: 'Northeast' },
  { subregion: 'NEWE', name: 'ISO-NE',                 co2: 597,  so2: 0.24, nox: 0.50, re_pct: 22.6, region: 'Northeast' },
  { subregion: 'MROE', name: 'MISO East',              co2: 1014, so2: 1.95, nox: 1.36, re_pct: 14.8, region: 'Midwest' },
  { subregion: 'SPSO', name: 'SPP South',              co2: 946,  so2: 1.28, nox: 1.12, re_pct: 24.1, region: 'South' },
  { subregion: 'SRSE', name: 'SERC Southeast',         co2: 881,  so2: 0.92, nox: 0.98, re_pct: 11.3, region: 'South' },
];

export const rpsData = [
  { state: 'CA', name: 'California',   requirement: 60, target_year: 2030, current: 35, status: 'On Track',  policy: 'SB 100' },
  { state: 'NY', name: 'New York',     requirement: 70, target_year: 2030, current: 28, status: 'At Risk',   policy: 'CLCPA' },
  { state: 'TX', name: 'Texas',        requirement: 10, target_year: 2025, current: 31, status: 'Achieved',  policy: 'SB 7' },
  { state: 'IL', name: 'Illinois',     requirement: 40, target_year: 2030, current: 18, status: 'On Track',  policy: 'FEJA' },
  { state: 'MA', name: 'Massachusetts',requirement: 35, target_year: 2030, current: 22, status: 'On Track',  policy: 'GWSA' },
  { state: 'NJ', name: 'New Jersey',   requirement: 50, target_year: 2030, current: 24, status: 'On Track',  policy: 'GSECA' },
  { state: 'CO', name: 'Colorado',     requirement: 50, target_year: 2030, current: 30, status: 'On Track',  policy: 'HB 1261' },
  { state: 'WA', name: 'Washington',   requirement: 100,target_year: 2045, current: 38, status: 'On Track',  policy: 'CETA' },
  { state: 'MI', name: 'Michigan',     requirement: 40, target_year: 2040, current: 15, status: 'On Track',  policy: 'PA 295' },
  { state: 'OR', name: 'Oregon',       requirement: 50, target_year: 2040, current: 31, status: 'On Track',  policy: 'SB 1547' },
  { state: 'NM', name: 'New Mexico',   requirement: 50, target_year: 2030, current: 27, status: 'On Track',  policy: 'ETA' },
  { state: 'MN', name: 'Minnesota',    requirement: 100,target_year: 2040, current: 24, status: 'At Risk',   policy: 'SF 4' },
];

export const policyData = [
  { name: 'IRA – Production Tax Credit (PTC)',         type: 'Federal Tax',       category: 'Incentive',    status: 'Active',   value: '$0.028/kWh', expiry: '2033', impact: 'High' },
  { name: 'IRA – Investment Tax Credit (ITC)',         type: 'Federal Tax',       category: 'Incentive',    status: 'Active',   value: '30%',        expiry: '2033', impact: 'High' },
  { name: 'EPA Clean Power Plan 2.0',                  type: 'Federal Regulation',category: 'Emissions',    status: 'Active',   value: 'N/A',        expiry: 'Ongoing', impact: 'High' },
  { name: 'FERC Order 2222 – DER Market Access',       type: 'Federal Regulation',category: 'Market Access',status: 'Active',   value: 'N/A',        expiry: 'Ongoing', impact: 'Medium' },
  { name: 'Clean Electricity Performance Program',     type: 'Federal Program',   category: 'Standard',     status: 'Proposed', value: 'N/A',        expiry: 'TBD',   impact: 'High' },
  { name: 'REC Market – WECC/WREGIS',                  type: 'Market Mechanism',  category: 'RECs',         status: 'Active',   value: '$8–12/REC',  expiry: 'Ongoing', impact: 'Medium' },
  { name: 'REC Market – PJM-GATS',                     type: 'Market Mechanism',  category: 'RECs',         status: 'Active',   value: '$4–8/REC',   expiry: 'Ongoing', impact: 'Medium' },
  { name: 'ERCOT CRS / TEXAS REC',                     type: 'State Program',     category: 'RECs',         status: 'Active',   value: 'Market',     expiry: 'Ongoing', impact: 'Medium' },
  { name: 'NY Tier 1 REC / RECsZEC Program',           type: 'State Program',     category: 'RECs',         status: 'Active',   value: '$25–35/REC', expiry: '2030',  impact: 'High' },
  { name: 'IL Clean Energy Jobs Act (CEJA)',            type: 'State Program',     category: 'Incentive',    status: 'Active',   value: 'Varies',     expiry: '2035',  impact: 'Medium' },
];
