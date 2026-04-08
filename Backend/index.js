const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbconnect.config.js");
const healthRoute = require("./routes/health.route.js");
const authRoute = require("./routes/auth.route.js");
const dashboardRoute = require("./routes/dashboard.route.js");
require("dotenv").config();

const app = express();

// CORS - allow React dev server
app.use(
	cors({
		origin: ["http://localhost:5173", "http://localhost:3000"],
		credentials: true,
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("", healthRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/dashboard", dashboardRoute);

app.listen(process.env.PORT, () => {
	console.log(`Server running on ${process.env.PORT}`);
	connectDB();
});