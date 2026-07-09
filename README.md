# WealthLens

Product analytics command center for digital wealth platforms. WealthLens turns client behavior into product decisions — tracking how clients across wealth segments discover, onboard, engage, and retain, and connecting that behavior to live market conditions.

## What it does

A single command center across six views: platform engagement, onboarding journeys, consumer behavior, live market context, the analytics tracking plan, and an AI insight layer that reads the current state of the platform and returns leadership-ready recommendations.

## Features

**Live Platform Overview**
- Real-time client activity stream with wealth-segment tagging (Mass Affluent, High Net Worth, Ultra High Net Worth, Corporate Planning)
- Rolling 60-minute session chart and live KPI counters: active clients, sessions per hour, accounts funded, goal plans created
- Feature adoption and segment mix at a glance

**Onboarding Journeys**
- Six-stage funnel (Discover → Create Profile → Risk Assessment → Fund Account → First Investment → Set a Goal) filterable by wealth segment
- Stage-by-stage conversion comparison across all four segments
- Drop-off diagnosis table pairing each stall point with its leading behavioral signal

**Consumer Behavior**
- Market volatility vs. client engagement overlay — engagement modeled against the real CBOE Volatility Index
- Weekly retention cohort heatmap
- Session depth by segment and documented behavioral patterns

**Market Pulse**
- VIX, S&P 500, 10-Year Treasury, and Fed Funds Rate pulled live from FRED (Federal Reserve)
- Live USD reference rates from the ECB via Frankfurter
- A streaming ticker that interleaves live market prints with platform activity

**Tracking Plan & Data Governance**
- Full analytics specification: 14 production events with trigger definitions, key properties, ownership, PII classification, and governance status

**AI Product Insights**
- One click sends the live metrics snapshot — engagement, funnel, retention, market — to an LLM analyst
- Returns numbered insights referencing the actual data plus a prioritized product backlog with impact and effort ratings

## Data Sources

| Layer | Source | Type |
|---|---|---|
| Volatility Index | FRED · VIXCLS | Live API |
| S&P 500 | FRED · SP500 | Live API |
| 10-Year Treasury | FRED · DGS10 | Live API |
| Fed Funds Rate | FRED · FEDFUNDS | Live API |
| FX Reference Rates | Frankfurter (ECB) | Live API |
| Client activity | Behavioral engine calibrated to live volatility | Modeled |
| AI insights | Groq · llama-3.1-8b-instant | Live API (server-side) |

## Stack

- Vanilla HTML/CSS/JS frontend, no build step
- Chart.js for visualization
- Serverless functions proxy all keyed API calls — no key ever reaches the browser
- Deployed on Vercel
