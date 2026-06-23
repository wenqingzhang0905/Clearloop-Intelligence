const NAV = [
  {
    section: 'Main',
    items: [
      { id: 'overview',     icon: '◈', label: 'Overview' },
    ],
  },
  {
    section: 'Data Modules',
    items: [
      { id: 'projects',     icon: '⚡', label: 'Project Dashboard' },
      { id: 'market',       icon: '📊', label: 'Market Data' },
      { id: 'moer',         icon: '⏱️', label: 'MOER Explorer' },
      { id: 'intelligence', icon: '🔬', label: 'Market Intelligence' },
    ],
  },
];

export default function Sidebar({ activePage, setPage }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-row">
          <div className="logo-icon">CL</div>
          <div>
            <div className="logo-name">Clearloop</div>
            <div className="logo-sub">Intelligence Platform</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV.map(({ section, items }) => (
          <div className="nav-section" key={section}>
            <div className="nav-label">{section}</div>
            {items.map(({ id, icon, label }) => (
              <div
                key={id}
                className={`nav-item ${activePage === id ? 'active' : ''}`}
                onClick={() => setPage(id)}
              >
                <span className="nav-icon">{icon}</span>
                {label}
              </div>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="footer-status">
          <div className="live-dot" />
          <span>Mock data active</span>
        </div>
        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>
          Firebase: pending config
        </div>
      </div>
    </aside>
  );
}
