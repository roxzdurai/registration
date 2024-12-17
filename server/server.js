const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: [
    "https://registration-doc.vercel.app", // Live frontend
    "http://localhost:3000",              // Local development frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods
  allowedHeaders: ["Content-Type", "Authorization"], // Add headers you expect
  credentials: true, // Include credentials if needed
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to MySQL database.");
  }
});

// API routes
app.post("/api/employees", (req, res) => {
  const { employee_id, name, email, phone, department, date_of_joining, role } = req.body;

  const query = `INSERT INTO employees (employee_id, name, email, phone, department, date_of_joining, role)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [employee_id, name, email, phone, department, date_of_joining, role], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        res.status(400).send("Employee ID or Email already exists.");
      } else {
        res.status(500).send("Database error.");
      }
    } else {
      res.status(200).send("Employee added successfully!");
    }
  });
});

// Handle preflight requests
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
