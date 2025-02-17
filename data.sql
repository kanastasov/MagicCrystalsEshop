create database magiccrystals;

CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    preview VARCHAR(500) NOT NULL,
    description TEXT,
    brand VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);


INSERT INTO products (id, name, preview, description,  brand, price) VALUES
(1, 'Men Navy Blue Solid Sweatshirt', 
 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/08a7b230-ee8f-46c0-a945-4e835a3c01c01541402833619-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-1.jpg',
 'Navy solid sweatshirt with patchwork, has a round neck, long sleeves, straight hem',
  'United Colors of Benetton', 259),

(2, 'Men Black MAMGP T7 Sweat Sporty Jacket', 
 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/5652346/2018/10/24/4b844846-eef8-4a1e-9f7b-6a1f6f0f7cbe1540354735457-Puma-Men-Black-MAMGP-T7-Sweat-Sporty-Jacket-4911540354733290-1.jpg',
 'Black jacket, has a mock collar, 2 pockets, zip closure, long sleeves, straight hem',
  'Puma', 799),

(3, 'Men Black Action Parkview Lifestyle Shoes', 
 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/1521201/2017/12/14/11513120970918-HRX-by-Hrithik-Roshan-Men-Black-Action-Parkview-Lifestyle-Shoes-2841513120970783-1.jpg',
 'Black sneakers, slip-on style, cushioned footbed, textured and patterned outsole',
  'HRX by Hrithik Roshan', 299),

(4, 'Women Black Solid Lightweight Leather Jacket', 
 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/11697496/2020/3/13/0e4381d9-051f-43bb-9513-2a76dbf11ad71584081805748-Women-Black-Solid-Lightweight-Leather-Jacket-5591584081804524-1.jpg',
 'Black solid leather jacket, has a zip closure, long sleeves, straight hem',
  'Zara', 899),

(5, 'Unisex Smart Watch Series 4', 
 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/10130998/2019/9/24/cce2160e-cbbd-4b0d-8a7e-91a9a6a376251569311819099-Apple-Unisex-Smart-Watches-8971569311817617-1.jpg',
 'Smart watch with fitness tracking, heart rate monitoring, and customizable watch faces',
  'Apple', 39999),

(6, 'Women Red Solid Shoulder Bag', 
 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/1327062/2016/8/18/11471138605258-Red-Handbag-1351471138605006-1.jpg',
 'Red handbag with dual shoulder straps, zip closure, spacious compartments',
  'Hidesign', 459),

(7, 'Men Blue Solid Slim Fit Casual Shirt', 
 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/345678/2019/5/12/abcd1234.jpg',
 'Blue slim-fit shirt with a spread collar, button placket, and long sleeves',
  'Allen Solly', 189),

(8, 'Men Grey Solid Hooded Sweatshirt', 
 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/789123/2020/7/15/efgh5678.jpg',
 'Grey hoodie with a kangaroo pocket, long sleeves, and ribbed cuffs',
  'Adidas', 279),

(9, 'Women Floral Printed Anarkali Kurta', 
 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/654321/2021/8/20/ijkl91011.jpg',
 'Pink floral-printed Anarkali kurta with round neck, three-quarter sleeves, and flared hem',
  'Biba', 349),

(10, 'Men White Running Shoes', 
 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/987654/2022/5/25/mnop1213.jpg',
 'White lace-up running shoes with cushioned footbed and rubber outsole',
  'Nike', 499);



CREATE TABLE images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_data LONGBLOB NOT NULL,
    mime_type VARCHAR(50) NOT NULL
);



-- Create the table
CREATE TABLE product_photos (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    preview VARCHAR(1024) NOT NULL,
    photos JSON NOT NULL,
    description TEXT,
    size JSON,
    isAccessory BOOLEAN,
    brand VARCHAR(255),
    price DECIMAL(10,2)
);

CREATE TABLE orders (
    id INT PRIMARY KEY,                          -- Provided order ID (from JSON "id": "1")
    createdAt TIMESTAMP(3) NOT NULL,             -- Stores the creation timestamp (ISO string converted)
    name VARCHAR(255) NOT NULL,                  -- The customer's name
    avatar VARCHAR(512) NOT NULL,                -- URL to the customer's avatar image
    email VARCHAR(255) NOT NULL,                 -- Customer's email address
    phone VARCHAR(50) NOT NULL,                  -- Customer's phone number
    extra TEXT                         -- Stores any additional data (from "[object Object]" key)
);


INSERT INTO orders (id, createdAt, name, avatar, email, phone, extra)
VALUES (
    1,
    '2022-05-14 16:06:22.590',
    'Allan Herman',
    'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/5.jpg',
    'allan.herman@example.com',
    '123-456-7890',
    ''
);

-- Insert the product data
INSERT INTO product_photos (id, name, preview, photos, description, size, isAccessory, brand, price)
VALUES (
    3,
    'Men Navy Blue Solid Sweatshirt',
    'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/08a7b230-ee8f-46c0-a945-4e835a3c01c01541402833619-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-1.jpg',
    '[
        "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/08a7b230-ee8f-46c0-a945-4e835a3c01c01541402833619-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-1.jpg",
        "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/efc3d5b9-1bb3-4427-af53-7acae7af98951541402833591-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-2.jpg",
        "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/c7e58861-3431-4189-9903-9880f5eebd181541402833566-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-3.jpg",
        "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/66490b64-32de-44b4-a6e4-fe36f1c040051541402833548-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-4.jpg",
        "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/957be784-7c5d-4e90-ab9f-0928015b22891541402833645-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-5.jpg"
    ]',
    'Navy solid sweatshirt with patchwork, has a round neck, long sleeves, straight hem',
    '[1,1,0,1,0]',
    false,
    'United Colors of Benetton',
   333
);


use magiccrystals;
select * from product_photos
product_photos

