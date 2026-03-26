import { getApiKey } from './storage';

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent';

export async function generateCards(text, type) {
  const apiKey = getApiKey().trim() || import.meta.env.VITE_GEMINI_API_KEY || '';
  if (!apiKey) {
    throw new Error('No API key set. Please enter your Gemini API key in Settings.');
  }
  return generateWithAI(text, type, apiKey);
}

async function generateWithAI(text, type, apiKey) {
  const prompt = type === 'flashcards'
    ? `Generate exactly 10 flashcards from the following text. Each flashcard should have a clear, specific question and a concise answer based directly on the text content.

Return ONLY a valid JSON array with no extra text, markdown, or formatting:
[{"question": "...", "answer": "..."}]

Text:
${text}`
    : `Generate exactly 10 summary fact cards from the following text. Each card should contain a concise, interesting piece of information (1-2 sentences) drawn directly from the text.

Return ONLY a valid JSON array with no extra text, markdown, or formatting:
[{"fact": "..."}]

Text:
${text}`;

  const url = new URL(GEMINI_URL);
  url.searchParams.set('key', apiKey);

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7 },
    }),
  });

  if (!response.ok) {
    const errBody = await response.json().catch(() => ({}));
    const baseMessage = errBody?.error?.message || `API request failed (${response.status})`;

    if (response.status === 401 || response.status === 403) {
      throw new Error(`API key error: ${baseMessage}.\nCheck your Gemini API key in Settings, ensure it is enabled for Generative Language API, has no restrictive key restrictions, and billing is active.`);
    }

    throw new Error(baseMessage);
  }

  const data = await response.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!content) throw new Error('Empty response from API');

  const jsonMatch = content.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error('Could not parse cards from API response');

  const cards = JSON.parse(jsonMatch[0]);
  if (!Array.isArray(cards) || cards.length === 0) {
    throw new Error('Invalid card data received');
  }

  return cards.slice(0, 10);
}

function generateFallback(text, type) {
  const sentences = text
    .replace(/\n+/g, ' ')
    .replace(/([.!?])\s+/g, '$1|SPLIT|')
    .split('|SPLIT|')
    .map(s => s.trim())
    .filter(s => s.length > 15 && s.length < 300);

  if (sentences.length < 3) {
    throw new Error('Please provide more text to generate cards. A few paragraphs work best.');
  }

  const step = Math.max(1, Math.floor(sentences.length / 10));
  const selected = [];
  for (let i = 0; i < sentences.length && selected.length < 10; i += step) {
    selected.push(sentences[i]);
  }
  if (selected.length < 10) {
    for (const s of sentences) {
      if (selected.length >= 10) break;
      if (!selected.includes(s)) selected.push(s);
    }
  }

  if (type === 'flashcards') {
    return selected.map(sentence => {
      const words = sentence.split(/\s+/);
      if (words.length >= 6) {
        const start = Math.floor(words.length / 3);
        const end = Math.floor((2 * words.length) / 3);
        const idx = start + Math.floor(Math.random() * (end - start));
        const keyword = words[idx].replace(/[.,!?;:]/g, '');
        const blanked = words.map((w, i) => i === idx ? '______' : w).join(' ');
        return { question: blanked, answer: keyword };
      }
      return { question: `What does this describe? "${sentence.slice(0, 60)}..."`, answer: sentence };
    });
  }

  return selected.map(sentence => ({ fact: sentence }));
}
