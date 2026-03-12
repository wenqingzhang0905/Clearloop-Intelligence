import { useState } from 'react';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { getMoodLogs, deleteMoodLog } from '../utils/storage';

const MOOD_COLORS = {
  Happy: 'bg-yellow-100 text-yellow-700',
  Content: 'bg-green-100 text-green-700',
  Curious: 'bg-blue-100 text-blue-700',
  Anxious: 'bg-purple-100 text-purple-700',
  Scared: 'bg-red-100 text-red-700',
  Playful: 'bg-orange-100 text-orange-700',
  Sleepy: 'bg-indigo-100 text-indigo-700',
  Grumpy: 'bg-gray-100 text-gray-700',
};

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function LogEntry({ entry, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div
        className="flex items-center gap-3 p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {entry.image && (
          <img
            src={entry.image}
            alt="cat"
            className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xl">{entry.emoji}</span>
            <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${MOOD_COLORS[entry.mood] || 'bg-gray-100 text-gray-700'}`}>
              {entry.mood}
            </span>
            {entry.catName && (
              <span className="text-xs text-gray-400">{entry.catName}</span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {formatDate(entry.timestamp)} · {formatTime(entry.timestamp)}
          </p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {expanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-50 pt-3 space-y-3">
          {entry.signals && entry.signals.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1">Observed signals</p>
              <ul className="space-y-0.5">
                {entry.signals.map((s, i) => (
                  <li key={i} className="text-sm text-gray-600 flex gap-2">
                    <span>•</span><span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {entry.tip && (
            <div className="bg-orange-50 rounded-xl p-3">
              <p className="text-xs font-semibold text-orange-700 mb-0.5">Tip</p>
              <p className="text-sm text-orange-800">{entry.tip}</p>
            </div>
          )}
          <button
            onClick={() => onDelete(entry.id)}
            className="flex items-center gap-1.5 text-red-400 hover:text-red-600 text-sm transition-colors"
          >
            <Trash2 size={14} />
            Delete entry
          </button>
        </div>
      )}
    </div>
  );
}

export default function MoodLog({ refreshKey }) {
  const [logs, setLogs] = useState(() => getMoodLogs());

  function handleDelete(id) {
    deleteMoodLog(id);
    setLogs(getMoodLogs());
  }

  // Refresh when new entry saved
  const currentLogs = getMoodLogs();

  if (currentLogs.length === 0) {
    return (
      <div className="p-4 text-center py-16">
        <div className="text-5xl mb-4">🐾</div>
        <p className="text-gray-600 font-medium">No entries yet</p>
        <p className="text-gray-400 text-sm mt-1">Capture your first cat mood to get started!</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      <p className="text-xs text-gray-400 font-medium">{currentLogs.length} entries logged</p>
      {currentLogs.map((entry) => (
        <LogEntry key={entry.id} entry={entry} onDelete={handleDelete} />
      ))}
    </div>
  );
}
