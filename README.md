# URL Shortener

A full-stack URL shortener application with analytics.

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** MongoDB

## Features
- Shorten long URLs
- Analytics (click tracking)
- Duplicate URL detection (returns existing short link)
- Clean, modern UI

## Local Development

### Backend
```bash
cd Backend
npm install
npm start
```

### Frontend
Open `frontend/index.html` in your browser or serve with:
```bash
cd frontend
python -m http.server 5500
```

## Environment Variables (Backend)
- `PORT` - Server port (default: 8001)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment (development/production)

## Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Made by
[Arvin Saini](https://arvinsaini.tech)
