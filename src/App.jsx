import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './pages/Overview';
import Projects from './pages/Projects';
import MarketData from './pages/MarketData';
import MarketIntelligence from './pages/MarketIntelligence';
import './index.css';

const PAGE_META = {
  overview:     { title: 'Overview',            subtitle: 'Platform summary & key metrics' },
  projects:     { title: 'Project Dashboard',   subtitle: 'Production & emissions by project · Firebase' },
  market:       { title: 'Market Data',         subtitle: 'LMER · WattTime MOER · Regional emissions' },
  intelligence: { title: 'Market Intelligence', subtitle: 'EPA eGRID · RPS tracker · Policy landscape' },
};

export default function App() {
  const [page, setPage] = useState('overview');

  const pages = {
    overview:     <Overview     setPage={setPage} />,
    projects:     <Projects />,
    market:       <MarketData />,
    intelligence: <MarketIntelligence />,
  };

  return (
    <div className="app">
      <Sidebar activePage={page} setPage={setPage} />
      <div className="main-container">
        <Header meta={PAGE_META[page]} />
        <main className="content">
          {pages[page]}
        </main>
      </div>
    </div>
  );
}
