// backend/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json()); // Parse JSON bodies

// Routes
const reviewsRoutes = require("./routes/reviews");
app.use("/api/reviews", reviewsRoutes);


// Root route (optional)
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});


