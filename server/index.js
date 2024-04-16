require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors"); // For handling cross-origin requests

const adminsRouter = require("./routes/admins");
const employeesRouter = require("./routes/employees");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse incoming JSON data
app.use(cookieParser());
app.use(cors()); // Enable CORS

// API routes
app.use("/api/admins", adminsRouter);
app.use("/api/employees", employeesRouter);

// Connect to MongoDB database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected...");
    app.listen(port, () => console.log(`Server listening on port ${port}...`));
  })
  .catch((err) => console.error(err));
