
fetch(`${window.config.URL || 'https://magiccrystals.bg'}/api/products/type/Полирани Камъни`)
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


