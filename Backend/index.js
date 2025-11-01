const express = require("express");
const connectDB = require("./config/dbconnect.config.js");
const healthRoute = require("./routes/health.route.js");
const authRoute = require("./routes/auth.route.js")
require("dotenv").config()

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("", healthRoute)
app.use("/api/v1/auth",authRoute)

app.listen(process.env.PORT,()=>{
    console.log(`Server running on ${process.env.PORT}`)
    connectDB();
})