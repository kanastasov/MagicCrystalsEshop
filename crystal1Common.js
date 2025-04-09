let contentTitle;
let currentPage = 1;
const itemsPerPage = 20;
let allProducts = [];

console.log(document.cookie);

function dynamicClothingSection(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";
  
  let boxLink = document.createElement("a");
  boxLink.href = "/contentDetails.html?" + ob.id;

  // Create the image element
  let imgTag = document.createElement("img");

  // Fetch the image URL from your API
  fetch(`${window.config.URL}/api/image/${ob.id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to load image");
      }
      return response.json(); // Assuming your API sends a JSON response with the image URL
    })
    .then(data => {
      const imageUrl = data.image_url;  // Assuming the API returns an object like { image_url: "url" }
      imgTag.src = imageUrl;  // Set the source to the image URL
      imgTag.alt = ob.name;   // Set the alt text to the crystal's name
      // Append image to the boxDiv (inside the link)
      boxLink.appendChild(imgTag);  // Corrected location
    })
    .catch(error => console.error("Error loading image:", error));

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3 = document.createElement("h3");
  h3.textContent = ob.name;

  let h4 = document.createElement("h4");
  h4.textContent = ob.brand;

  let h2 = document.createElement("h2");
  h2.textContent = ob.price + " Лева";

  boxDiv.appendChild(boxLink);  // Append the link container to the boxDiv
  boxLink.appendChild(detailsDiv);  // Append details div inside the link
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(h4);
  detailsDiv.appendChild(h2);

  return boxDiv;
}



// Function to display paginated products
function displayProducts(page = 1) {
  let containerClothing = document.getElementById("containerClothing");
  let containerAccessories = document.getElementById("containerAccessories");

  // Clear previous content
  containerClothing.innerHTML = "";
  containerAccessories.innerHTML = "";

  // Calculate start and end index
  let startIndex = (page - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  let paginatedItems = allProducts.slice(startIndex, endIndex);

  paginatedItems.forEach(product => {
    let section = product.isAccessory ? containerAccessories : containerClothing;
    if (section) {
      section.appendChild(dynamicClothingSection(product));
    }
  });

  updatePaginationControls();
}

// Function to create pagination controls
function updatePaginationControls() {
  let paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = ""; // Clear previous buttons

  let totalPages = Math.ceil(allProducts.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    let button = document.createElement("button");
    button.textContent = i;
    button.className = i === currentPage ? "active" : "";
    button.onclick = function () {
      currentPage = i;
      displayProducts(currentPage);
    };
    paginationContainer.appendChild(button);
  }
}


document.addEventListener("DOMContentLoaded", function() {
    const sortAscBtn = document.getElementById("sort-price-asc");
    const sortDescBtn = document.getElementById("sort-price-desc");

      if (!sortAscBtn || !sortDescBtn) {
        console.warn("Sort buttons not found in DOM.");
    }
    if (sortAscBtn) {
        sortAscBtn.addEventListener("click", function() {
            sortProductsByPrice("asc", currentPage);
        });
    }

    if (sortDescBtn) {
        sortDescBtn.addEventListener("click", function() {
            sortProductsByPrice("desc", currentPage);
        });
    }
});

function sortProductsByPrice(order, currentPage) {
    if (order === "asc") {
        allProducts.sort((a, b) => a.price - b.price);
    } else if (order === "desc") {
        allProducts.sort((a, b) => b.price - a.price);
    }
        displayProducts(currentPage);
        updatePaginationControls();
}
