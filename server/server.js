const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2564", // Replace with your MySQL password
    database: "employee_management",
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

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
