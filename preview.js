let contentTitle;
let tempUrl = window.config && window.config.URL ? window.config.URL : "https://api.magiccrystals.bg";

console.log(document.cookie);

function dynamicClothingSection(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";

  let boxLink = document.createElement("a");
  boxLink.href = "/crystal" +ob.id + ".html?";
    // boxLink.href = "/contentDetails.html?" + ob.id;


  let imgTag = document.createElement("img");


  // Fetch the image URL from your API
  fetch(`${tempUrl}/api/image/preview/${ob.id}`)
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
    .catch(error => console.error("Error loading image:", window.config.URL , error));

  


  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3 = document.createElement("h3");
  h3.textContent = ob.name;

  let h4 = document.createElement("h4");
  h4.textContent = ob.brand;

  // let h2 = document.createElement("h2");
  // h2.textContent = ob.price + " Лева";

  boxDiv.appendChild(boxLink);
  boxLink.appendChild(imgTag);
  boxLink.appendChild(detailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(h4);
  // detailsDiv.appendChild(h2);

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

// Fetch products preview from the backend
fetch(`${tempUrl}/api/preview`)
  .then(response => {
    if (!response.ok) {
      return response.json().then(errData => {
        throw new Error(`Server Error ${response.status}: ${errData.error}`);
      });
    }
    return response.json();
  })
  .then(products => {
    displayProducts(products);
  })
  .catch(error => console.error("Error fetching products:", error.message));

