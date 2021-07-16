const express = require('express');
const app = express();
const dotenv = require('dotenv');
const port = process.env.PORT ||  4000;
const dbsetup = require("./database/setup");


// REQUIRE ROUTES
const bookRoutes = require("./routes/bookroutes");
const authRoutes = require('./routes/authRoutes');

// SEEDERS
const {seedAdmin} = require('./seeders/admin')

app.use(express.json())


dbsetup() // set

app.use('/auth', authRoutes)
app.use(bookRoutes)
app.listen(port, ()=>console.log(`app is listening on ${port}`))
