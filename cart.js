console.clear();

if(document.cookie.indexOf(',counter=')>=0)
{
    let counter = document.cookie.split(',')[1].split('=')[1]
    document.getElementById("badge").innerHTML = counter
}


let cartContainer = document.getElementById('cartContainer')

let boxContainerDiv = document.createElement('div')
boxContainerDiv.id = 'boxContainer'

// DYNAMIC CODE TO SHOW THE SELECTED ITEMS IN YOUR CART
function dynamicCartSection(ob,itemCounter)
{
    let boxDiv = document.createElement('div')
    boxDiv.id = 'box'
    boxContainerDiv.appendChild(boxDiv)





    // let boxImg = document.createElement('img')
    // boxImg.src = ob.preview

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
          boxDiv.appendChild(imgTag)







    // boxDiv.appendChild(boxImg)


    

    let boxh3 = document.createElement('h3')
    let h3Text = document.createTextNode(ob.name + ' × ' + itemCounter)
    // let h3Text = document.createTextNode(ob.name)
    boxh3.appendChild(h3Text)
    boxDiv.appendChild(boxh3)

    let boxh4 = document.createElement('h4')
    let h4Text = document.createTextNode(ob.price +  ' Лева')
    boxh4.appendChild(h4Text)
    boxDiv.appendChild(boxh4)

    // console.log(boxContainerDiv);

    buttonLink.appendChild(buttonText)
    cartContainer.appendChild(boxContainerDiv)
    cartContainer.appendChild(totalContainerDiv)
    // let cartMain = document.createElement('div')
    // cartmain.id = 'cartMainContainer'
    // cartMain.appendChild(totalContainerDiv)

    return cartContainer
}

let totalContainerDiv = document.createElement('div')
totalContainerDiv.id = 'totalContainer'

let totalDiv = document.createElement('div')
totalDiv.id = 'total'
totalContainerDiv.appendChild(totalDiv)

let totalh2 = document.createElement('h2')
let h2Text = document.createTextNode('Total Amount')
totalh2.appendChild(h2Text)
totalDiv.appendChild(totalh2)

// TO UPDATE THE TOTAL AMOUNT
function amountUpdate(amount)
{
    let totalh4 = document.createElement('h4')
    // let totalh4Text = document.createTextNode(amount)
    let totalh4Text = document.createTextNode( amount + " Лева")
    totalh4Text.id = 'toth4'
    totalh4.appendChild(totalh4Text)
    totalDiv.appendChild(totalh4)
    totalDiv.appendChild(buttonDiv)
    console.log(totalh4);
}


let buttonDiv = document.createElement('div')
buttonDiv.id = 'button'
totalDiv.appendChild(buttonDiv)

let buttonTag = document.createElement('button')
buttonDiv.appendChild(buttonTag)

let buttonLink = document.createElement('a')
buttonLink.href = '/orderPlaced.html?'
buttonTag.appendChild(buttonLink)

buttonText = document.createTextNode('Place Order')
buttonTag.onclick = function()
{
    console.log("clicked")
}  
//dynamicCartSection()
// console.log(dynamicCartSection());

// BACKEND CALL
let httpRequest = new XMLHttpRequest()
let totalAmount = 0
httpRequest.onreadystatechange = function () {
    if (this.readyState === 4) {
        if (this.status == 200) {
            contentTitle = JSON.parse(this.responseText);
            console.log("Fetched Products:", contentTitle); // Debugging

         
            let counter = Number(document.cookie.split(',')[1]?.split('=')[1] || 0);
            document.getElementById("totalItem").innerHTML = ('Total Items: ' + counter);

            // let item = document.cookie.split(',')[0]?.split('=')[1]?.split(" ") || [];
            let item = document.cookie.split(',')[1]?.split('=')[1]?.split(" ") || [];

            console.log("Item List:", item);
            console.log("Document Cookie:", document.cookie);

console.log("contentTitle:", contentTitle);
console.log("Type of contentTitle:", typeof contentTitle);
console.log("Is contentTitle an array?", Array.isArray(contentTitle));



            let totalAmount = 0;
            for (let i = 0; i < counter; i++) {
       
                let itemCounter = 1;
                for (let j = i + 1; j < counter; j++) {   
                    if (Number(item[j]) === Number(item[i])) {
                        itemCounter += 1;
                    }
                }

                // let product = contentTitle.find(p => p.id == item[i]);
                // let product = contentTitle.find(p => String(p.id) === String(item[i].trim())); 
                // if (!product) {
                //     console.error("Product not found for ID:", item[i]);
                // }

                let product;
if (Array.isArray(contentTitle)) {
    product = contentTitle.find(p => String(p.id) === String(item[i].trim()));
} else {
    product = contentTitle; // Directly assign if it's a single object
}
console.log("Found product:", product);

            console.log("Fetched Products:", contentTitle); 
            // console.log("Requested Item", item);
            console.log("product ", product);
            console.log("itemCounter  ", itemCounter);

                if (product) {
                    totalAmount += Number(product.price) * itemCounter;
                    dynamicCartSection(product, itemCounter);
                } else {
                    console.error("Product not found for ID:", item[i]);
                }

                i += (itemCounter - 1);
            }
            amountUpdate(totalAmount);
        } else {
            console.log("API call failed!");
        }
    }
};

function getCookieValue(name) {
    let cookies = document.cookie.split("; "); // Split cookies into key-value pairs
    for (let cookie of cookies) {
        let [key, value] = cookie.split("="); // Split key and value
        if (key === name) {
            return decodeURIComponent(value); // Return decoded value
        }
    }
    return null; // Return null if cookie not found
}

// Example usage:
let userId = getCookieValue("id");
console.log("User ID from cookie:", userId);


let productId = localStorage.getItem('productId');
console.log(productId);  // Logs 123 (or null if it's not set)


httpRequest.open('GET', 'http://localhost:8080/api/products/'+productId, true)

// httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', true)
httpRequest.send()




