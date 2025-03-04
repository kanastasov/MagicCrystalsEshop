create database magiccrystals;


GRANT FILE ON *.* TO 'root'@'localhost';
FLUSH PRIVILEGES;

SHOW VARIABLES LIKE 'secure_file_priv';

INSERT INTO products (id, name, preview, mime_type, description, brand, price)
VALUES
(1, 'Кристали', LOAD_FILE('C:\Program Files\MySQL\MySQL Server 8.0\Uploads\cr1.jpg'), 'image/jpeg', 'Кристали.', 'Използват се за успокоение', 99.99),
(2, 'Кристали', LOAD_FILE('C:\Program Files\MySQL\MySQL Server 8.0\Uploads\cr3.jpg'), 'image/jpeg', 'Минерали', 'Добър за подарък', 149.99);


SELECT LOAD_FILE('C:\Users\kirep\OneDrive\Desktop\DeniMagicCrystals\E-CommerceWebsite\img\cr1.jpg');


SELECT LOAD_FILE('C:\Program Files\MySQL\MySQL Server 8.0\Uploads\cr1.jpg');


SHOW VARIABLES LIKE 'secure_file_priv';

SHOW GRANTS FOR 'root'@'localhost';
GRANT FILE ON *.* TO 'root'@'localhost';
FLUSH PRIVILEGES;

SELECT LOAD_FILE('D:/cr1.jpg');



SELECT user, host FROM mysql.user;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	description TEXT,
    price DECIMAL(10, 2) NOT NULL,
	type VARCHAR(255) NOT NULL,
    image_data LONGBLOB NOT NULL,
    mime_type VARCHAR(50) NOT NULL
); q


CREATE TABLE preview (
    id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	description TEXT,
	type VARCHAR(255) NOT NULL,
    image_data LONGBLOB NOT NULL,
    mime_type VARCHAR(50) NOT NULL
);

ALTER DATABASE magiccrystals CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

select * from orders
select * from order_items


CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255),
    email VARCHAR(255),
    user_phone VARCHAR(20),
    total_amount DECIMAL(10, 2),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,               -- Foreign key to the orders table
    product_name VARCHAR(255),
    product_price DECIMAL(10, 2),
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO admins (id, username, password) VALUES
(1, 'admin', 'MagicCrystals57?'
 )
UPDATE  magiccrystals.preview 
set name = 'Шипове и Обелиски',
type = 'Шипове и Обелиски'
where id = 5;

select * from magiccrystals.products where id = 1

select * from magiccrystals.preview where id = 5

UPDATE magiccrystals.products
SET price = 38
WHERE id = 123;

delete  from magiccrystals.preview where id = 9;
SELECT * FROM products where id = 39;

SET SQL_SAFE_UPDATES = 0;
DELETE FROM products WHERE type = 'минерал';

DELETE FROM orders WHERE id > 0 
DELETE FROM order_items WHERE id > 0 


DELETE FROM products WHERE id = 139
SELECT * FROM products WHERE id = 73;

UPDATE products 
SET price = 18 
WHERE id = 73;

INSERT INTO admins (username, password) 
VALUES ('admin', 'admin');


select * from preview
use magiccrystals;
select * from products where type = 'Сувенири от Полускъпоценни Камъни'

SELECT * FROM admins WHERE username = 'admin' AND password = 'admin'