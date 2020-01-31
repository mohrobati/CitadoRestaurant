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
    goods_item_name VARCHAR(20) NOT NULL,
    store VARCHAR(20) NOT NULL,
    price INT NOT NULL,
    date DATE DEFAULT (CURRENT_DATE),
    PRIMARY KEY (id, goods_item_name)
);

CREATE TABLE CustomerOrder(
    id VARCHAR(20) NOT NULL,
    menu_item_name VARCHAR(60) NOT NULL,
    customer_name VARCHAR(20),
    delivery_name VARCHAR(20),
    address VARCHAR(60),
    price INT NOT NULL,
    date DATE DEFAULT (CURRENT_DATE),
    PRIMARY KEY (id, menu_item_name)
);

CREATE TABLE Logs( 
    type VARCHAR(20) NOT NULL,
    log VARCHAR(100) NOT NULL,
    mod_table VARCHAR(30) NOT NULL,
    date DATE DEFAULT (CURRENT_DATE)
);