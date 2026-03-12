# Cat Mood Tracker

A mobile-first web app that uses Claude Vision AI to analyze your cat's mood from photos.

## Features

- **Photo Analysis** — Upload or take a photo; Claude reads body language (ears, tail, eyes, posture) to detect mood
- **8 Moods** — Happy, Content, Curious, Anxious, Scared, Playful, Sleepy, Grumpy
- **Mood Log** — History of all entries with signals and owner tips
- **Trends** — Pie chart, 7-day activity bar chart, and emoji timeline

## Getting Started

```bash
npm install
npm run dev
```

On first launch, enter your [Anthropic API key](https://console.anthropic.com/settings/keys). It is stored locally in your browser and never sent anywhere except to Anthropic's API.

## Tech Stack

- React + Vite
- Tailwind CSS (mobile-first, max-w-md)
- Claude claude-opus-4-6 Vision API (`@anthropic-ai/sdk`)
- Recharts for trend visualizations
- localStorage for offline-capable mood log
