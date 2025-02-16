

let contentTitle;

console.log(document.cookie);
function dynamicClothingSection(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";

  let boxLink = document.createElement("a");
  // boxLink.href = '#'
  boxLink.href = "/contentDetails.html?" + ob.id;
  // console.log('link=>' + boxLink);

  let imgTag = document.createElement("img");
  // imgTag.id = 'image1'
  // imgTag.id = ob.photos
  imgTag.src = ob.preview;

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3 = document.createElement("h3");
  let h3Text = document.createTextNode(ob.name);
  h3.appendChild(h3Text);

  let h4 = document.createElement("h4");
  let h4Text = document.createTextNode(ob.brand);
  h4.appendChild(h4Text);

  let h2 = document.createElement("h2");
  let h2Text = document.createTextNode(ob.price + " Лева");
  h2.appendChild(h2Text);

  boxDiv.appendChild(boxLink);
  boxLink.appendChild(imgTag);
  boxLink.appendChild(detailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(h4);
  detailsDiv.appendChild(h2);

  return boxDiv;
}

//  TO SHOW THE RENDERED CODE IN CONSOLE
// console.log(dynamicClothingSection());

// console.log(boxDiv)

let mainContainer = document.getElementById("mainContainer");
let containerClothing = document.getElementById("containerClothing");
let containerAccessories = document.getElementById("containerAccessories");
// mainContainer.appendChild(dynamicClothingSection('hello world!!'))

// BACKEND CALLING

let httpRequest = new XMLHttpRequest();
//  console.log('httpRequest ' + httpRequest)
httpRequest.onreadystatechange = function() {
  if (this.readyState === 4) {
    if (this.status == 200) {
      // console.log('call successful');
      contentTitle = JSON.parse(this.responseText);
      if (document.cookie.indexOf(",counter=") >= 0) {
        var counter = document.cookie.split(",")[1].split("=")[1];
        document.getElementById("badge").innerHTML = counter;
      }
      for (let i = 0; i < contentTitle.length; i++) {
        if (contentTitle[i].isAccessory) {
          // console.log(contentTitle[i]);
          if(containerAccessories) {
            containerAccessories.appendChild(
            dynamicClothingSection(contentTitle[i])
          );
          }
         
        } else {
          // console.log(contentTitle[i]);
          if(containerClothing) {
             containerClothing.appendChild( dynamicClothingSection(contentTitle[i]));
          }else {
             console.error("containerClothing not found!");
          }
         
        }
      }
    } else {
      console.log("call failed!");
    }
  }
};
// httpRequest.open("GET", "http://localhost:3000/api/products", true);

 

// fetch("http://localhost:8080/api/products")
//   .then(response => {
//     console.log("Response Status:", response.status);
//     return response.text();
//   })
//   .then(data => console.log("Raw Response:", data))
//   .catch(error => console.error("Error fetching products:", error));



function displayProducts(products) {
    let containerClothing = document.getElementById("containerClothing");
    let containerAccessories = document.getElementById("containerAccessories");

    products.forEach(product => {
        if (product.isAccessory) {
            if (containerAccessories) {
                containerAccessories.appendChild(dynamicClothingSection(product));
            } else {
                console.error("containerAccessories not found!");
            }
        } else {
            if (containerClothing) {
                containerClothing.appendChild(dynamicClothingSection(product));
            } else {
                console.error("containerClothing not found!");
            }
        }
    });
}



httpRequest.open(
  "GET",
  "http://localhost:8080/api/products",
  true
);



httpRequest.send();
