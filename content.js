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

  return boxDiv;
}

function displayProducts(page = 1) {
  let containerClothing = document.getElementById("containerClothing");
  let containerAccessories = document.getElementById("containerAccessories");

  containerClothing.innerHTML = "";
  containerAccessories.innerHTML = "";

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

fetch(`${window.config.URL}/api/products`)
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
