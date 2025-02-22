let contentTitle;

console.log(document.cookie);

function dynamicClothingSection(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";

  let boxLink = document.createElement("a");
  boxLink.href = "/contentDetails.html?" + ob.id;

  let imgTag = document.createElement("img");

  // Fetch the image as a Blob and set it correctly
  fetch(`http://localhost:8080/api/image/${ob.id}`)
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

// Function to display products
function displayProducts(products) {
  let containerClothing = document.getElementById("containerClothing");
  let containerAccessories = document.getElementById("containerAccessories");

  products.forEach(product => {
    let section = product.isAccessory ? containerAccessories : containerClothing;
    if (section) {
      section.appendChild(dynamicClothingSection(product));
    } else {
      console.error(`${product.isAccessory ? "containerAccessories" : "containerClothing"} not found!`);
    }
  });
}

// Fetch products from the backend
fetch("http://localhost:8080/api/products/type/бижута")
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  })
  .then(products => {
    contentTitle = products;
    if (document.cookie.includes(",counter=")) {
      let counter = document.cookie.split(",")[1].split("=")[1];
      // document.getElementById("badge").textContent = counter;
    }
    displayProducts(products);
  })
  .catch(error => console.error("Error fetching products:", error));


