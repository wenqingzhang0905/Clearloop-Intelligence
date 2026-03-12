import { getMoodLogs } from '../utils/storage';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from 'recharts';

const MOOD_EMOJIS = {
  Happy: '😄',
  Content: '😌',
  Curious: '🧐',
  Anxious: '😟',
  Scared: '😨',
  Playful: '😸',
  Sleepy: '😴',
  Grumpy: '😾',
};

const MOOD_CHART_COLORS = {
  Happy: '#fbbf24',
  Content: '#34d399',
  Curious: '#60a5fa',
  Anxious: '#a78bfa',
  Scared: '#f87171',
  Playful: '#fb923c',
  Sleepy: '#818cf8',
  Grumpy: '#9ca3af',
};

function getLast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }
  return days;
}

export default function MoodTrends() {
  const logs = getMoodLogs();

  if (logs.length === 0) {
    return (
      <div className="p-4 text-center py-16">
        <div className="text-5xl mb-4">📊</div>
        <p className="text-gray-600 font-medium">No data yet</p>
        <p className="text-gray-400 text-sm mt-1">Log at least one mood to see trends</p>
      </div>
    );
  }

  // Mood frequency breakdown
  const moodCounts = logs.reduce((acc, log) => {
    acc[log.mood] = (acc[log.mood] || 0) + 1;
    return acc;
  }, {});
  const pieData = Object.entries(moodCounts).map(([mood, count]) => ({
    name: `${MOOD_EMOJIS[mood] || ''} ${mood}`,
    value: count,
    mood,
  }));

  // Last 7 days activity
  const days = getLast7Days();
  const barData = days.map((day) => {
    const dayLogs = logs.filter((log) => {
      const d = new Date(log.timestamp);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) === day;
    });
    return { day: day.split(' ')[1], count: dayLogs.length };
  });

  // Most frequent mood
  const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="p-4 space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center">
          <p className="text-3xl font-bold text-orange-400">{logs.length}</p>
          <p className="text-xs text-gray-500 mt-1">Total Logs</p>
        </div>
        {topMood && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center">
            <p className="text-3xl">{MOOD_EMOJIS[topMood[0]] || '🐱'}</p>
            <p className="text-xs text-gray-500 mt-1">Most Common: {topMood[0]}</p>
          </div>
        )}
      </div>

      {/* Mood distribution pie */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <h3 className="font-semibold text-gray-700 text-sm mb-4">Mood Distribution</h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={MOOD_CHART_COLORS[entry.mood] || '#e5e7eb'} />
              ))}
            </Pie>
            <Legend
              formatter={(value) => <span className="text-xs text-gray-600">{value}</span>}
            />
            <Tooltip formatter={(value) => [`${value} logs`, '']} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 7-day activity bar chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <h3 className="font-semibold text-gray-700 text-sm mb-4">Last 7 Days Activity</h3>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={barData} barSize={20}>
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip
              formatter={(value) => [`${value} logs`, 'Entries']}
              contentStyle={{ borderRadius: '12px', border: '1px solid #f3f4f6', fontSize: 12 }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {barData.map((_, index) => (
                <Cell key={index} fill="#fb923c" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent mood timeline */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <h3 className="font-semibold text-gray-700 text-sm mb-3">Recent Mood Timeline</h3>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {logs.slice(0, 10).reverse().map((log) => (
            <div key={log.id} className="flex flex-col items-center flex-shrink-0">
              <span className="text-2xl">{log.emoji}</span>
              <span className="text-xs text-gray-400 mt-1">
                {new Date(log.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
