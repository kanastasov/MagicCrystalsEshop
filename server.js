const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");

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

    const sqlQuery = "SELECT * FROM products WHERE id = ?";
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

// Multer for handling file uploads
const storage = multer.memoryStorage(); // Store in memory
const upload = multer({ storage: storage });



/// POST Route to upload the image
app.post("/api/upload", upload.single("image"), (req, res) => {
    console.log('Upload img')
    console.log(req)
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }


    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const image = req.file.buffer;  // Image binary data
    const mimeType = req.file.mimetype; // MIME type (e.g., "image/jpeg", "image/png")

    // Insert image data and MIME type into the database
    db.query("INSERT INTO products (name,description,price, image_data, mime_type) VALUES (?, ?, ?,?,?)", [name,description,price,image, mimeType], (err, result) => {
        if (err) {
            console.error("Error inserting image:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Image uploaded successfully", id: result.insertId });
    });
});

// API to retrieve an image
app.get("/api/image/:id", (req, res) => {
    const id = req.params.id;

    db.query("SELECT image_data FROM products WHERE id = ?", [id], (err, result) => {
        if (err || result.length === 0) {
            return res.status(404).json({ error: "Image not found" });
        }
        
        res.setHeader("Content-Type", "image/jpeg"); // Set correct content type
        res.send(result[0].image_data);
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