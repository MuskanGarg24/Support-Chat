const express = require("express");
const cors = require("cors");

const app = express();
const http = require("http").createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Listen to the connection event
http.listen(5000, () => {
  console.log("Server is running on port 5000");
});
