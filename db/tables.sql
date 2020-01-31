-- Entities

CREATE TABLE MenuItem(
    id VARCHAR(20) NOT NULL,
    name VARCHAR(40) NOT NULL,
    price INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Customer( 
    code VARCHAR(20) NOT NULL,
    f_name VARCHAR(40) NOT NULL,
    l_name VARCHAR(40) NOT NULL,
    age INT NOT NULL,
    mobile_phone DECIMAL(11) NOT NULL CHECK (mobile_phone > 1000000000),
    favorite VARCHAR(40),
    PRIMARY KEY (code)
);

CREATE TABLE Address( 
    customer VARCHAR(20) NOT NULL,
    home_phone DECIMAL(8) NOT NULL CHECK (home_phone > 10000000),
    content VARCHAR(60) NOT NULL,
    FOREIGN KEY (customer) REFERENCES Customer (code),
    PRIMARY KEY (content)
);

CREATE TABLE Delivery( 
    code VARCHAR(20) NOT NULL,
    f_name VARCHAR(20) NOT NULL,
    l_name VARCHAR(20) NOT NULL,
    mobile_phone DECIMAL(11) NOT NULL CHECK (mobile_phone > 1000000000),
    PRIMARY KEY (code)
);

CREATE TABLE Store(
    id VARCHAR(20) NOT NULL,
    name VARCHAR(40) NOT NULL,
    available INT NOT NULL CHECK (available IN (0, 1)),
    PRIMARY KEY (id)
);

CREATE TABLE GoodsItem(
    id VARCHAR(20) NOT NULL,
    name VARCHAR(40) NOT NULL,
    price INT NOT NULL,
    store VARCHAR(20) NOT NULL,
    FOREIGN KEY (store) REFERENCES Store(id),
    PRIMARY KEY (id)
);

-- Relations

CREATE TABLE StoreOrder(
    id VARCHAR(20) NOT NULL,
    goods_item_id VARCHAR(20) NOT NULL,
    price INT NOT NULL,
    date DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (goods_item_id) REFERENCES GoodsItem(id),
    PRIMARY KEY (id, goods_item_id)
);

CREATE TABLE CustomerOrder(
    id VARCHAR(20) NOT NULL,
    menu_item_id VARCHAR(20) NOT NULL,
    customer_id VARCHAR(20),
    delivery_id VARCHAR(20),
    address VARCHAR(60),
    price INT NOT NULL,
    date DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (menu_item_id) REFERENCES MenuItem(id),
    FOREIGN KEY (customer_id) REFERENCES Customer(code),
    FOREIGN KEY (delivery_id) REFERENCES Delivery(code),
    FOREIGN KEY (address) REFERENCES Address(content),
    PRIMARY KEY (id, menu_item_id)
);

INSERT INTO CustomerOrder(id, menu_item_id, customer_id, delivery_id, address, price) 
         VALUES (4, 'hwTOHmXX', '1742883922', 'NULL', 'NULL', 4000);

INSERT INTO CustomerOrder(id, menu_item_id, customer_id, delivery_id, address, price) 
         VALUES (3, 'bwsVncZT', NULL, NULL, NULL, 4000),
               (3, 'hwTOHmXX', NULL, NULL, NULL, 10000);

INSERT INTO CustomerOrder(id, menu_item_id, customer_id, delivery_id, address, price) 
    VALUES (2, 'bwsVncZT', '124129382', '241551428', 'تهران - پلاک ۲', 4000),
           (2, 'hwTOHmXX', '124129382', '241551428', 'تهران - پلاک ۲', 10000);

SELECT customerOrder.id as customer_order_id,
        menuItem.id as menu_item_id,
        menuItem.name as menu_item_name,
        customerOrder.price as price
        from CustomerOrder, menuItem
        WHERE customerOrder.menu_item_id = menuItem.id AND 
              customerOrder.customer_id IS NULL;

SELECT customerOrder.id as customer_order_id,
        menuItem.id as menu_item_id,
        menuItem.name as menu_item_name,
        customer.code as customer_id,
        customer.f_name as customer_f_name,
        customer.l_name as customer_l_name,
        customerOrder.delivery_id,
        address,
        customerOrder.price as price
        from CustomerOrder, menuItem, Customer
        WHERE customerOrder.menu_item_id = menuItem.id AND 
              customerOrder.customer_id = customer.code AND
              customerOrder.delivery_id IS NULL;

SELECT customerOrder.id as customer_order_id,
        menuItem.id as menu_item_id,
        menuItem.name as menu_item_name,
        customer.code as customer_id,
        customer.f_name as customer_f_name,
        customer.l_name as customer_l_name,
        delivery.code as delivery_id,
        delivery.f_name as delivery_f_name,
        delivery.l_name as delivery_l_name,
        address,
        customerOrder.price as price
        from CustomerOrder, menuItem, Customer, Delivery
        WHERE customerOrder.menu_item_id = menuItem.id AND 
              customerOrder.customer_id = customer.code AND
              customerOrder.delivery_id = delivery.code;

SELECT * from Customer, Address WHERE customer.code = address.customer
SELECT * from MenuItem;

SELECT customer FROM Address WHERE content = 'تهران - پلاک ۲'

CREATE TABLE Logs( 
    type VARCHAR(20) NOT NULL,
    log VARCHAR(100) NOT NULL,
    mod_table VARCHAR(30) NOT NULL,
    date DATE DEFAULT (CURRENT_DATE)
);