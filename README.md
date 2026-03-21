<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,14,20&height=200&section=header&text=Rakshak&fontSize=70&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=AI-Powered%20Farming%20Intelligence%20%7C%20Gemini%20AI%20%2B%20Earth%20Engine&descAlignY=58&descSize=16"/>

<br/>

![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Earth Engine](https://img.shields.io/badge/Google_Earth_Engine-34A853?style=for-the-badge&logo=google&logoColor=white)
![n8n](https://img.shields.io/badge/n8n-EF6C00?style=for-the-badge&logo=n8n&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on_Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

<br/>

> **AI-powered farming assistant that gives every farmer the intelligence of an agronomist — in their pocket.**
> Built for a national competition. Deployed live.

<br/>

[![Live Demo](https://img.shields.io/badge/🌾_Live_Demo-Visit_Rakshak-34A853?style=for-the-badge)](https://rakshak-app-eosin.vercel.app/dashboard)

</div>

---

## 💡 The Problem

Indian farmers face three critical challenges every season:

- 🦠 **Crop diseases** — identified too late, after damage is done
- 🌦️ **Unpredictable weather** — no early warning system for smallholders
- 📉 **Market blindness** — selling at wrong time due to no price visibility

Most solutions require expensive hardware, internet expertise, or agronomist access that rural farmers simply don't have.

**Rakshak bridges that gap with AI.**

---

## ✨ Features

```
📸 Crop Disease Detection    →  Upload a crop photo → AI identifies disease + treatment plan
🌦️ Weather-Based Alerts      →  Real-time weather monitoring + actionable farm advisories  
🛰️ Satellite Field Monitor   →  Google Earth Engine integration → live field health view
💰 Market Price Tracker      →  Current mandi prices → know the best time to sell
🌱 Soil Health Analysis      →  Soil condition insights + crop-specific recommendations
🤖 AI Advisory Chatbot       →  Ask farming questions in natural language, get expert answers
```

---

## 🎬 How It Works

### 📸 Crop Disease Pipeline

```
Farmer uploads crop photo
        ↓
Gemini Pro Vision analyses the image
        ↓
AI identifies:  disease name
                severity level
                affected area estimate
                treatment recommendations
                preventive measures
        ↓
Advisory displayed + logged
```

### 🛰️ Satellite Monitoring Pipeline

```
Farmer enters field location
        ↓
Google Earth Engine fetches satellite imagery
        ↓
Field health indices calculated (NDVI, soil moisture)
        ↓
Visual field map + health summary displayed
        ↓
Alerts triggered if anomalies detected
```

### 💰 Market Price Pipeline

```
Farmer selects crop type + region
        ↓
Live mandi price data fetched
        ↓
Price trends + best selling window shown
        ↓
AI advisory: sell now or wait?
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **AI Model** | Google Gemini AI (crop analysis + advisory) |
| **Satellite Data** | Google Earth Engine (field monitoring) |
| **Backend / Auth** | Firebase (Firestore + Authentication) |
| **Automation** | n8n (workflow orchestration + alerts) |
| **Deployment** | Vercel |

---

## 🚀 Live Demo

> 🌾 **[rakshak-app-eosin.vercel.app/dashboard](https://rakshak-app-eosin.vercel.app/dashboard)**

Try it live — no installation needed.

---

## 📦 Run Locally

### Prerequisites
- Node.js 18+
- Firebase project + credentials
- Google Gemini API key
- Google Earth Engine access

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/Hemkumar247/Rakshak-App.git
cd Rakshak-App

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Fill in your Firebase config, Gemini API key, Earth Engine credentials

# 4. Start the dev server
npm run dev
```

---

## 🎯 Built For

This project was developed and submitted for a **national-level competition**, targeting real agricultural challenges faced by Indian farmers — particularly smallholders in Tamil Nadu and other rural regions.

The focus was on:
- **Accessibility** — usable by farmers with minimal tech literacy
- **Real impact** — features grounded in actual farming pain points
- **End-to-end delivery** — from AI model to live deployed product

---

## 🔮 Roadmap

- [ ] Vernacular language support (Tamil, Hindi, Telugu)
- [ ] Offline mode for low-connectivity rural areas
- [ ] WhatsApp bot integration via n8n
- [ ] Community forum for farmer-to-farmer knowledge sharing
- [ ] Government scheme eligibility checker
- [ ] Yield prediction based on historical + satellite data

---

## 🤝 Contributing

Issues and pull requests are welcome.
Open an [issue](https://github.com/Hemkumar247/Rakshak-App/issues) to report bugs or suggest features.

---

## 🧑‍💻 Built by

**Hem Kumar** — AI + Full-Stack Developer, Chennai 🇮🇳

Building AI products that solve real problems for real people.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-hemkumarvitta-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hemkumarvitta)
[![GitHub](https://img.shields.io/badge/GitHub-Hemkumar247-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Hemkumar247)
[![Gmail](https://img.shields.io/badge/Email-hemkumarvitta%40gmail.com-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:hemkumarvitta@gmail.com)

---

<div align="center">

⭐ **If Rakshak inspired you, leave a star — it helps more farmers get access to better tools.**

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,14,20&height=100&section=footer"/>

</div>
