const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const orderRoutes = require("./sendEmail");

// const session = require('express-session');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.json());

app.use(cors()); // Enable CORS for frontend access
app.use(express.json());
app.use(orderRoutes);
// app.use(cors({
//     origin: 'http://127.0.0.1:8080', // Allow requests from this origin
//     methods: 'GET,POST,PUT,DELETE',  // Allowed methods
//     credentials: true,
//     allowedHeaders: 'Content-Type,Authorization' // Allowed headers
//               // Allow cookies/session
// }));
// MySQL Database Connection
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "magi1axr_admin",  
//     password: "magiccrystals",  // Change if you have a MySQL password
//     database: "magi1axr_magiccrystals",  // Replace with your actual database name
// });


const db = mysql.createConnection({
    host: "localhost",
    user: "root",  // Change if your MySQL username is different
    password: "ROOT",  // Change if you have a MySQL password
    database: "magiccrystals",  // Replace with your actual database name
});


// Start the Server
const PORT = 8080;
const PORT2 = 3000;

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to MySQL database.");
});

// API Endpoint to Fetch All Products
// API Endpoint to Fetch Paginated Products
app.get("/api/products", (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 12; // Default limit is 12 products per page
    const offset = (page - 1) * limit; // Calculate offset
    console.log(limit)
    console.log(offset)

    // Use proper SQL syntax for pagination with LIMIT and OFFSET
    const sqlQuery = "SELECT * FROM crystals LIMIT ? OFFSET ?";
    db.query(sqlQuery, [limit, offset], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database query failed" });
        }

        // Query to get the total number of crystals (for pagination)
        const countQuery = "SELECT COUNT(*) AS total FROM crystals";
        db.query(countQuery, (err, countResults) => {
            if (err) {
                return res.status(500).json({ error: "Failed to get total product count" });
            }

            const totalItems = countResults[0].total; // Total number of products in the database
            const totalPages = Math.ceil(totalItems / limit); // Total number of pages

            res.json({
                page,
                limit,
                totalItems,
                totalPages,
                products: results,
            });
        });
    });
});



// API Endpoint to Fetch All preview
app.get("/api/preview", (req, res) => {
    const sqlQuery = "SELECT * FROM crystalspreview";
    db.query(sqlQuery, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database query failed" + err });
        }
        res.json(results);
    });
});


// API Endpoint to Fetch Products by Type
app.get("/api/products/type/:type", (req, res) => {
    const type = req.params.type; // Extract type dynamically from URL

    const sqlQuery = "SELECT * FROM crystals WHERE LOWER(type) = LOWER(?)";
    db.query(sqlQuery, [type], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database query failed" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "No crystals found for this type" });
        }

        res.json(results); // Return all matching products
    });
});


// API Endpoint to Fetch a Single Product by ID
app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id; // Get the ID from the URL

    const sqlQuery = "SELECT * FROM crystals WHERE id = ?";
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

// ==========================
// 🚀 API Routes for Reviews
// ==========================

// 📌 GET all reviews for a product
app.get("/api/reviews/:crystal_id", (req, res) => {
    const { crystal_id } = req.params;
    
    const sql = "SELECT * FROM reviews WHERE crystal_id = ?";
    db.query(sql, [crystal_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 📌 POST a new review
app.post("/api/reviews", (req, res) => {
    const { crystal_id, name, rating, reviewText } = req.body;

    console.log(req.body)
    if (!crystal_id || !name || !rating || !reviewText) {
        return res.status(400).json({ error: "All fields are required" + error });
    }

    const sql = "INSERT INTO reviews (crystal_id, name, rating, review_text) VALUES (?, ?, ?, ?)";
    db.query(sql, [crystal_id, name, rating, reviewText], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Review added successfully", reviewId: result.insertId });
    });
});

// ==========================
// 🚀 API Routes for Reviews
// ==========================

// API Endpoint to Fetch a Single preview by ID
app.get("/api/preview/:id", (req, res) => {
    const previewId = req.params.id; // Get the ID from the URL

    const sqlQuery = "SELECT * FROM crystalspreview WHERE id = ?";
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
 

// app.get("/api/order/:id", (req, res) => {
//     const orderId = req.params.id; // Get the ID from the URL

//     const sqlQuery = "SELECT * FROM orders WHERE id = ?";
//     db.query(sqlQuery, [orderId], (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: "Database query failed" });
//         }

//         if (results.length === 0) {
//             return res.status(404).json({ error: "Product not found" });
//         }

//         res.json(results[0]); 
//     });

    
// });




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


// Handle GET request to fetch orders
app.get('/api/orders/:orderId', (req, res) => {
    const orderId = req.params.orderId;

    // Query to fetch the order details from the orders table
    const getOrderQuery = `SELECT * FROM orders WHERE id = ?`;

    db.query(getOrderQuery, [orderId], (err, orderResults) => {
        if (err) {
            console.error('Error fetching order:', err);
            return res.status(500).json({ message: 'Failed to fetch order' });
        }

        if (orderResults.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const order = orderResults[0]; // Since we expect only one order

        // Query to fetch order items associated with the order
        const getOrderItemsQuery = `SELECT * FROM order_items WHERE order_id = ?`;

        db.query(getOrderItemsQuery, [orderId], (err, orderItems) => {
            if (err) {
                console.error('Error fetching order items:', err);
                return res.status(500).json({ message: 'Failed to fetch order items' });
            }

            // Send back order and order items
            res.status(200).json({
                order: {
                    id: order.id,
                    user_name: order.user_name,
                    email: order.email,
                    user_phone: order.user_phone,
                    total_amount: order.total_amount,
                    order_date: order.order_date
                },
                items: orderItems.map(item => ({
                    product_name: item.product_name,
                    product_price: item.product_price,
                    quantity: item.quantity
                }))
            });
        });
    });
});



// Handle GET request to fetch all orders
app.get('/api/orders', (req, res) => {
    // Query to fetch all orders from the orders table
    const getAllOrdersQuery = `SELECT * FROM orders`;

    db.query(getAllOrdersQuery, (err, orderResults) => {
        if (err) {
            console.error('Error fetching orders:', err);
            return res.status(500).json({ message: 'Failed to fetch orders' });
        }

        if (orderResults.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

        // Array to hold all orders with their items
        const ordersWithItems = [];

        // For each order, we need to get the associated order items
        let completedOrdersCount = 0;

        orderResults.forEach(order => {
            const orderId = order.id;

            // Query to fetch items associated with this order
            const getOrderItemsQuery = `SELECT * FROM order_items WHERE order_id = ?`;

            db.query(getOrderItemsQuery, [orderId], (err, orderItems) => {
                if (err) {
                    console.error('Error fetching order items:', err);
                    return res.status(500).json({ message: 'Failed to fetch order items' });
                }

                // Add the order and its items to the array
                ordersWithItems.push({
                    order: {
                        id: order.id,
                        user_name: order.user_name,
                        email: order.email,
                        user_phone: order.user_phone,
                        total_amount: order.total_amount,
                        order_date: order.order_date
                    },
                    items: orderItems.map(item => ({
                        product_name: item.product_name,
                        product_price: item.product_price,
                        quantity: item.quantity
                    }))
                });

                // Once all orders are processed, send the response
                completedOrdersCount++;
                if (completedOrdersCount === orderResults.length) {
                    res.status(200).json(ordersWithItems);
                }
            });
        });
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
    // const mimeType = req.file.mimetype; 
    

    // Insert image data and MIME type into the database
    db.query("INSERT INTO crystals (name,description,price,type, image_url) VALUES (?, ?, ?,?,?,?)", [name,description,price,type,image], (err, result) => {
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


// API to retrieve an image URL
app.get("/api/image/:id", (req, res) => {
    const id = req.params.id;

    db.query("SELECT image_url FROM crystals WHERE id = ?", [id], (err, result) => {
        if (err || result.length === 0) {
            return res.status(404).json({ error: "Image not found" });
        }
        
        // Send the image URL as a JSON response
        res.json({
            image_url: result[0].image_url  // Returning the image_url field
        });
    });
});



// Server-side (Node.js) example
app.get("/api/image/preview/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT image_url FROM crystalspreview WHERE id = ?", [id], (err, result) => {
    if (err || result.length === 0) {
      return res.status(404).json({ error: "Image not found" });
    }
    res.json({ image_url: result[0].image_url });  // Send the image URL
  });
});



app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    // Query database for user
    const sql = "SELECT * FROM admins WHERE username = ?";
    db.query(sql, [username], (err, results) => {
        if (err) return res.status(500).json({ error: "Server error " + err });

        if (results.length === 0) {
            return res.status(401).json({ error: "Грешно име или парола" });
        }

        const user = results[0];

        // Check if password matches (assuming passwords are stored as plain text for simplicity)
        if (user.password !== password) {
            return res.status(401).json({ error: "Грешно име или парола" });
        }

        res.json({ message: "Login successful" });
    });
});


// Check session
app.get('/check-auth', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true });
    } else {
        res.status(401).json({ loggedIn: false });
    }
});

// Logout API
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logged out successfully' });
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




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



