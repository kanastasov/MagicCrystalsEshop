console.clear();

// Retrieve cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalAmount = 0;

// Update cart badge count
document.getElementById("badge").innerHTML = cart.reduce((sum, item) => sum + item.quantity, 0);

let cartContainer = document.getElementById('cartContainer');
let boxContainerDiv = document.createElement('div');
boxContainerDiv.id = 'boxContainer';

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

    cartContainer.appendChild(boxContainerDiv);
}

// Total amount section
let totalContainerDiv = document.createElement('div');
totalContainerDiv.id = 'totalContainer';

let totalDiv = document.createElement('div');
totalDiv.id = 'total';
totalContainerDiv.appendChild(totalDiv);

let totalh2 = document.createElement('h2');
let h2Text = document.createTextNode('Total Amount');
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
buttonTag.onclick = function () {
    console.log("Order placed");
    localStorage.removeItem("cart"); // Clear cart after placing order
    location.reload(); // Refresh page to show an empty cart
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