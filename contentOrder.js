document.addEventListener("DOMContentLoaded", function () {
  let contentTitle;

  console.log(document.cookie);

  // Function to dynamically create HTML for each order and its items
  function dynamicOrderSection(orderData) {
    // Create the outer div for the order box
    let orderBoxDiv = document.createElement("div");
    orderBoxDiv.classList.add("order-box");

    // Create the order details section
    let orderDetailsDiv = document.createElement("div");
    orderDetailsDiv.classList.add("order-details");

    // Order information (user name, email, phone, total amount)
    let orderInfo = `
      <h3>Order ID: ${orderData.order.id}</h3>
      <p><strong>User:</strong> ${orderData.order.user_name}</p>
      <p><strong>Email:</strong> ${orderData.order.email}</p>
      <p><strong>Phone:</strong> ${orderData.order.user_phone}</p>
      <p><strong>Total Amount:</strong> ${orderData.order.total_amount} Лева</p>
      <p><strong>Order Date:</strong> ${orderData.order.order_date}</p>
    `;
    orderDetailsDiv.innerHTML = orderInfo;

    // Create the items section for this order
    let itemsListDiv = document.createElement("div");
    itemsListDiv.classList.add("order-items");

    orderData.items.forEach(item => {
      let itemDiv = document.createElement("div");
      itemDiv.classList.add("order-item");

      // Item information (name, price, quantity)
      let itemInfo = `
        <h4>${item.product_name}</h4>
        <p><strong>Price:</strong> ${item.product_price} Лева</p>
        <p><strong>Quantity:</strong> ${item.quantity}</p>
      `;
      itemDiv.innerHTML = itemInfo;
      itemsListDiv.appendChild(itemDiv);
    });

    // Append order details and items to the orderBoxDiv
    orderBoxDiv.appendChild(orderDetailsDiv);
    orderBoxDiv.appendChild(itemsListDiv);

    return orderBoxDiv;
  }

  // Function to display all orders
  function displayOrders(orders) {
    let ordersContainer = document.getElementById("ordersContainer");

    if (ordersContainer) {
      orders.forEach(orderData => {
        let orderSection = dynamicOrderSection(orderData);
        ordersContainer.appendChild(orderSection);
      });
    } else {
      console.error("ordersContainer not found!");
    }
  }

  // Fetch orders from the backend
  fetch(`${window.config.URL || 'https://magiccrystals.bg'}/api/orders`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      return response.json();
    })
    .then(orders => {
      contentTitle = orders;

      // Display orders
      displayOrders(orders);
    })
    .catch(error => console.error("Error fetching orders:", error));
});
