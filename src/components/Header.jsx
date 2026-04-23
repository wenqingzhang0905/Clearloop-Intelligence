export default function Header({ meta }) {
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-title">{meta.title}</div>
        <div className="header-sub">{meta.subtitle}</div>
      </div>
      <div className="header-right">
        <span className="chip chip-green">● Live (Mock)</span>
        <span className="header-date">{today}</span>
      </div>
    </header>
  );
}
