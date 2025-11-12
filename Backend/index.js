const express = require('express');
const cors = require('cors');
require('dotenv').config();
const urlRoute = require('./routes/url');
const {connectToMongoDB} = require("./connect");

const  URL = require("./models/url");


const app=express();
const PORT = process.env.PORT ;

// connection
connectToMongoDB(process.env.atlas_URL)
.then(() => console.log('Mongodb connected!'));

// middleware
app.use(express.json());
app.use(cors());
 
// routes
app.use("/url",urlRoute);

app.get('/:shortId', async (req,res)=>{
    const shortId = req.params.shortId;
 const entry =   await URL.findOneAndUpdate({  // entry is original url
        shortId
    },{$push:{  // update
        visitedHistory : {
            timestamp: Date.now(),
        },
    },
})
res.redirect(entry.redirectedURL);
});


app.listen(PORT,()=>{console.log(`Server Started at PORT:${PORT}`)});



