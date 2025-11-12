# Frontend for URL Shortener

This is a minimal static frontend that works with the backend in `Backend/`.

What it does
- Presents a form to enter a full URL
- Calls the backend POST /url (http://localhost:8001/url) with { url }
- Displays the shortened link (http://localhost:8001/{id}) and provides Copy/Open buttons

Files
- `index.html` — main page
- `styles.css` — small styles
- `script.js` — frontend logic

Quick start
1. Make sure the backend is running on port 8001 (run the Node server in `Backend/`).
2. Open `frontend/index.html` in your browser (double-click or use your editor's Open in Browser).

Notes about CORS
If you get CORS errors when the frontend (file:// or served from another origin) tries to call `http://localhost:8001/url`, enable CORS on the backend. One quick way in the backend project:

1. Install cors: `npm install cors`
2. In `Backend/index.js` add near your middleware section:

```js
const cors = require('cors');
app.use(cors());
```

This will allow the frontend to call the backend during development.

Problems or improvements
- Add form validation and a loading spinner
- Improve UX, add custom alias option, or show analytics
