create database magiccrystals;

use magiccrystals;

CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    preview VARCHAR(500) NOT NULL,
    description TEXT,
    is_accessory BOOLEAN NOT NULL,
    brand VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE product_photos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    photo_url VARCHAR(500) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

INSERT INTO products (id, name, preview, description, is_accessory, brand, price) VALUES
(1, 'Men Navy Blue Solid Sweatshirt', 
 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/08a7b230-ee8f-46c0-a945-4e835a3c01c01541402833619-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-1.jpg',
 'Navy solid sweatshirt with patchwork, has a round neck, long sleeves, straight hem',
 false, 'United Colors of Benetton', 2599),

(2, 'Men Black MAMGP T7 Sweat Sporty Jacket', 
 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/5652346/2018/10/24/4b844846-eef8-4a1e-9f7b-6a1f6f0f7cbe1540354735457-Puma-Men-Black-MAMGP-T7-Sweat-Sporty-Jacket-4911540354733290-1.jpg',
 'Black jacket, has a mock collar, 2 pockets, zip closure, long sleeves, straight hem',
 false, 'Puma', 7999),

(3, 'Men Black Action Parkview Lifestyle Shoes', 
 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/1521201/2017/12/14/11513120970918-HRX-by-Hrithik-Roshan-Men-Black-Action-Parkview-Lifestyle-Shoes-2841513120970783-1.jpg',
 'Black sneakers, slip-on style, cushioned footbed, textured and patterned outsole',
 false, 'HRX by Hrithik Roshan', 2999),

(4, 'Women Black Solid Lightweight Leather Jacket', 
 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/11697496/2020/3/13/0e4381d9-051f-43bb-9513-2a76dbf11ad71584081805748-Women-Black-Solid-Lightweight-Leather-Jacket-5591584081804524-1.jpg',
 'Black solid leather jacket, has a zip closure, long sleeves, straight hem',
 false, 'Zara', 8999),

(5, 'Unisex Smart Watch Series 4', 
 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/10130998/2019/9/24/cce2160e-cbbd-4b0d-8a7e-91a9a6a376251569311819099-Apple-Unisex-Smart-Watches-8971569311817617-1.jpg',
 'Smart watch with fitness tracking, heart rate monitoring, and customizable watch faces',
 true, 'Apple', 39999),

(6, 'Women Red Solid Shoulder Bag', 
 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/1327062/2016/8/18/11471138605258-Red-Handbag-1351471138605006-1.jpg',
 'Red handbag with dual shoulder straps, zip closure, spacious compartments',
 true, 'Hidesign', 4599),

(7, 'Men Blue Solid Slim Fit Casual Shirt', 
 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/345678/2019/5/12/abcd1234.jpg',
 'Blue slim-fit shirt with a spread collar, button placket, and long sleeves',
 false, 'Allen Solly', 1899),

(8, 'Men Grey Solid Hooded Sweatshirt', 
 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/789123/2020/7/15/efgh5678.jpg',
 'Grey hoodie with a kangaroo pocket, long sleeves, and ribbed cuffs',
 false, 'Adidas', 2799),

(9, 'Women Floral Printed Anarkali Kurta', 
 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/654321/2021/8/20/ijkl91011.jpg',
 'Pink floral-printed Anarkali kurta with round neck, three-quarter sleeves, and flared hem',
 false, 'Biba', 3499),

(10, 'Men White Running Shoes', 
 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/987654/2022/5/25/mnop1213.jpg',
 'White lace-up running shoes with cushioned footbed and rubber outsole',
 false, 'Nike', 4999);



INSERT INTO product_photos (product_id, photo_url) VALUES
(1, 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/08a7b230.jpg'),
(1, 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/efc3d5b9.jpg'),
(1, 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/c7e58861.jpg'),
(1, 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/66490b64.jpg'),

(2, 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/5652346/2018/10/24/4b844846.jpg'),
(2, 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/5652346/2018/10/24/bb123456.jpg'),

(3, 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/1521201/2017/12/14/115131209.jpg'),
(3, 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/1521201/2017/12/14/115131210.jpg'),

(4, 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/11697496/2020/3/13/0e4381d9.jpg'),

(5, 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/10130998/2019/9/24/cce2160e.jpg'),
(5, 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/10130998/2019/9/24/xyz98765.jpg'),

(6, 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/1327062/2016/8/18/11471138.jpg'),

(7, 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/345678/2019/5/12/abcd1234.jpg'),

(8, 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/789123/2020/7/15/efgh5678.jpg'),

(9, 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/654321/2021/8/20/ijkl91011.jpg'),

(10, 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/987654/2022/5/25/mnop1213.jpg');


