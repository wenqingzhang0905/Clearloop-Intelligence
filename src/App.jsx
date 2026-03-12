import { useState } from 'react';
import { Camera, ClipboardList, BarChart2, Settings } from 'lucide-react';
import ApiKeySetup from './components/ApiKeySetup';
import MoodCapture from './components/MoodCapture';
import MoodLog from './components/MoodLog';
import MoodTrends from './components/MoodTrends';
import { getApiKey, saveApiKey } from './utils/storage';

const TABS = [
  { id: 'capture', label: 'Capture', icon: Camera },
  { id: 'log', label: 'History', icon: ClipboardList },
  { id: 'trends', label: 'Trends', icon: BarChart2 },
];

export default function App() {
  const [apiKey, setApiKey] = useState(() => getApiKey());
  const [activeTab, setActiveTab] = useState('capture');
  const [logRefreshKey, setLogRefreshKey] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  if (!apiKey) {
    return <ApiKeySetup onSave={setApiKey} />;
  }

  function handleLogSaved() {
    setLogRefreshKey((k) => k + 1);
    setActiveTab('log');
  }

  function handleResetKey() {
    saveApiKey('');
    setApiKey('');
    setShowSettings(false);
  }

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col max-w-md mx-auto relative">
      {/* Header */}
      <header className="bg-white border-b border-orange-100 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐱</span>
          <h1 className="text-lg font-bold text-gray-800">Cat Mood Tracker</h1>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <Settings size={20} />
        </button>
      </header>

      {/* Settings dropdown */}
      {showSettings && (
        <div className="absolute top-14 right-4 bg-white rounded-2xl shadow-lg border border-gray-100 p-4 z-20 w-56">
          <p className="text-sm font-semibold text-gray-700 mb-1">API Key</p>
          <p className="text-xs text-gray-400 mb-3">
            Key stored locally on your device
          </p>
          <button
            onClick={handleResetKey}
            className="w-full text-sm text-red-500 hover:text-red-700 font-medium py-2 border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
          >
            Reset API Key
          </button>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'capture' && (
          <MoodCapture apiKey={apiKey} onLogSaved={handleLogSaved} />
        )}
        {activeTab === 'log' && (
          <MoodLog refreshKey={logRefreshKey} />
        )}
        {activeTab === 'trends' && (
          <MoodTrends />
        )}
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 flex">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex flex-col items-center py-3 gap-1 transition-colors ${
              activeTab === id
                ? 'text-orange-500'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon size={22} strokeWidth={activeTab === id ? 2.5 : 1.5} />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
