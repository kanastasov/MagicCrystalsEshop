const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS for frontend access
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",  // Change if your MySQL username is different
    password: "ROOT",  // Change if you have a MySQL password
    database: "magiccrystals",  // Replace with your actual database name
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to MySQL database.");
});

// API Endpoint to Fetch All Products
app.get("/api/products", (req, res) => {
    const sqlQuery = "SELECT * FROM products";
    db.query(sqlQuery, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database query failed" });
        }
    //  console.log(res)

        res.json(results);
    });

//   
    // return "Hi";
});

// Start the Server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});