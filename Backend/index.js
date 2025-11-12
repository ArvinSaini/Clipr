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
 
// routes
app.use("/url",urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    // push the visit (timestamp + ip) and return the updated document
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitedHistory: { timestamp: Date.now(), ip: req.ip } } },
        { new: true }
    );

    // If no document was found, respond 404 instead of crashing
    if (!entry) {
        return res.status(404).send('Short link not found');
    }

    return res.redirect(entry.redirectedURL);
});


app.listen(PORT,()=>{console.log(`Server Started at PORT:${PORT}`)});



