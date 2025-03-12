// Fetch products from the backend
fetch(`${window.config.URL || 'https://api.magiccrystals.bg'}/api/products/type/Друзи`)
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