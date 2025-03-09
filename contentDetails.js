console.clear()
let productId;

let id = location.search.split('?')[1]
console.log(id)

if(document.cookie.indexOf(',counter=')>=0)
{
    let counter = document.cookie.split(',')[1].split('=')[1]
    document.getElementById("badge").innerHTML = counter
}

function dynamicContentDetails(ob)
{
    let mainContainer = document.createElement('div')
    mainContainer.id = 'containerD'
    document.getElementById('containerProduct').appendChild(mainContainer);

    let imageSectionDiv = document.createElement('div')
    imageSectionDiv.id = 'imageSection'

  let imgTag = document.createElement("img");

  // Fetch the image URL from your API
  fetch(`${window.config.URL}/api/image/${ob.id}`)
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


    imageSectionDiv.appendChild(imgTag)

    let productDetailsDiv = document.createElement('div')
    productDetailsDiv.id = 'productDetails'

    // console.log(productDetailsDiv);

    let h1 = document.createElement('h1')
    let h1Text = document.createTextNode(ob.name)
    h1.appendChild(h1Text)

 

    let h4 = document.createElement('h2')

    let h4Text = document.createTextNode('Описание: ' + ob.description)
    h4.appendChild(h4Text)
    console.log(h4);

    let detailsDiv = document.createElement('div')
    detailsDiv.id = 'details'
   let h3 = document.createElement('h3')

    let h3DetailsDiv = document.createElement('h3')

    let h3DetailsText = document.createTextNode(ob.price +  ' Лева' )
    h3DetailsDiv.appendChild(h3DetailsText)

    let productPreviewDiv = document.createElement('div')
    productPreviewDiv.id = 'productPreview'

    let h3ProductPreviewDiv = document.createElement('h3')
    let h3ProductPreviewText = document.createTextNode('Преглед на продукта')
    h3ProductPreviewDiv.appendChild(h3ProductPreviewText)
    productPreviewDiv.appendChild(h3ProductPreviewDiv)

    let i;
 
    let buttonDiv = document.createElement('div')
    buttonDiv.id = 'button'

    let buttonTag = document.createElement('button')
    buttonDiv.appendChild(buttonTag)

    buttonText = document.createTextNode('Add to Cart')
    buttonTag.onclick = function() {
    let order = id + " ";
    let counter = 1;

    if (document.cookie.indexOf(',counter=') >= 0) {
        order = id + " " + document.cookie.split(',')[0].split('=')[1];
        counter = Number(document.cookie.split(',')[1].split('=')[1]) + 1;
    }

    document.cookie = "orderId=" + order + ",counter=" + counter;
    document.getElementById("badge").innerHTML = counter;

    // Retrieve the existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product is already in the cart
    let existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if the product is already in the cart
    } else {
        cart.push({
            id: productId,
            name: ob.name,
            price: ob.price,
            description: ob.description,
            quantity: 1
        });
    }

    // Save updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    console.log("Cart updated:", cart);
};
    buttonTag.appendChild(buttonText)


    console.log(mainContainer.appendChild(imageSectionDiv));
    mainContainer.appendChild(imageSectionDiv)
    mainContainer.appendChild(productDetailsDiv)
    productDetailsDiv.appendChild(h1)
      detailsDiv.appendChild(h3)
    productDetailsDiv.appendChild(h4)
    productDetailsDiv.appendChild(detailsDiv)
    detailsDiv.appendChild(h3DetailsDiv)
  
    // detailsDiv.appendChild(para)
    productDetailsDiv.appendChild(productPreviewDiv)
    
    
    productDetailsDiv.appendChild(buttonDiv)


    return mainContainer
}



// BACKEND CALLING
let httpRequest = new XMLHttpRequest()
{
    httpRequest.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status == 200)
        {
            console.log('connected!!');
            let contentDetails = JSON.parse(this.responseText)
            {
              console.log(contentDetails);
                productId = contentDetails.id
                console.log(productId);
                localStorage.setItem('productId', productId);

                dynamicContentDetails(contentDetails)
            }
        }
        else
        {
            console.log('not connected!');
        }
    }
}

httpRequest.open('GET', `${window.config.URL}/api/products/`+id, true)



httpRequest.send()  
