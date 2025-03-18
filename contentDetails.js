console.clear()
let productId;

let id = location.search.split('?')[1]
console.log(id)

if(document.cookie.indexOf(',counter=')>=0)
{
    let counter = document.cookie.split(',')[1].split('=')[1]
    document.getElementById("badge").innerHTML = counter
}

function dynamicContentDetails(ob) {
    let mainContainer = document.createElement('div');
    mainContainer.id = 'containerD';
    document.getElementById('containerProduct').appendChild(mainContainer);

    // Image Section
    let imageSectionDiv = document.createElement('div');
    imageSectionDiv.id = 'imageSection';

    let imgTag = document.createElement("img");

    // Fetch the image URL
    fetch(`${window.config.URL || 'https://api.magiccrystals.bg'}/api/image/${ob.id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load image");
            }
            return response.json();
        })
        .then(data => {
            imgTag.src = data.image_url;
            imgTag.alt = ob.name;
        })
        .catch(error => console.error("Error loading image:", error));

    imageSectionDiv.appendChild(imgTag);

    // Product Details Section
    let productDetailsDiv = document.createElement('div');
    productDetailsDiv.id = 'productDetails';

    let h1 = document.createElement('h1');
    h1.textContent = ob.name;

    let h4 = document.createElement('h2');
    h4.textContent = 'Описание: ' + ob.description;

    let detailsDiv = document.createElement('div');
    detailsDiv.id = 'details';

    let h3DetailsDiv = document.createElement('h3');
    h3DetailsDiv.textContent = ob.price + ' Лева';

    let productPreviewDiv = document.createElement('div');
    productPreviewDiv.id = 'productPreview';

    let h3ProductPreviewDiv = document.createElement('h3');
    h3ProductPreviewDiv.textContent = 'Преглед на продукта';
    productPreviewDiv.appendChild(h3ProductPreviewDiv);

    // Add to Cart Button
    let buttonDiv = document.createElement('div');
    buttonDiv.id = 'button';

    let buttonTag = document.createElement('button');
    buttonTag.textContent = 'Add to Cart';
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

        let existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: ob.name,
                price: ob.price,
                description: ob.description,
                quantity: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        console.log("Cart updated:", cart);
    };
    buttonDiv.appendChild(buttonTag);

    // Append elements
    detailsDiv.appendChild(h3DetailsDiv);
    productDetailsDiv.appendChild(h1);
    productDetailsDiv.appendChild(h4);
    productDetailsDiv.appendChild(detailsDiv);
    productDetailsDiv.appendChild(productPreviewDiv);
    productDetailsDiv.appendChild(buttonDiv);
    
    mainContainer.appendChild(imageSectionDiv);
    mainContainer.appendChild(productDetailsDiv);

    // Inject the review section dynamically
    let reviewContainer = document.createElement('div');
    reviewContainer.id = 'reviewContainer';

    fetch('contentDetailsReviews.html')
        .then(response => response.text())
        .then(html => {
            reviewContainer.innerHTML = html;
        })
        .catch(error => console.error("Error loading reviews:", error));

    mainContainer.appendChild(reviewContainer);

    return mainContainer;
}

// Backend API Call
let httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function() {
    if (this.readyState === 4 && this.status == 200) {
        console.log('Connected!');
        let contentDetails = JSON.parse(this.responseText);
        productId = contentDetails.id;
        localStorage.setItem('productId', productId);
        dynamicContentDetails(contentDetails);
    } else {
        console.log('Not connected!');
    }
};
httpRequest.open('GET', `${window.config.URL}/api/products/` + id, true);
httpRequest.send();
