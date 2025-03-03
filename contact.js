document.addEventListener("DOMContentLoaded", function () {
    const sendButton = document.getElementById("sendMessage");
    
    sendButton.addEventListener("click", function (event) {
        event.preventDefault();
        sendEmail();
    });
});

function sendEmail() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validate fields
    if (!name || !email || !phone || !message) {
        alert("Please fill in all fields.");
        return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Please enter a valid email.");
        return;
    }

    // Example: Send data to an API or EmailJS
    const emailData = {
        name,
        email,
        phone,
        message
    };

    fetch(`${window.config.URL}/api/send-request-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData)
    })
    .then(response => response.json())
    .then(data => {
        alert("Your message has been sent successfully!");
    })
    .catch(error => {
        alert("Error sending email. Please try again.");
        console.error("Error:", error);
    });
}

