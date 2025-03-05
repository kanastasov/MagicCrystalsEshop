let contentTitle;
let currentPage = 1;
const itemsPerPage = 12;
let allProducts = [];

console.log(document.cookie);

function dynamicClothingSection(ob) {
    let boxDiv = document.createElement("div");
    boxDiv.id = "box";

    let boxLink = document.createElement("a");
    boxLink.href = "/contentDetails.html?" + ob.id;

    let imgTag = document.createElement("img");

    fetch(`${window.config.URL}/api/image/${ob.id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load image");
            }
            return response.blob();
        })
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);
            imgTag.src = imageUrl;
            imgTag.alt = ob.name;
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

    boxDiv.appendChild(boxLink);
    boxLink.appendChild(imgTag);
    boxLink.appendChild(detailsDiv);
    detailsDiv.appendChild(h3);
    detailsDiv.appendChild(h4);
    detailsDiv.appendChild(h2);

    console.log("Dynamic section created for:", ob.name); // Debugging line

    return boxDiv;
}

function displayProducts(page = 1) {
    console.log("Displaying products for page:", page);
    
    let containerClothing = document.getElementById("containerClothing");
    let containerAccessories = document.getElementById("containerAccessories");

    containerClothing.innerHTML = "";
    containerAccessories.innerHTML = "";

    console.log("All products before slicing:", allProducts);

    let startIndex = (page - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    
    // Correct slicing logic to prevent out-of-bounds issues
    let paginatedItems = allProducts.slice(startIndex, Math.min(endIndex, allProducts.length));
    console.log("Paginated items for page:", paginatedItems); // Debugging step

    if (paginatedItems.length === 0) {
        console.log("No products to display for this page.");
    }

    allProducts.forEach(product => {
        let section = product.isAccessory ? containerAccessories : containerClothing;
        section.appendChild(dynamicClothingSection(product));
    });

    updatePaginationControls();
}





function updatePaginationControls() {
  let paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

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

function updatePaginationUI(totalPages) {
    const paginationContainer = document.getElementById("pagination");

    if (!paginationContainer) {
        console.error("Pagination container not found in HTML!");
        return;
    }

    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.add("pagination-button");

        if (i === currentPage) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {
            currentPage = i;
            fetchProducts(currentPage);  // Fetch products for the selected page
            console.log("Current Page:", currentPage);
        });

        paginationContainer.appendChild(button);
    }
}



function fetchProducts(page = 1) {
fetch(`${window.config.URL}/api/products?page=${page}&limit=${itemsPerPage}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        return response.json();
    })
    .then(data => {
        console.log("API Response:", data); // Check response structure

        allProducts = data.products || []; // Correctly populate allProducts
        console.log("Updated allProducts:", JSON.stringify(allProducts, null, 2)); // Check contents

        const totalPages = data.totalPages || 1;
        displayProducts(page);
        updatePaginationUI(totalPages);
    })
    .catch(error => console.error("Error fetching products:", error));


}




document.addEventListener("DOMContentLoaded", function() {
    fetchProducts(currentPage);  // Fetch products for the first page
});