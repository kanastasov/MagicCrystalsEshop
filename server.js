const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const orderRoutes = require("./sendEmail");


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.json());

app.use(cors()); // Enable CORS for frontend access
app.use(express.json());
app.use(orderRoutes);

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



// API Endpoint to Fetch All Products
app.get("/api/preview", (req, res) => {
    const sqlQuery = "SELECT * FROM preview";
    db.query(sqlQuery, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database query failed" });
        }
        res.json(results);
    });
});


// API Endpoint to Fetch Products by Type
app.get("/api/products/type/:type", (req, res) => {
    const type = req.params.type; // Extract type dynamically from URL

    const sqlQuery = "SELECT * FROM products WHERE LOWER(type) = LOWER(?)";
    db.query(sqlQuery, [type], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database query failed" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "No products found for this type" });
        }

        res.json(results); // Return all matching products
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


// API Endpoint to Fetch a Single preview by ID
app.get("/api/preview/:id", (req, res) => {
    const previewId = req.params.id; // Get the ID from the URL

    const sqlQuery = "SELECT * FROM preview WHERE id = ?";
    db.query(sqlQuery, [previewId], (err, results) => {
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




app.post('/api/order', async (req, res) => {
    console.log("Received Order:", req.body);  // Log the incoming order data

    const { items, totalAmount, userName, email, userPhone } = req.body;

    // Step 1: Insert the order into the orders table
    const insertOrderQuery = `
        INSERT INTO orders (user_name, email, user_phone, total_amount, order_date)
        VALUES (?, ?, ?, ?, NOW())
    `;

    db.query(insertOrderQuery, [userName, email, userPhone, totalAmount], (err, result) => {
        if (err) {
            console.error('Error inserting order:', err);
            return res.status(500).json({ message: 'Failed to place the order' });
        }

        const orderId = result.insertId;  // Get the generated order_id

        // Step 2: Insert each item into the order_items table
        const insertItemQuery = `
            INSERT INTO order_items (order_id, product_name, product_price, quantity)
            VALUES (?, ?, ?, ?)
        `;
        
        let itemInsertErrors = false; // Flag for item insertion errors

        items.forEach(item => {
            const { name, price, quantity } = item;

            db.query(insertItemQuery, [orderId, name, price, quantity], (err) => {
                if (err) {
                    console.error('Error inserting item:', err);
                    itemInsertErrors = true;  // Mark that there was an error inserting an item
                }
            });
        });

        // Check if there was any error inserting items
        if (itemInsertErrors) {
            return res.status(500).json({ message: 'Failed to insert some order items' });
        }

        // Step 3: Send email or other actions
        // Send a confirmation email (you can use a service like Nodemailer for email sending)

        res.status(200).json({ message: 'Order placed successfully' });
    });
});




// Multer for handling file uploads
const storage = multer.memoryStorage(); // Store in memory
const upload = multer({ storage: storage });



app.post("/api/upload", upload.single("image"), (req, res) => {
    console.log('Upload img')
    console.log(req)
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }


    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const type = req.body.type;

    const image = req.file.buffer;  // Image binary data
    const mimeType = req.file.mimetype; 
    

    // Insert image data and MIME type into the database
    db.query("INSERT INTO products (name,description,price,type, image_data, mime_type) VALUES (?, ?, ?,?,?,?)", [name,description,price,type,image, mimeType], (err, result) => {
        if (err) {
            console.error("Error inserting image:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Image uploaded successfully", id: result.insertId });
    });
});

/// POST Route to upload preview
app.post("/api/upload/preview", upload.single("image"), (req, res) => {
    console.log('Upload img')
    console.log(req)
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }


    const name = req.body.name;
    const description = req.body.description;
    const type = req.body.type;

    const image = req.file.buffer;  // Image binary data
    const mimeType = req.file.mimetype; 
    
    
    // MIME type (e.g., "image/jpeg", "image/png")

    // Insert image data and MIME type into the database
    db.query("INSERT INTO preview (name,description,type, image_data, mime_type) VALUES (?, ?, ?,?,?)", [name,description,type,image, mimeType], (err, result) => {
        if (err) {
            console.error("Error Creating preview", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Creating created successfully", id: result.insertId });
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


// API to retrieve an image
app.get("/api/image/preview/:id", (req, res) => {
    const id = req.params.id;

    db.query("SELECT image_data FROM preview WHERE id = ?", [id], (err, result) => {
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




// Admin Login Route
app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }

    db.query("SELECT * FROM admins WHERE username = ?", [username], (err, results) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });

        if (results.length === 0) {
            return res.status(401).json({ message: "Admin not found" });
        }

        const admin = results[0];

        // Compare entered password with stored hashed password
        if (!bcrypt.compareSync(password, admin.password)) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: admin.id }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ token, message: "Login successful" });
    });
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "Token required" });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.adminId = decoded.id;
        next();
    });
};

// CRUD operations for products
app.get("/products", verifyToken, (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post("/products", verifyToken, (req, res) => {
    const { name, price, description } = req.body;
    db.query("INSERT INTO products (name, price, description) VALUES (?, ?, ?)", [name, price, description], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Product added successfully" });
    });
});

app.put("/products/:id", verifyToken, (req, res) => {
    const { name, price, description } = req.body;
    db.query("UPDATE products SET name=?, price=?, description=? WHERE id=?", [name, price, description, req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Product updated successfully" });
    });
});

app.delete("/products/:id", verifyToken, (req, res) => {
    db.query("DELETE FROM products WHERE id=?", [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Product deleted successfully" });
    });
});
