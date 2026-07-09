# WealthLens

Product analytics command center for digital wealth platforms. WealthLens turns client behavior into product decisions — tracking how clients across wealth segments discover, onboard, engage, and retain, and connecting that behavior to live market conditions.

### It is live: https://wealthlens-xi.vercel.app

## What it does

A single command center across six views: platform engagement, onboarding journeys, consumer behavior, live market context, the analytics tracking plan, and an AI insight layer that reads the current state of the platform and returns leadership-ready recommendations.

## Features

**Live Platform Overview**
- Real-time client activity stream with wealth-segment tagging (Mass Affluent, High Net Worth, Ultra High Net Worth, Corporate Planning)
- Rolling 60-minute session chart and live KPI counters: active clients, sessions per hour, accounts funded, goal plans created
- Feature adoption and segment mix at a glance

<img width="1581" height="869" alt="image" src="https://github.com/user-attachments/assets/6385a596-1270-4f72-b78a-f0072f994290" />


**Onboarding Journeys**
- Six-stage funnel (Discover → Create Profile → Risk Assessment → Fund Account → First Investment → Set a Goal) filterable by wealth segment
- Stage-by-stage conversion comparison across all four segments
- Drop-off diagnosis table pairing each stall point with its leading behavioral signal

  <img width="1605" height="885" alt="image" src="https://github.com/user-attachments/assets/92dba087-64f1-4a64-9f1d-a10ed2b6bc88" />


**Consumer Behavior**
- Market volatility vs. client engagement overlay — engagement modeled against the real CBOE Volatility Index
- Weekly retention cohort heatmap
- Session depth by segment and documented behavioral patterns

  <img width="1544" height="839" alt="image" src="https://github.com/user-attachments/assets/ca4699d6-e5e0-4683-aca9-042788af042c" />


**Market Pulse**
- VIX, S&P 500, 10-Year Treasury, and Fed Funds Rate pulled live from FRED (Federal Reserve)
- Live USD reference rates from the ECB via Frankfurter
- A streaming ticker that interleaves live market prints with platform activity

  <img width="1610" height="907" alt="image" src="https://github.com/user-attachments/assets/3ada4e1f-a868-4195-bed0-9cb2c4091818" />


**Tracking Plan & Data Governance**
- Full analytics specification: 14 production events with trigger definitions, key properties, ownership, PII classification, and governance status

  <img width="1632" height="850" alt="image" src="https://github.com/user-attachments/assets/6f5ac80c-34c6-4f71-ab61-b7486b2e7e26" />


**AI Product Insights**
- One click sends the live metrics snapshot — engagement, funnel, retention, market — to an LLM analyst
- Returns numbered insights referencing the actual data plus a prioritized product backlog with impact and effort ratings

  <img width="1589" height="829" alt="image" src="https://github.com/user-attachments/assets/9c09df10-6bcf-4e60-83ab-c6f402ec575a" />


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

- Vanilla HTML/CSS/JS frontend
- Chart.js for visualization
- Deployed on Vercel
