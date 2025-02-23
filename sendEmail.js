const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const router = express.Router();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

router.post("/api/send-order-email", async (req, res) => {
    const { items, totalAmount, email,userName,userPhone } = req.body;
       
   
    if (!email || items.length === 0) {
        return res.status(400).json({ message: "Invalid order details" });
    }

    let itemList = items.map(item => `${item.name} × ${item.quantity} - ${item.price} Лева`).join("\n");

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Потвърждение на поръчката",
        text: `Благодаря ви за поръчката ${userName}!\n\nДетайли на поръчката:\n${itemList}\n\Общо: ${totalAmount} Лева\n\nЩе ви се обадим на ${userPhone} когато пратката е готова`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Email failed to send" });
    }
});


router.post("/api/send-request-email", async (req, res) => {
    const { name,
        email,
        phone,
        message
     } = req.body;
       
   
    if (!email || items.length === 0) {
        return res.status(400).json({ message: "Invalid request details" });
    }


    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Потвърждение на Запитване",
        text: `Благодаря ви за запитването${name}!\n\nДетайли на запитването:\n${message}\n\\n\nЩе ви се обадим на ${phone} когато имаме повече информация`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Email failed to send" });
    }
});

module.exports = router;
