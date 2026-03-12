import { useState, useRef } from 'react';
import { Camera, Upload, Loader, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';
import { analyzeCatMood } from '../services/claudeVision';
import { saveMoodLog } from '../utils/storage';

const MOOD_COLORS = {
  Happy: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Content: 'bg-green-100 text-green-800 border-green-200',
  Curious: 'bg-blue-100 text-blue-800 border-blue-200',
  Anxious: 'bg-purple-100 text-purple-800 border-purple-200',
  Scared: 'bg-red-100 text-red-800 border-red-200',
  Playful: 'bg-orange-100 text-orange-800 border-orange-200',
  Sleepy: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  Grumpy: 'bg-gray-100 text-gray-800 border-gray-200',
};

export default function MoodCapture({ apiKey, onLogSaved }) {
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | analyzing | done | error
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [catName, setCatName] = useState(() => localStorage.getItem('cat_name') || '');
  const fileInputRef = useRef();

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
      const base64 = e.target.result.split(',')[1];
      setImageBase64(base64);
      setStatus('idle');
      setResult(null);
    };
    reader.readAsDataURL(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  }

  async function analyze() {
    if (!imageBase64) return;
    setStatus('analyzing');
    setErrorMsg('');
    try {
      const moodResult = await analyzeCatMood(imageBase64, apiKey);
      setResult(moodResult);
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Analysis failed. Please try again.');
    }
  }

  function saveLog() {
    const entry = saveMoodLog({
      mood: result.mood,
      emoji: result.emoji,
      confidence: result.confidence,
      signals: result.signals,
      tip: result.tip,
      image: image,
      catName: catName || 'My Cat',
    });
    if (catName) localStorage.setItem('cat_name', catName);
    onLogSaved(entry);
    reset();
  }

  function reset() {
    setImage(null);
    setImageBase64(null);
    setStatus('idle');
    setResult(null);
    setErrorMsg('');
  }

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-4">
        <input
          type="text"
          placeholder="Cat's name (optional)"
          value={catName}
          onChange={(e) => setCatName(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 mb-4"
        />

        {!image ? (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-orange-200 rounded-2xl p-8 text-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-colors"
          >
            <div className="text-4xl mb-3">📸</div>
            <p className="text-gray-600 font-medium mb-1">Take or upload a photo</p>
            <p className="text-gray-400 text-sm">Tap to browse or drag & drop</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </div>
        ) : (
          <div className="relative">
            <img
              src={image}
              alt="Cat to analyze"
              className="w-full rounded-2xl object-cover max-h-64"
            />
            <button
              onClick={reset}
              className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-50"
            >
              <RotateCcw size={16} className="text-gray-600" />
            </button>
          </div>
        )}
      </div>

      {image && status === 'idle' && (
        <button
          onClick={analyze}
          className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2 text-lg"
        >
          <Camera size={20} />
          Analyze Mood
        </button>
      )}

      {status === 'analyzing' && (
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 text-center">
          <Loader size={32} className="animate-spin text-orange-400 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">Reading body language...</p>
          <p className="text-gray-400 text-sm mt-1">This takes a few seconds</p>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-50 rounded-2xl border border-red-200 p-4 flex items-start gap-3">
          <AlertCircle size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-red-700 font-medium text-sm">Analysis failed</p>
            <p className="text-red-500 text-xs mt-1">{errorMsg}</p>
            <button onClick={analyze} className="text-red-600 font-medium text-sm mt-2 underline">
              Try again
            </button>
          </div>
        </div>
      )}

      {status === 'done' && result && (
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-4 space-y-4">
          <div className="text-center">
            <span className="text-5xl">{result.emoji}</span>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">{result.mood}</h2>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {result.confidence} confidence
            </span>
          </div>

          <div className={`rounded-xl border p-3 ${MOOD_COLORS[result.mood] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
            <p className="text-sm font-medium mb-2">Observed signals:</p>
            <ul className="space-y-1">
              {result.signals.map((signal, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="mt-0.5">•</span>
                  <span>{signal}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-orange-50 rounded-xl p-3">
            <p className="text-xs font-semibold text-orange-700 mb-1">Owner tip:</p>
            <p className="text-sm text-orange-800">{result.tip}</p>
          </div>

          <button
            onClick={saveLog}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle size={18} />
            Save to Log
          </button>
        </div>
      )}
    </div>
  );
}
