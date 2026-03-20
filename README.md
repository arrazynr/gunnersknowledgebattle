# ⚽ Arsenal FC Quiz Championship — 8-Bit Edition

> The ultimate Gooner trivia game with pixel art, procedural 8-bit audio, and retro arcade vibes.

![Arsenal Red](https://img.shields.io/badge/Arsenal-FF0000?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRUYwMTA3Ii8+PC9zdmc+&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 🚀 Deploy to Vercel (Recommended — Free)

### Option A: GitHub + Vercel (Best for sharing)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "⚽ Arsenal Quiz Championship - Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/arsenal-quiz.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com) → Sign up free with GitHub
   - Click **"New Project"** → Import your `arsenal-quiz` repo
   - Framework: **Vite** (auto-detected)
   - Click **"Deploy"** ✅

3. **Done!** Your URL will be: `https://arsenal-quiz.vercel.app`

4. **Custom domain (optional):**
   - In Vercel dashboard → Settings → Domains
   - Add `arsenal-quiz.com` or similar (buy from Namecheap ~$10/yr)

### Option B: Vercel CLI (Fastest)

```bash
npm install -g vercel
cd arsenal-quiz
npm install
vercel
# Follow prompts — deployed in 60 seconds!
```

### Option C: Netlify (Alternative Free Host)

```bash
npm run build
# Drag & drop the `dist/` folder to netlify.com/drop
```

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Start dev server (hot reload)
npm run dev
# → Open http://localhost:5173

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
arsenal-quiz/
├── index.html              # Entry HTML with meta tags & favicon
├── vercel.json             # Vercel deployment config
├── vite.config.js          # Vite build config
├── tailwind.config.js      # Tailwind CSS config
├── postcss.config.js       # PostCSS config
├── package.json            # Dependencies
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # Main app + all 4 screens
    ├── audio.js            # 🎵 Web Audio Engine + useAudio hook
    ├── questions.js        # 📝 20 quiz questions + Easter eggs
    ├── sprites.jsx         # 🎨 Pixel art SVG sprites
    ├── components.jsx      # 🧩 Shared UI components
    ├── StadiumBackground.jsx # 🏟 Pixel Emirates Stadium
    └── index.css           # Tailwind + pixel art global styles
```

---

## 🎮 Features

| Feature | Details |
|---|---|
| 🎨 **Pixel Art UI** | Hand-crafted SVG sprites, pixel fonts, retro arcade aesthetic |
| 🎵 **Procedural Audio** | Web Audio API — zero external files needed! |
| 🔊 **8 Sound Effects** | Blip, bloop, whistle, correct, wrong, VAR, alarm, full time |
| 🏟 **Stadium Background** | Animated pixel Emirates Stadium with crowd |
| 📺 **VAR Lifeline** | Eliminates 2 wrong answers per game |
| 🔥 **Streak Bonus** | Extra points for consecutive correct answers |
| ⚠️ **Easter Egg** | Type a traitor's name in setup... |
| 📊 **Radar Chart** | Recharts-powered Arsenal IQ analysis |
| 📤 **Share Score** | Native Web Share API for WhatsApp/Twitter |
| 📱 **Mobile-First** | Optimized for phones (480px max-width) |

---

## 🎵 Audio Engine

All sounds are **procedurally generated** using the Web Audio API:
- No external audio files needed
- Zero loading time
- Works on all modern browsers
- Respects browser autoplay policy (activates on first click)

---

## 🏆 Sharing with Other Gunners

After deploying to Vercel:

1. **WhatsApp** — Share your Vercel URL directly
2. **Twitter/X** — The og:image meta tag creates a rich preview
3. **Score sharing** — Use the 📤 SHARE button after finishing (opens native share sheet on mobile)

---

## ⚽ COYG!

*Come On You Gunners!*
