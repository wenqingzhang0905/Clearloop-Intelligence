import Anthropic from '@anthropic-ai/sdk';

const MOOD_PROMPT = `You are an expert in feline body language and behavior. Analyze this cat photo and determine the cat's current mood.

Look for these signals:
- Ear position (forward = curious/happy, flat/back = scared/aggressive)
- Tail position (up = happy, puffed = scared, low = anxious)
- Eye shape (slow blink = relaxed, wide/dilated = excited/scared, narrowed = content)
- Body posture (relaxed/sprawled = content, crouched = anxious, arched = scared/aggressive)
- Whisker position (forward = curious, flat = scared)
- Overall body tension (loose = relaxed, stiff = stressed)

Respond ONLY with a JSON object in this exact format:
{
  "mood": "one of: Happy, Content, Curious, Anxious, Scared, Playful, Sleepy, Grumpy",
  "confidence": "High, Medium, or Low",
  "emoji": "a single emoji representing the mood",
  "signals": ["list", "of", "2-4", "observed", "signals"],
  "tip": "one short, friendly tip for the owner based on this mood"
}`;

export async function analyzeCatMood(imageBase64, apiKey) {
  const client = new Anthropic({
    apiKey,
    dangerouslyAllowBrowser: true,
  });

  const response = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 512,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: 'image/jpeg',
              data: imageBase64,
            },
          },
          {
            type: 'text',
            text: MOOD_PROMPT,
          },
        ],
      },
    ],
  });

  const text = response.content[0].text;
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Could not parse mood response');
  return JSON.parse(jsonMatch[0]);
}
