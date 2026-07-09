// Serverless proxy for Groq. The API key lives only in Vercel environment
// variables (GROQ_API_KEY) and never reaches the browser.
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { snapshot } = req.body || {};
    if (!snapshot) return res.status(400).json({ error: 'Missing metrics snapshot' });

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        temperature: 0.4,
        max_tokens: 900,
        messages: [
          {
            role: 'system',
            content: [
              'You are a senior product analytics lead at a digital wealth management platform.',
              'You receive a JSON snapshot of live product metrics: engagement KPIs, an onboarding funnel by wealth segment, retention signals, and current market indicators.',
              'Respond in exactly two sections with these headings:',
              '## Insights',
              'Four short, numbered insights. Each must reference specific numbers from the snapshot, connect client behavior to market conditions where relevant, and read like commentary for senior leadership. No fluff.',
              '## Recommended Backlog',
              'Three numbered product backlog items, ordered by priority. Format each as: **Title** (Impact: High/Medium, Effort: S/M/L) followed by one sentence of rationale tied to the data.',
              'Plain markdown only. No preamble, no closing remarks.'
            ].join('\n')
          },
          {
            role: 'user',
            content: 'Current platform snapshot:\n' + JSON.stringify(snapshot, null, 2)
          }
        ]
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(502).json({ error: 'Model call failed', detail: data.error?.message || 'Unknown error' });
    }
    res.status(200).json({ text: data.choices?.[0]?.message?.content || '' });
  } catch (err) {
    res.status(500).json({ error: 'Insight generation failed', detail: err.message });
  }
}
