import { useState } from 'react';
import { Key, ExternalLink } from 'lucide-react';
import { saveApiKey } from '../utils/storage';

export default function ApiKeySetup({ onSave }) {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  function handleSave() {
    if (!key.trim().startsWith('sk-ant-')) {
      setError('Please enter a valid Anthropic API key (starts with sk-ant-)');
      return;
    }
    saveApiKey(key.trim());
    onSave(key.trim());
  }

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">🐱</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Cat Mood Tracker</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Analyze your cat's mood with AI-powered photo recognition
        </p>

        <div className="bg-orange-50 rounded-xl p-4 mb-6 text-left">
          <div className="flex items-center gap-2 mb-2">
            <Key size={16} className="text-orange-500" />
            <span className="font-semibold text-gray-700 text-sm">Anthropic API Key Required</span>
          </div>
          <p className="text-xs text-gray-500 mb-3">
            Your key is stored locally on your device and never sent anywhere except to Anthropic's API.
          </p>
          <a
            href="https://console.anthropic.com/settings/keys"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-orange-600 hover:text-orange-700 font-medium"
          >
            Get your API key <ExternalLink size={12} />
          </a>
        </div>

        <input
          type="password"
          placeholder="sk-ant-..."
          value={key}
          onChange={(e) => { setKey(e.target.value); setError(''); }}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        {error && <p className="text-red-500 text-xs mb-3 text-left">{error}</p>}

        <button
          onClick={handleSave}
          disabled={!key.trim()}
          className="w-full bg-orange-400 hover:bg-orange-500 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          Start Tracking
        </button>
      </div>
    </div>
  );
}
