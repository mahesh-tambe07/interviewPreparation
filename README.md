# 🎯 Complete Interview Prep — Question Bank

A beautifully designed, fully interactive interview preparation app covering all 6 major interview rounds with priority-ranked questions, detailed answers, and DSA topic-wise problem lists.

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)
![Questions](https://img.shields.io/badge/Questions-60+-orange?style=flat)
![DSA Problems](https://img.shields.io/badge/DSA%20Problems-80+-red?style=flat)

---

## 📸 Preview

> Dark-themed · Priority-ranked · Click to reveal answers · DSA patterns included

---

## 📦 What's Inside

| Round | Topics Covered | Questions |
|-------|---------------|-----------|
| 👤 HR | Self intro, salary negotiation, situational, why this company | 9 |
| 💻 Technical | OOP/SOLID, Data Structures, OS/Memory, Databases, Networking & APIs | 22 |
| 🏗️ System Design | URL shortener, Chat app, Rate limiter, Twitter feed, Notifications, CAP theorem | 10 |
| 🧩 DSA | 11 topics, 80+ must-solve problems, patterns, difficulty tags | 80+ |
| ⭐ Behavioural | STAR stories, leadership, conflict resolution, mentoring | 7 |
| 🐹 Go Specific | GMP scheduler, GC internals, escape analysis, concurrency, project structure | 12 |

---

## 🧩 DSA Topics — Priority Ranked

| Priority | Topics |
|----------|--------|
| 🔴 MUST | Arrays & Strings, HashMap & HashSet, Linked List, Stack & Queue, Trees, Binary Search |
| 🟡 HIGH | Graphs, Dynamic Programming, Heap / Priority Queue, Backtracking |
| 🟢 MED | Tries (for senior / FAANG rounds) |

Each DSA topic includes:
- Key patterns to learn (Two Pointers, Sliding Window, Mono Stack, etc.)
- Must-solve problems with difficulty tags (Easy / Medium / Hard)
- Approach notes for each problem

---

## 🚀 Getting Started

### Option 1 — Vite (recommended)

```bash
npm create vite@latest interview-prep -- --template react
cd interview-prep
npm install
```

Replace `src/App.jsx` with `interview_prep_complete.jsx`, update `src/main.jsx`:

```jsx
import App from './interview_prep_complete'
```

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

### Option 2 — Create React App

```bash
npx create-react-app interview-prep
cd interview-prep
```

Replace `src/App.js` with `interview_prep_complete.jsx`, then:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🎨 No Extra Dependencies Needed

The app uses only:
- **React 18** — state management
- **Google Fonts** (Syne + DM Mono) — loaded via CDN in the component
- **No UI library** — pure CSS with custom variables

No `npm install` for any UI packages required.

---

## 🧭 How to Use the App

- **Round tabs** at the top — switch between HR, Technical, System Design, DSA, Behavioural, Go
- **Click any question card** — expands full answer + 💡 pro interview tip
- **Priority badges** on every question:
  - 🔴 MUST — prepare before any interview
  - 🟡 HIGH — important for product company roles
  - 🟢 MED — senior or FAANG-level rounds
- **DSA tab** — click any topic to expand key patterns + problems list
- **Progress bar** shows which round you're on

---

## 📚 Study Strategy

### For Service-based companies (TCS, Infosys, Wipro, Cognizant)
1. Complete all **HR** questions first
2. Do **Technical** — OOP, SOLID, Databases (ACID, indexing)
3. DSA 🔴 MUST topics only

### For Product companies (Razorpay, Zepto, Meesho, Groww, etc.)
1. **Technical** — all sections thoroughly
2. **DSA** — 🔴 MUST + 🟡 HIGH topics
3. **System Design** — all questions
4. **Behavioural** — prepare 5 STAR stories

### For FAANG / Top-tier (Google, Amazon, Flipkart, etc.)
1. Everything above **+**
2. DSA — all 11 topics including 🟢 MED
3. **Go Specific** if applying for Go roles
4. System Design — go deep on tradeoffs

---

## 📁 Project Structure

```
interview-prep/
├── src/
│   ├── interview_prep_complete.jsx   # Entire app (single file)
│   └── main.jsx                      # Entry point
├── public/
├── package.json
└── README.md
```

---

## 🤝 Contributing

Want to add more questions, fix answers, or add a new round?

1. Fork the repo
2. Add questions to the relevant data array inside the `.jsx` file
3. Open a pull request

Ideas for contributions:
- Java / Python / Node.js specific round
- SQL query practice section
- Company-specific question sets (Amazon LP, Google SWE)

---

## 📄 License

MIT — free to use, share, and modify.

---

> If this helped you crack an interview, drop a ⭐ on the repo — it helps others find it too!
