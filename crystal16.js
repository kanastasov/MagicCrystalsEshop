let productType = "Езотерични продукти"; // Define the variable


// Fetch products from the backend
fetch(`${window.config.URL}/api/products/type/${encodeURIComponent(productType)}`)
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



