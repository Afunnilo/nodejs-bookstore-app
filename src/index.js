const express = require('express');
const app = express();
const port =   4000;
const dbsetup = require("./database/setup");
const bookRoutes = require("./routes/bookroutes");
const dotenv = require('dotenv');
dotenv.config()
app.use(express.json())

// SET UP MONGOOSE

dbsetup()

app.use(bookRoutes)
app.listen(port, ()=>console.log(`app is listening on ${port}`))
