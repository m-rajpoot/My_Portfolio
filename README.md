# Mohit Kumar Singh — Portfolio

A futuristic dark-theme personal portfolio with blackboard aesthetic, premium animations, and editorial layout.

## 📁 Folder Structure

```
mohit-portfolio/
├── index.html          ← Main HTML entry point
├── css/
│   └── style.css       ← All styles (blackboard theme, animations, layout)
├── js/
│   └── main.js         ← All interactivity (scroll, nav, animations)
├── assets/             ← Place images, fonts, or other media here
│   └── (empty — add resume PDF here as resume.pdf)
├── .gitignore
└── README.md
```

## 🚀 Running Locally

1. Open the folder in **VS Code**
2. Install the **Live Server** extension (ritwickdey.liveserver)
3. Right-click `index.html` → **"Open with Live Server"**
4. Browser opens at `http://127.0.0.1:5500`

## 🌐 Deploying

### Option A — GitHub Pages (Free, Easiest)
```bash
# 1. Create a new GitHub repo named: mohit-portfolio (or yourusername.github.io)
git init
git add .
git commit -m "initial portfolio commit"
git branch -M main
git remote add origin https://github.com/m-rajpoot/mohit-portfolio.git
git push -u origin main

# 2. On GitHub: Settings → Pages → Source: Deploy from branch → main → / (root)
# 3. Site goes live at: https://m-rajpoot.github.io/mohit-portfolio/
```

### Option B — Netlify (Drag & Drop)
1. Go to https://netlify.com → Log in
2. Drag the entire `mohit-portfolio/` folder onto the deploy area
3. Done — you get a live URL instantly

### Option C — Vercel
```bash
npm install -g vercel
cd mohit-portfolio
vercel
# Follow prompts — site goes live at https://yourname.vercel.app
```

## ✏️ Customising

| What to change           | Where                                 |
|--------------------------|---------------------------------------|
| Name / bio text          | `index.html` — hero & about sections |
| Project details          | `index.html` — projects section       |
| Social links             | `index.html` — sidebar & footer       |
| Accent colour (cyan)     | `css/style.css` — `--cyan` variable   |
| Font choices             | `css/style.css` — `@import` + vars    |
| Resume PDF link          | `index.html` — "Download Resume" btn  |

## 🔗 Add Your Resume
Place your `resume.pdf` inside the `assets/` folder, then update the button in `index.html`:
```html
<a href="assets/resume.pdf" download class="btn btn-ghost">Download Resume</a>
```

## 🛠 Tech Used
- Pure HTML5 / CSS3 / Vanilla JS — zero dependencies
- Google Fonts: Bebas Neue, Outfit, JetBrains Mono, Caveat
- IntersectionObserver API for scroll animations
- CSS custom properties for theming
