// we use nanoid to generate randomm id word
const { nanoid } = require("nanoid");
const URL = require('../models/url');

function normalizeUrl(input) {
    let u = String(input || '').trim();
    if (!u) return u;
    // add protocol if missing
    if (!/^https?:\/\//i.test(u)) u = 'http://' + u;
    // remove trailing slash (except for root)
    if (u.length > 1 && u.endsWith('/')) u = u.slice(0, -1);
    return u;
}

async function handleGenerateShortURL(req, res) {
    const body = req.body;   // we take original user from user
    if (!body.url) return res.status(400).json({ error: 'url is required' });

    const original = normalizeUrl(body.url);
    if (!original) return res.status(400).json({ error: 'Invalid URL' });

    // atomic upsert: if URL exists, return existing shortId; otherwise create new one
    const doc = await URL.findOneAndUpdate(
        { redirectedURL: original },
        { $setOnInsert: { shortId: nanoid(5), redirectedURL: original, visitedHistory: [] } },
        { upsert: true, new: true }
    );

    if (!doc) return res.status(500).json({ error: 'Failed to create short URL' });

    return res.json({ id: doc.shortId });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    if (!shortId) return res.status(400).json({ error: 'shortId is required' });

    const result = await URL.findOne({ shortId });
    if (!result) return res.status(404).json({ error: 'Short URL not found' });

    return res.json({
        totalClicks: result.visitedHistory.length,
        analytics: result.visitedHistory,
    });
};


module.exports = {
    handleGenerateShortURL,
    handleGetAnalytics,
};