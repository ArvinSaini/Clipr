const express = require('express');
const cors = require('cors');
require('dotenv').config();
const urlRoute = require('./routes/url');
const {connectToMongoDB} = require("./connect");

const  URL = require("./models/url");


const app=express();
const PORT = process.env.PORT ;

// connection
connectToMongoDB(process.env.ATLAS_URL)
  .then(() => console.log(' MongoDB connected successfully!'))
  .catch((err) => console.error(' MongoDB connection failed:', err.message));


// middleware
app.use(express.json());
app.use(cors());
// helper to get client IP (prefer X-Forwarded-For if present), and normalize
function getClientIp(req) {
    // prefer X-Forwarded-For header (may contain a list)
    const xff = req.headers && (req.headers['x-forwarded-for'] || req.headers['X-Forwarded-For']);
    let ip = null;
    if (xff) {
        // left-most value is the original client
        ip = String(xff).split(',')[0].trim();
    } else if (req.ip) {
        ip = req.ip;
    } else if (req.connection && req.connection.remoteAddress) {
        ip = req.connection.remoteAddress;
    }

    if (!ip) return null;

    // Normalize IPv6 loopback and IPv4-mapped IPv6 addresses to plain IPv4
    if (ip === '::1') return '127.0.0.1';
    const m = ip.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
    if (m) return m[1];

    return ip;
}
 
// routes
app.use("/url",urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    // push the visit (timestamp + normalized ipv4) and return the updated document
    const clientIp = getClientIp(req);
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitedHistory: { timestamp: Date.now(), ip: clientIp } } },
        { new: true }
    );

    // If no document was found, respond 404 instead of crashing
    if (!entry) {
        return res.status(404).send('Short link not found');
    }

    return res.redirect(entry.redirectedURL);
});


app.listen(PORT,()=>{console.log(`Server Started at PORT:${PORT}`)});



