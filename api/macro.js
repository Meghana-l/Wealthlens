// Live market data proxy. Pulls real series from FRED (Federal Reserve
// Economic Data). The FRED_API_KEY lives only in Vercel environment variables.
// Returns the last ~60 observations per series so the frontend can chart trends.
const SERIES = {
  vix: 'VIXCLS',       // CBOE Volatility Index
  sp500: 'SP500',      // S&P 500
  treasury10y: 'DGS10',// 10-Year Treasury Constant Maturity
  fedfunds: 'FEDFUNDS' // Effective Federal Funds Rate
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');

  const key = process.env.FRED_API_KEY;
  if (!key) return res.status(200).json({ live: false, series: {} });

  try {
    const out = {};
    await Promise.all(Object.entries(SERIES).map(async ([name, id]) => {
      const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${id}&api_key=${key}&file_type=json&sort_order=desc&limit=60`;
      const r = await fetch(url);
      if (!r.ok) { out[name] = []; return; }
      const j = await r.json();
      out[name] = (j.observations || [])
        .filter(o => o.value !== '.')
        .map(o => ({ date: o.date, value: parseFloat(o.value) }))
        .reverse();
    }));
    res.status(200).json({ live: true, series: out });
  } catch (err) {
    res.status(200).json({ live: false, series: {}, detail: err.message });
  }
}
