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
        res.json(results);
    });
});

// API Endpoint to Fetch a Single Product by ID
app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id; // Get the ID from the URL

    const sqlQuery = "SELECT * FROM product_photos WHERE id = ?";
    db.query(sqlQuery, [productId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database query failed" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(results[0]); 
    });

    
});


app.get("/api/order/:id", (req, res) => {
    const orderId = req.params.id; // Get the ID from the URL

    const sqlQuery = "SELECT * FROM orders WHERE id = ?";
    db.query(sqlQuery, [orderId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database query failed" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(results[0]); 
    });

    
});

// Start the Server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// const fs = require('fs');
// const imageData = fs.readFileSync('/cr11.jpg');  // read the file as binary
// const mimeType = 'image/jpeg'; // adjust if needed

// const sql = "INSERT INTO images (image_data, mime_type) VALUES (?, ?)";
// db.query(sql, [imageData, mimeType], (err, results) => {
//   if (err) throw err;
//   console.log("Image inserted with ID:", results.insertId);
// });