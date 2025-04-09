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


INSERT INTO `crystalspreview` (`name`, `type`, `image_url`) 
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


---------------------------------------------------------------------------------------------------------

INSERT INTO `crystalspreview` (`name`, `type`, `image_url`) 
VALUES 
  ('Езотерични продукти',  'Езотерични продукти', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/4Preview.png');
   
   
      INSERT INTO `crystals` (`name`, `description`, `price`, `type`, `image_url`) 
VALUES 
  ('Скандинавски руни за гадаене от дърво', 'Този комплект руни за гадаене съдържа 25 броя дървени шайби с руни в памучна торбичка.
Дървени руни ръчна изработка с добавено тълкувание за всяка руна на български език.
Руните са сред най-старите азбуки, използвани предимно  от скандинавските народи, често като гадаене и предсказание за вземане на житейски решения и насоки.
Руните се появяват като символи  доста преди вековете на викингите, макар днес да са синоним на т. нар. Епоха на викингите88 лв', 88, 'Езотерични продукти', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/4%20Екзотерични/1.jpg'),
   
     ('Дървени дъски за гадаене  с махало', 'Този комплект руни за гадаене съдържа 25 броя дървени шайби с руни в памучна торбичка.
Дървени руни ръчна изработка с добавено тълкувание за всяка руна на български език.
Руните са сред най-старите азбуки, използвани предимно  от скандинавските народи, често като гадаене и предсказание за вземане на житейски решения и насоки.
Руните се появяват като символи  доста преди вековете на викингите, макар днес да са синоним на т. нар. Епоха на викингите', 38, 'Езотерични продукти', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/4%20Екзотерични/2.jpg'),
   
     ('Дървени дъски за гадаене  с махало', 'Този комплект руни за гадаене съдържа 25 броя дървени шайби с руни в памучна торбичка.
Дървени руни ръчна изработка с добавено тълкувание за всяка руна на български език.
Руните са сред най-старите азбуки, използвани предимно  от скандинавските народи, често като гадаене и предсказание за вземане на житейски решения и насоки.
Руните се появяват като символи  доста преди вековете на викингите, макар днес да са синоним на т. нар. Епоха на викингите', 58, 'Езотерични продукти', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/4%20Екзотерични/3.jpg'),
   
     ('Дървени дъски за гадаене  с махало', 'Този комплект руни за гадаене съдържа 25 броя дървени шайби с руни в памучна торбичка.
Дървени руни ръчна изработка с добавено тълкувание за всяка руна на български език.
Руните са сред най-старите азбуки, използвани предимно  от скандинавските народи, често като гадаене и предсказание за вземане на житейски решения и насоки.
Руните се появяват като символи  доста преди вековете на викингите, макар днес да са синоним на т. нар. Епоха на викингите 52 -72лв', 52, 'Езотерични продукти', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/4%20Екзотерични/4.jpg'),
   
        ('Комплект колие и гривна розов опал със сребърна закопчалка', 'Комплект колие и гривна розов опал 89лв със сребърна закопчалка', 89, 'Езотерични продукти', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/4%20Екзотерични/5.jpg');
      

INSERT INTO `crystalspreview` (`name`, `type`, `image_url`) 
VALUES 
  ('Бижута',  'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15Preview.png');
   
   
         INSERT INTO `crystals` (`name`, `description`, `price`, `type`, `image_url`) 
VALUES 
   
   
        ('Комплект колие и гривна розов опал със сребърна закопчалка', 'Комплект колие и гривна розов опал 89лв със сребърна закопчалка', 89, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/5.jpg');
   
      
        ('Благороден бял опал със сребърна закопчалка', 'Благороден бял опал със сребърна закопчалка  Произход Етиопия със сребърна закопчалка', 148, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/6.jpg'),
   
   
           ('Черен благороден опал със сребърна', 'Черен благороден опал със сребърна', 154, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/7.jpg'),
   
           ('Комплект гривна и гердан Лазурит', 'Комплект гривна и гердан Лазурит 120лв като талисман прогонва нещастията,носи надежда,здраве и благоденствие. Зодии: Дева ,стрелец козирог със сребърна закопчалка', 120, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/8.jpg'),
   
   
   
           ('Тигрово око', 'Тигрово око 120лв. Зодии: Дева ,стрелец козирог', 120, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/9.jpg'),
   
           ('Чароит', 'Камъкът на духа и духовната проницателност.Той преобразува негативната енергия в лечебна,дава стремеж,жизненост и е способен да намали стреса и безпокойствието. Това е камъкът на трансформацията със сребърна закопчалка', 120, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/10.jpg'),
   
           ('Малинов кварц', 'Малинов кварц', 80, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/11.jpg'),
   
   
   
   
   
           ('Тюркоаз камъкът на благоденствието', 'Тюркоаз камъкът на благоденствието,силно  пречистващ и предпазващ от зли очи и негативна енергия.Носи спокойствие на духа и добро физическо състояние. Зодии ,риби скорпион, стрелец,водолей овен, със сребърна закопчалка', 120, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/12.jpg'),
   
           ('Цитрин', 'Цитрин. Зодии: Дева ,стрелец козирог, със сребърна закопчалка', 80, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/13.jpg'),
   
           ('Содалит', 'Содалит. Зодии: Дева ,стрелец козирог, със сребърна закопчалка', 80, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/14.jpg'),
   
           ('Унакит', 'Благороден Унакит. Зодии: Дева ,стрелец козирог, със сребърна закопчалка', 85, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/15.jpg'),
   
   
   
   
   
              ('Аместит', 'Аместит. Зодии: Дева ,стрелец козирог, със сребърна закопчалка', 85, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/16.jpg'),
   
   
           ('Тюркоаз', 'Благороден Тюркоаз. Зодии: Дева ,стрелец козирог, със сребърна закопчалка', 85, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/17.jpg'),
   
   
           ('Унакит', 'Благороден Унакит. Зодии: Дева ,стрелец козирог, със сребърна закопчалка', 85, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/18.jpg'),
   
                 ('Черен оникс', 'Черен оникс. Зодии: Дева ,стрелец козирог, със сребърна закопчалка', 85, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/19.jpg'),
   
   
           ('Рубин в циозит', 'Благороден Рубин в циозит. Зодии: Дева ,стрелец козирог, със сребърна закопчалка', 85, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/20.jpg'),
   
   
           ('Опушен кварц', 'Благороден Опушен кварц. Зодии: Дева ,стрелец козирог, със сребърна закопчалка', 85, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/21.jpg'),
   
   
   
		('Ахат', 'Ахат. Зодии: Дева ,стрелец козирог, със сребърна закопчалка', 85, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/22.jpg'),
   
   
           ('Аквамарин', 'Дарява спокойствие на тези който го носят ,помага за намаляване на стреса и постигане на вътрешен мир.Изостря интуицията и проницателността. Скорпион ,Овен теелец близнаци везни водолей риби, със сребърна закопчалка', 85, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/23.jpg'),
   
   
           ('Чароит', 'Дарява спокойствие на тези който го носят ,помага за намаляване на стреса и постигане на вътрешен мир.Изостря интуицията и проницателността. Скорпион ,Овен теелец близнаци везни водолей риби, със сребърна закопчалка', 85, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/24.jpg'),
   
   
   
		('Авантюрин', 'Авантюрин. Зодии: Дева ,стрелец козирог, със сребърна закопчалка', 80, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/25.jpg'),
   
   
           ('Амазонит гердан', 'Дарява спокойствие на тези който го носят ,помага за намаляване на стреса и постигане на вътрешен мир.Изостря интуицията и проницателността. Скорпион ,Овен теелец близнаци везни водолей риби, със сребърна закопчалка', 50, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/26.jpg'),
   
   
           ('Лабрадорит гердан', 'Дарява спокойствие на тези който го носят ,помага за намаляване на стреса и постигане на вътрешен мир.Изостря интуицията и проницателността. Скорпион ,Овен теелец близнаци везни водолей риби, със сребърна закопчалка', 50, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/27.jpg'),
   
		('Планински кристал гердан', 'Планински кристал гердан. Зодии: Дева ,стрелец козирог, със сребърна закопчалка', 45, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/28.jpg'),
   
           ('Опал  гердан', 'Дарява спокойствие на тези който го носят ,помага за намаляване на стреса и постигане на вътрешен мир.Изостря интуицията и проницателността. Скорпион ,Овен теелец близнаци везни водолей риби, със сребърна закопчалка', 45, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/29.jpg'),
   
           ('Авантюрин гердан', 'Дарява спокойствие на тези който го носят ,помага за намаляване на стреса и постигане на вътрешен мир.Изостря интуицията и проницателността. Скорпион ,Овен теелец близнаци везни водолей риби, със сребърна закопчалка', 45, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/30.jpg'),
   
   
      
           ('Гердан хематит', 'Дарява спокойствие на тези който го носят ,помага за намаляване на стреса и постигане на вътрешен мир.Изостря интуицията и проницателността. Скорпион ,Овен теелец близнаци везни водолей риби, със сребърна закопчалка', 55, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/31.jpg'),   
   
           ('Цветен флуорит', 'Дарява спокойствие на тези който го носят ,помага за намаляване на стреса и постигане на вътрешен мир.Изостря интуицията и проницателността. Скорпион ,Овен теелец близнаци везни водолей риби, със сребърна закопчалка', 55, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/32.jpg');

--         INSERT INTO `crystals` (`name`, `description`, `price`, `type`, `image_url`) 
-- VALUES 
         
           ('Келтски възел', 'Келтски възел 85лв Амулет за защита японски самурай 85лв', 85, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/32.jpg'),
   
              ('Амулет Сан Бенито', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 94, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/33.jpg'),
   
                   ('Огнена змия', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 98, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/34.jpg'),
   
           ('Амулет Келтски възел вълк', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 105, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/35.jpg'),
   
           ('Лъв', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 38, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/36.jpg'),
   
           ('Мъжки гердан/колие Черен оникс,Тигорово око и хематит', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.',143, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/37.jpg'),
   
           ('Лава ,тигорово око с глави на Буда', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 126, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/38.jpg'),
   
           ('Снежен обсидиан с листо', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 128, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/39.jpg'),
            
              ('Черна лава, мед и снежен обсидиан', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 87, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/40.jpg'),
   
       ('Елегантни висулки светещи камък нефрит  вграден в метал със златист оттенък, който е изрязан с малки китайски дракони.', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 45, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/41.jpg'),
   
      ('Движеща се месингова драконова фигурка със златисто покритие', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 43, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/42.jpg'),
   
      ('Луксозна стъклена парфюмна бутилка', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 52, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/43.jpg'),
   
      ('Амулет защита с различни видове камък: аметист, цитрин,цветен флоурит и лапис лазули', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 63, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/44.jpg'),
   
      ('Кристални ябълки. Аметист, Опал, розов кварц ,авантюрин и планински кристал', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 35, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/45.jpg'),
   
      ('Фигури на Ангел пазител тиговро око,мялахит,далматински яспис ,опал, планински кристал и др.', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 30, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/46.jpg'),
   
      ('Фигури жаби  малахит,авантюрин, тигорово око,тюркоаз, розов кварц,опал,планински кристал и други', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 28, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/47.jpg'),
   
         ('Костенурки аметист,червен яспис,лазурит и др', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 28, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/48.jpg'),
   
      ('Бухалче авантюрин, лапис лазули, аметист и др', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 43, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/49.jpg'),
   
      ('Стъклени бутилки дозатор за парфюм,етерични масла с камъни аметист,тюроказ,тигрово око,авантюрин, карнеол,содалит и др', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 20, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/50.jpg'),
   
       ('7те чакри дървото на живота с медна тел с кристали аметист, цитрин, Тюркоаз, авантюрин, содалит, карнеол и яспис', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 25, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/51.jpg'),
   
       ('дърво на късмета с пари с жълт и розов кварц', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 58, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/52.jpg'),
   
       ('Обици различни видове с тигрово око,авантюрин, малахит, тюркоаз, розов кварц, опалит и др', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 58, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/53.jpg'),
   
       ('Обици различни видове с тигрово око,авантюрин, малахит, тюркоаз, розов кварц, опалит и др', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 58, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/54.jpg'),
   
       ('Обици различни видове с тигрово око,авантюрин, малахит, тюркоаз, розов кварц, опалит и др', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 58, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/55.jpg');
   
   

         INSERT INTO `crystals` (`name`, `description`, `price`, `type`, `image_url`) 
VALUES 
   
   
        ('Пепелници оникс', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 40, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/81.jpg'),
   
        ('Гривни', 'Гривни 30лв,40,45-48лв зависи какъв камък тигрово око,лабрадорит, содалит,тюркоаз,аметист,цитрин,планински кристал,ахат,розов кварц ,мокаид,родонит,малинов кварц,лазурит,опал,карнеол,авантюрин и др.', 30, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/82.jpg'),
   
      
              ('Гривни', 'Гривни 30лв,40,45-48лв зависи какъв камък тигрово око,лабрадорит, содалит,тюркоаз,аметист,цитрин,планински кристал,ахат,розов кварц ,мокаид,родонит,малинов кварц,лазурит,опал,карнеол,авантюрин и др.', 30, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/83.jpg'),

           ('Гривни', 'Гривни 30лв,40,45-48лв зависи какъв камък тигрово око,лабрадорит, содалит,тюркоаз,аметист,цитрин,планински кристал,ахат,розов кварц ,мокаид,родонит,малинов кварц,лазурит,опал,карнеол,авантюрин и др.', 30, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/84.jpg'),



        ('Пирамиди тигрово', 'Пирамиди тигрово 42лв  око,аметист 36лв и лапис лазули 42лв', 42, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/56.jpg'),




        ('Комплект гривна,гердан и обеци 48лв Аметист', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 48, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/57.jpg'),




        ('Тюркоаз', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 48, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/58.jpg'),



        ('Лазурит', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 48, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/59.jpg'),


        ('Опалит', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 48, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/60.jpg'),


        ('Тигрово око', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 48, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/61.jpg'),


        ('Малахит', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 48, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/62.jpg'),


        ('Седеф', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 48, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/63.jpg'),

   
        ('Розов кварц', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 48, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/64.jpg'),


   
        ('Карнеол', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 48, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/65.jpg'),

   
        ('Слънчев камък', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 48, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/66.jpg'),

   
    ('Слънчев камък', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 48, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/68.jpg'),

       ('Гривна бисмут', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 48, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/69.jpg'),




        ('Гривна кианит', 'Гривна кианит 100лв камъкът ,който не натрупва отрицателни енергии,носи спокойствие и релаксация. Дарява с вдъхновение и успех.', 100, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/70.jpg'),

   ('Чароит гривна', 'Чароит гривна 100лв камъкът на духа и духовната проницателност.Той преобразува негативната енергия в лечебна,дава стремеж, жизненост и е способен да намали стреса и безпокойството.Това е камъкът на трансформацията', 100, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/71.jpg'),

      ('Аквамарин камъкът', '100лв аквамарин камъкът  дарява спокойствие,помага за намаляване на стреса и постигане на вътрешен мир.', 100, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/72.jpg'),

      ('Черен турмалин', '100лв Черен турмалин - той е един от най-мощните кристали за защита.Има способността да пречиства вашата енергия, да предпазва от отрицателни влияния.Подходящ за всички зодии.', 100, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/73.jpg'),

   ('Гривна с многоцветни мъниста', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 30, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/74.jpg'),

  ('Гривна мъниста', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 30, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/75.jpg'),


   ('Висулка от аметист', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 25, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/76.jpg'),

      ('Гердан Балтийски Кехлибар', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 45, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/77.jpg'),

      ('Гердан Балтийски Кехлибар', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 45, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/78.jpg'),

   ('Гердан Кехлибар', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 40, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/79.jpg'),

      ('Детски гердан кехлибар', 'Открийте изящни, ръчно изработени бижута, които съчетават елегантност, качество и неподражаем стил за всеки повод.', 35, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/80.jpg');


CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `crystal_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `rating` int NOT NULL,
  `review_text` text COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `reviews_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
SELECT * FROM magiccrystals.admins;


      INSERT INTO `crystals` (`name`, `description`, `price`, `type`, `image_url`) 
VALUES 
  ('Таро карти', 'Таро карти 45лв', 45, 'Езотерични продукти', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/4%20Екзотерични/5.jpg'),
   
     ('Таро оракулски карти за гадаене', 'Таро оракулски карти за гадаене 45лв', 45, 'Езотерични продукти', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/4%20Екзотерични/6.jpg'),
   
   
     ('Телепатично Оракулно Тесте', 'Телепатично Оракулно Тесте с 56 Карти за Яснота и Гадаене и таро карти Градината на вещицата Тесте от 78 карти', 48, 'Езотерични продукти', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/4%20Екзотерични/7.jpg'),
   
     ('Карти руни', 'Карти руни 48лв', 48, 'Езотерични продукти', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/4%20Екзотерични/8.jpg'),
   
   
     ('Романтични ангелски оракулски карти', 'Романтични ангелски оракулски карти 44 карти подходящи и за начинаещи', 55, 'Езотерични продукти', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/4%20Екзотерични/9.jpg');
   
   
         INSERT INTO `crystals` (`name`, `description`, `price`, `type`, `image_url`) 
VALUES 
  ('Амулет за изобилие на дома', 'Амулет за изобилие на дома 55лв', 55, 'Друзи', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/2%20Друзи/40.jpg'),
   
     ('Кристални висулки', 'Кристални висулки 28лв различни видове тюркоаз,малахит,авантюрин, опал,аквамарин и др.', 28, 'Друзи', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/2%20Друзи/41.jpg'),
   
     ('Висулки различни видове', 'Висулки различни видове 20лв', 20, 'Друзи', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/2%20Друзи/42.jpg'),
   
     ('Висулки аметист', 'Висулки аметист 20 лв', 20, 'Друзи', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/2%20Друзи/43.jpg'),
   
     ('Бисмут', 'Бисмут 28, 32, 45, 80лв', 28, 'Друзи', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/2%20Друзи/44.jpg');
   

               INSERT INTO `crystals` (`name`, `description`, `price`, `type`, `image_url`) 
VALUES 
   
   
        ('Гривни черен обсидиан и лава', 'Гривни черен обсидиан и лава с 7те камъка чакри 30лв', 30, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/85.jpg'),
   
     ('Ключодържател с котка на късмета и монети', '18лв Ключодържател с котка на късмета и монети на 5те императора', 18, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/85.jpg');

   INSERT INTO `crystals` (`name`, `description`, `price`, `type`, `image_url`) 
VALUES 
   
   
        ('Елегантна мъжка гривна с тигрово око и хематит с магнитно закопчаване', 'Елегантна мъжка гривна с тигрово око и хематит с магнитно закопчаване 85лв', 85, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/87.jpg'),
   
   
        ('Елегантна гривна 2 бр от камък снежен обсидиан', 'Елегантна гривна 2 бр от камък снежен обсидиан и лава 85лв 1 бр.35лв', 35, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/88.jpg'),
   
   
        ('Гривни снежен обсидиан за добра съдба и богатство, черен абсидиан с лъвска глава', 'Гривни снежен обсидиан за добра съдба и богатство, черен абсидиан с лъвска глава', 85, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/89.jpg'),
   
   
        ('Стилни мъжки гривни тиговро око,лава,черен матов камък', 'Стилни мъжки гривни тиговро око,лава,черен матов камък', 58, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/90.jpg'),
   
   
        ('Мъжки гривни с магнитно закопчаване със снежен и  черен обсидиан, лава', 'Мъжки гривни с магнитно закопчаване със снежен и  черен обсидиан, лава', 65, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/91.jpg'),
   
   
        ('Унисекс гривна за Богатство с черен обсидиан и лава със сребърни и златисти акценти', 'Унисекс гривна за Богатство с черен обсидиан и лава със сребърни и златисти акценти', 62, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/92.jpg'),
   
   
        ('Унисекс гривна за Богатство с черен обсидиан и лава със сребърни и златисти акценти', 'Унисекс гривна за Богатство с черен обсидиан и лава със сребърни и златисти акценти', 48, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/93.jpg'),
   
   
        ('Елегантна мъжка гривна зелен малахит и хематит', 'Елегантна мъжка гривна зелен малахит и хематит', 76, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/94.jpg'),
   
   
        ('Унисекс гривна от малахит, лава и златни елементи', 'Унисекс гривна от малахит, лава и златни елементи', 73, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/95.jpg'),
   
   
        ('Мъжка гривна с лилав камък, лава и дървени акценти', 'Мъжка гривна с лилав камък, лава и дървени акценти', 52, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/96.jpg'),
   
   
   
     ('Мъжка гривна с лилав камък, лава и дървени акценти', 'Мъжка гривна с лилав камък, лава и дървени акценти', 54, 'бижута', 
   'https://cdn.jsdelivr.net/gh/kanastasov/MagicCrystalsEshop@master/img/15бижута/97.jpg');