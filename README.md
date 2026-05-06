# ✂️ Clipr — URL Shortener

> Shorten. Share. Done.

Clipr is a fast URL shortener with real-time click analytics, duplicate detection, and a beautiful animated cloud UI.

![Made with Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-brightgreen?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?style=flat-square&logo=mongodb)
![Frontend](https://img.shields.io/badge/Frontend-HTML%20%2F%20CSS%20%2F%20JS-blue?style=flat-square&logo=javascript)
![Deployed on Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=flat-square&logo=render)

---

## 🚀 Features

- 🔗 **Shorten any URL** — instantly generates a short link
- 📊 **Click Analytics** — tracks total clicks per short URL
- ♻️ **Duplicate Detection** — returns existing short link for already-shortened URLs
- 🎨 **Animated Cloud UI** — powered by Vanta.js + Three.js
- 📱 **Fully Responsive** — works on all screen sizes

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | HTML, CSS, JavaScript, Vanta.js |
| Backend | Node.js, Express |
| Database | MongoDB Atlas + Mongoose |
| Hosting | Render (Backend), MongoDB Atlas (DB) |

---

## 📁 Project Structure

```
Clipr/
├── Backend/
│   ├── controllers/
│   │   └── url.js         # URL generation & analytics logic
│   ├── models/
│   │   └── url.js         # Mongoose schema
│   ├── routes/
│   │   └── url.js         # API routes
│   ├── connect.js         # MongoDB connection
│   ├── index.js           # Express app entry point
│   └── package.json
├── frontend/
│   ├── index.html         # Main UI
│   ├── styles.css         # Styling
│   └── script.js          # Frontend logic
├── .gitignore
└── README.md
```

---

## ⚙️ Local Development

### Backend

```bash
cd Backend
npm install
npm run dev       # uses nodemon for hot reload
# or
npm start         # production mode
```

### Frontend

Open `frontend/index.html` directly in your browser, or serve it locally:

```bash
cd frontend
python -m http.server 5500
# Visit: http://localhost:5500
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `Backend/` folder:

```env
PORT=8001
ATLAS_URL=your_mongodb_connection_string
NODE_ENV=development
```

> ⚠️ Never commit your `.env` file. It's already covered by `.gitignore`.

---

## 🌐 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/url` | Create a short URL |
| `GET` | `/:shortId` | Redirect to original URL |
| `GET` | `/url/analytics/:shortId` | Get click analytics |

### POST `/url`
```json
// Request
{ "url": "https://example.com/very/long/url" }

// Response
{ "id": "abc12345" }
```

---

## ☁️ Deployment

| Service | Platform |
|---------|----------|
| Backend | [Render](https://render.com) |
| Database | [MongoDB Atlas](https://www.mongodb.com/atlas) |

---

## 👤 Made by

**Arvin Saini** — [arvinsaini.tech](https://arvinsaini.tech)
