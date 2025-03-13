let productType = "Сфери и Яйца"; // Define the variable

let currentUrl = window.config && window.config.URL ? window.config.URL : "https://api.magiccrystals.bg";

// Fetch products from the backend
fetch(`${currentUrl}/api/products/type/${encodeURIComponent(productType)}`)
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  })
  .then(products => {
    allProducts = products;
    displayProducts(currentPage);
  })
  .catch(error => console.error("Error fetching products:", error));
