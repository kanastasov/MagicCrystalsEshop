console.clear();

// Retrieve cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalAmount = 0;

// Retrieve user details from localStorage (assuming they are stored here)
let userName = localStorage.getItem("userName") || "Anonymous";
let userEmail = localStorage.getItem("userEmail") || "Not provided";
let userPhone = localStorage.getItem("userPhone") || "Not provided";
// Update cart badge count
document.getElementById("badge").innerHTML = cart.reduce((sum, item) => sum + item.quantity, 0);

let cartContainer = document.getElementById('cartContainer');
let boxContainerDiv = document.createElement('div');
boxContainerDiv.id = 'boxContainer';

// Function to update localStorage and re-render the cart
function updateCart(newCart) {
    localStorage.setItem("cart", JSON.stringify(newCart));
    location.reload(); // Refresh the page to reflect updates
}

// Function to remove an item from the cart
function removeItem(productId) {
    let updatedCart = cart.map(item => {
        if (item.id === productId) {
            item.quantity -= 1; // Decrease quantity
        }
        return item;
    }).filter(item => item.quantity > 0); // Remove if quantity is zero

    updateCart(updatedCart);
}

// Function to create dynamic cart items
function dynamicCartSection(item) {
    let boxDiv = document.createElement('div');
    boxDiv.id = 'box';
    boxContainerDiv.appendChild(boxDiv);

    let imgTag = document.createElement("img");

    // Fetch the image as a Blob and set it correctly
    fetch(`http://localhost:8080/api/image/${item.id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load image");
            }
            return response.blob();
        })
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);
            imgTag.src = imageUrl;
            imgTag.alt = item.name;
        })
        .catch(error => console.error("Error loading image:", error));

    boxDiv.appendChild(imgTag);

    let boxh3 = document.createElement('h3');
    let h3Text = document.createTextNode(item.name + ' × ' + item.quantity);
    boxh3.appendChild(h3Text);
    boxDiv.appendChild(boxh3);

    let boxh4 = document.createElement('h4');
    let h4Text = document.createTextNode(item.price + ' Лева');
    boxh4.appendChild(h4Text);
    boxDiv.appendChild(boxh4);

    // Remove button
    let removeButton = document.createElement('button');
    removeButton.innerText = "Remove";
    removeButton.className = "remove-btn";
    removeButton.onclick = function () {
        removeItem(item.id);
    };
    boxDiv.appendChild(removeButton);

    cartContainer.appendChild(boxContainerDiv);
}

// Total amount section
let totalContainerDiv = document.createElement('div');
totalContainerDiv.id = 'totalContainer';

let totalDiv = document.createElement('div');
totalDiv.id = 'total';
totalContainerDiv.appendChild(totalDiv);

let totalh2 = document.createElement('h2');
let h2Text = document.createTextNode('Обща цена без доставка');
totalh2.appendChild(h2Text);
totalDiv.appendChild(totalh2);

// Function to update total amount
function amountUpdate(amount) {
    let totalh4 = document.createElement('h4');
    let totalh4Text = document.createTextNode(amount + " Лева");
    totalh4.appendChild(totalh4Text);
    totalDiv.appendChild(totalh4);
    totalDiv.appendChild(buttonDiv);
}

// Place order button
let buttonDiv = document.createElement('div');
buttonDiv.id = 'button';
totalDiv.appendChild(buttonDiv);

let buttonTag = document.createElement('button');
buttonDiv.appendChild(buttonTag);

let buttonLink = document.createElement('a');
buttonLink.href = '/orderPlaced.html';
buttonTag.appendChild(buttonLink);

let buttonText = document.createTextNode('Place Order');
buttonTag.onclick = async function () {
    console.log("Placing order...");

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Prepare order details
    let orderDetails = {
        items: cart,
        totalAmount: totalAmount,
        userName: userName,
        email: userEmail,
        userPhone: userPhone
    };

    try {
        let response = await fetch("http://localhost:8080/api/send-order-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderDetails)
        });

        let result = await response.json();
        if (response.ok) {
            alert("Order placed successfully! A confirmation email has been sent.");
            localStorage.removeItem("cart"); // Clear cart
            location.reload();
        } else {
            alert("Failed to place order: " + result.message);
        }
    } catch (error) {
        console.error("Error sending order:", error);
        alert("Something went wrong. Please try again.");
    }
};
buttonTag.appendChild(buttonText);

// Render cart items
cart.forEach(item => {
    totalAmount += item.price * item.quantity;
    dynamicCartSection(item);
});

// Update total amount
amountUpdate(totalAmount);

// Append total section
cartContainer.appendChild(totalContainerDiv);
