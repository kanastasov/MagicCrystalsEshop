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

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	description TEXT,
    price DECIMAL(10, 2) NOT NULL,
	type VARCHAR(255) NOT NULL,
    image_data LONGBLOB NOT NULL,
    mime_type VARCHAR(50) NOT NULL
); 


CREATE TABLE `crystals` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `price` DECIMAL(10,2) NOT NULL,
  `type` VARCHAR(255) NOT NULL,
  `image_url` VARCHAR(500) NOT NULL,  -- Stores GitHub image link instead of binary data
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/1.jpg

CREATE TABLE `crystalsPreview` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `type` VARCHAR(255) NOT NULL,
  `image_url` VARCHAR(500) NOT NULL,  -- Stores GitHub image link instead of binary data
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `crystalsPreview` (`name`, `type`, `image_url`) 
VALUES 
  ('Необработени Скъпоценни и Полускъпоценни Камъни',  'Необработен', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/1Preview.png'),

  ('Друзи и Геоди',  'Необработен', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/2Preview.png');


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


INSERT INTO `crystalsPreview` (`name`, `type`, `image_url`) 
VALUES 
  ('Полирани Камъни',  'Полирани Камъни', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/3Preview.png');
   
INSERT INTO `crystals` (`name`, `description`, `price`, `type`, `image_url`) 
VALUES 
  ('Лабрадорит сърца и камъче', 'Естествен полиран лабрадорит с прекрасна иризация. Лабрадоритът се счита за изключително духовен камък, особено полезен за хора, които са склонни да работят прекомерно. Помага на индивида да си възвърне енергията, като същевременно помага на тялото и духа да се излекуват. В метафизичния свят лабрадоритът се смята за един от най-мощните защитници', 35, 'Полирани Камъни', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/3%20Полирани%20Камъни/1.jpg'),

  ('Сърца розов кварц', 'Естествен полиран лабрадорит с прекрасна иризация. Лабрадоритът се счита за изключително духовен камък, особено полезен за хора, които са склонни да работят прекомерно. Помага на индивида да си възвърне енергията, като същевременно помага на тялото и духа да се излекуват. В метафизичния свят лабрадоритът се смята за един от най-мощните защитници', 35, 'Полирани Камъни', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/3%20Полирани%20Камъни/2.jpg'),
   
  ('Рози', 'Розов опал,Тигорво око ,Яспис,цитрин,Розов кварц ,Оникс', 49, 'Полирани Камъни', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/3%20Полирани%20Камъни/3.jpg'),
   
     ('Рози', 'Розов опал,Тигорво око ,Яспис,цитрин,Розов кварц ,Оникс', 49, 'Полирани Камъни', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/3%20Полирани%20Камъни/4.jpg'),
   
     ('Метличка', 'Метличка 39 лв с камък опалит и аметист. Метлата е символ на домашния уют и семейното щастие и играе основна роля при защитата му.', 39, 'Полирани Камъни', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/3%20Полирани%20Камъни/5.jpg'),
   
     ('Метличка', 'Метличка с камък опалит и аметист
Метлата е символ на домашния уют и семейното щастие и играе основна роля при защитата му.', 45, 'Полирани Камъни', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/3%20Полирани%20Камъни/6.jpg'),
   
   
     ('Метличка', 'Метличка с камък опалит и аметист
Метлата е символ на домашния уют и семейното щастие и играе основна роля при защитата му.', 62, 'Полирани Камъни', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/3%20Полирани%20Камъни/6.2.jpg'),
   
     ('Олгонит Метатрон', 'Балансира ума и намалява нивата на емоционален стрес. Създаден е да събира в себе си негатива от околното пространство и да го трансформира в чиста и позитивна енергия за своя притежател, в името на неговото най-висше благо и добро – За да има пълната сила на Светлината в Живота си!', 62, 'Полирани Камъни', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/3%20Полирани%20Камъни/7.jpg'),
   
   
     ('Олгонит Метатрон', 'Балансира ума и намалява нивата на емоционален стрес. Създаден е да събира в себе си негатива от околното пространство и да го трансформира в чиста и позитивна енергия за своя притежател, в името на неговото най-висше благо и добро – За да има пълната сила на Светлината в Живота си!', 62, 'Полирани Камъни', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/3%20Полирани%20Камъни/8.jpg'),
   
        ('Олгонит Метатрон', 'Балансира ума и намалява нивата на емоционален стрес. Създаден е да събира в себе си негатива от околното пространство и да го трансформира в чиста и позитивна енергия за своя притежател, в името на неговото най-висше благо и добро – За да има пълната сила на Светлината в Живота си!', 52, 'Полирани Камъни', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/3%20Полирани%20Камъни/9.jpg'),
   
     ('Пирамиди оргонит', 'Аметист, Цитрин, яспис,тигрово око,авантюрин,цитрин,лазурит и др', 20, 'Полирани Камъни', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/3%20Полирани%20Камъни/10.jpg'),

   
     ('Китайски монети 25лв благополучие и просперитет', 'Тези амулети са създадени според принципите на Фън Шуй и се използват, за да внесат късмет, просперитет и баланс в живота на тези, които ги използват.', 25, 'Полирани Камъни', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/3%20Полирани%20Камъни/11.jpg'),

   
     ('Дръвчета', 'Тези амулети са създадени според принципите на Фън Шуй и се използват, за да внесат късмет, просперитет и баланс в живота на тези, които ги използват.', 32, 'Полирани Камъни', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/3%20Полирани%20Камъни/12.jpg'),
   
      
     ('Дръвчета', 'Тези амулети са създадени според принципите на Фън Шуй и се използват, за да внесат късмет, просперитет и баланс в живота на тези, които ги използват.', 32, 'Полирани Камъни', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/3%20Полирани%20Камъни/13.jpg');