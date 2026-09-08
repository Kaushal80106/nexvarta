import OpenAI from 'openai';

interface RawArticle {
  title: string;
  content: string;
  source: string;
}

export async function synthesizeStoryFromArticles(articles: RawArticle[]) {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error('Missing OPENROUTER_API_KEY');
  }

  // OpenRouter provides an OpenAI-compatible API!
  const openrouter = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: 'https://openrouter.ai/api/v1',
  });

  const prompt = `
You are an expert intelligence analyst for NexVarta.
You are given a cluster of news articles from various sources covering the same event.
Your job is to synthesize these articles into a single, comprehensive, and unbiased intelligence report.

Return the result strictly as a JSON object matching this schema:
{
  "category": "Technology" | "Finance" | "Politics" | "Business" | "Science" | "World" | "Sports" | "Entertainment" | "India" | "Local",
  "headline": "A concise, impactful headline",
  "subheadline": "A slightly longer explanatory subheadline",
  "aiSummary": {
    "short": "A 1-sentence summary",
    "detailed": "A 2-3 paragraph detailed summary of the event",
    "keyFacts": ["fact 1", "fact 2", "fact 3"]
  },
  "verification": {
    "status": "Well corroborated" | "Partially corroborated" | "Conflicting reports" | "Unverified",
    "confidence": 85,
    "consensus": ["point all sources agree on"],
    "differences": ["points where sources disagree"],
    "unclear": ["details that are still unknown or speculative"]
  },
  "impact": {
    "potentialLevel": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
    "direction": "Positive" | "Negative" | "Neutral" | "Mixed",
    "confidence": 75,
    "timeHorizon": "Immediate" | "Short-term" | "Long-term",
    "whyItMatters": "A 1-paragraph explanation of why this is important",
    "domains": [
      {
        "name": "Economy",
        "level": "HIGH",
        "description": "How it affects the economy"
      }
    ]
  }
}

ARTICLES TO SYNTHESIZE:
${JSON.stringify(articles, null, 2)}
`;

  try {
    const response = await openrouter.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You output only valid JSON matching the requested schema.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.2,
    });

    const resultText = response.choices[0].message.content;
    if (!resultText) throw new Error("No response from OpenRouter");

    return JSON.parse(resultText);
  } catch (error) {
    console.error('Error in AI synthesis:', error);
    throw error;
  }
}
