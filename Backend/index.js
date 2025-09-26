const express = require("express");
const connectDB = require("./config/dbconnect.config.js");
const healthRoute = require("./routes/health.route.js");
require("dotenv").config()

const app = express()

app.use(express.urlencoded());
app.use(express.json());

app.use("", healthRoute)

app.listen(process.env.PORT,()=>{
    console.log(`Server running on ${process.env.PORT}`)
    connectDB();
})