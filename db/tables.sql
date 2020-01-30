-- Entities

CREATE TABLE MenuItem(
    id VARCHAR(20) NOT NULL,
    name VARCHAR(40) NOT NULL,
    price INT NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO MenuItem(id, name, price)
VALUES (1, 'چلو کباب', 2000);
CREATE TABLE Customer( 
    code VARCHAR(20) NOT NULL,
    f_name VARCHAR(40) NOT NULL,
    l_name VARCHAR(40) NOT NULL,
    age INT NOT NULL,
    mobile_phone VARCHAR(10) NOT NULL,
    PRIMARY KEY (code)
);

CREATE TABLE Address( 
    customer VARCHAR(20) NOT NULL,
    home_phone VARCHAR(10) NOT NULL,
    content VARCHAR(60) NOT NULL,
    FOREIGN KEY (customer) REFERENCES Customer (code),
    PRIMARY KEY (content)
);

-- CREATE TABLE Factor( 
--     id VARCHAR(20) NOT NULL,
--     address VARCHAR(60),
--     name VARCHAR(20),
--     date DATETIME DEFAULT CURRENT_TIMESTAMP,
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE Delivery( 
--     code VARCHAR(20) NOT NULL,
--     f_name VARCHAR(20) NOT NULL,
--     l_name VARCHAR(20) NOT NULL,
--     mobile_phone VARCHAR(20) NOT NULL,
--     PRIMARY KEY (code)
-- );

-- CREATE TABLE GoodsItem(
--     id VARCHAR(20) NOT NULL,
--     name VARCHAR(40) NOT NULL,
--     price INT NOT NULL
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE GoodsFactor( 
--     id VARCHAR(20) NOT NULL,
--     store VARCHAR(20) NOT NULL,
--     FOREIGN KEY (store) REFERENCES Store(id),
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE Store(
--     id VARCHAR(20) NOT NULL,
--     name VARCHAR(40) NOT NULL,
--     PRIMARY KEY (id)
-- );

-- -- Relations

-- CREATE TABLE CustomerOrders(
--     factor_id VARCHAR(20),
--     menu_item_id VARCHAR(20),
--     customer_id VARCHAR(20),
--     price INT,
--     FOREIGN KEY (factor_id) REFERENCES Factor(id),
--     FOREIGN KEY (menu_item_id) REFERENCES MenuItem(id),
--     FOREIGN KEY (customer_id) REFERENCES Customer(code),
--     PRIMARY KEY (factor_id, menu_item_id)
-- );

-- CREATE TABLE StoreOrders(
--     factor_id VARCHAR(20),
--     goods_item_id VARCHAR(20),
--     price INT,
--     FOREIGN KEY (factor_id) REFERENCES GoodsFactor(id),
--     FOREIGN KEY (goods_item_id) REFERENCES GoodsItem(id),
--     PRIMARY KEY (factor_id,goods_item_id)
-- );
