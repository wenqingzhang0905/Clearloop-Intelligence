const STORAGE_KEY = 'cat_mood_logs';
const API_KEY_STORAGE = 'cat_mood_api_key';

export function saveMoodLog(entry) {
  const logs = getMoodLogs();
  const newEntry = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    ...entry,
  };
  logs.unshift(newEntry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  return newEntry;
}

export function getMoodLogs() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function deleteMoodLog(id) {
  const logs = getMoodLogs().filter((l) => l.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

export function saveApiKey(key) {
  localStorage.setItem(API_KEY_STORAGE, key);
}

export function getApiKey() {
  return localStorage.getItem(API_KEY_STORAGE) || '';
}
