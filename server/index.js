const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoute = require("./routes/user");
const queryRoute = require("./routes/query");

const app = express();
const http = require("http").createServer(app);

// Constants
const PORT = 5000;
const MONGO_URI =
  "mongodb+srv://muskangarg02270:ZSOfREdISW3MciU4@cluster0.sghszj7.mongodb.net/";

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRoute);
app.use("/api/queries", queryRoute);

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

// Listen to the connection event
http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
