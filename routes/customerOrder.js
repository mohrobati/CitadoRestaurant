var express = require('express');
var router = express.Router();
var con = require('../database');
var shortid = require('shortid');

router.get('/', async function (req, res, next) {
    let customerOrders;
    [ordersWithoutCustomer, fields] = await con.promise().query('SELECT customerOrder.id as customer_order_id, menuItem.id as menu_item_id, menuItem.name as menu_item_name, customerOrder.price as price from CustomerOrder, menuItem WHERE customerOrder.menu_item_id = menuItem.id AND customerOrder.customer_id IS NULL;');
    [ordersWithoutDelivery, fields] = await con.promise().query('SELECT customerOrder.id as customer_order_id, menuItem.id as menu_item_id, menuItem.name as menu_item_name, customer.code as customer_id, customer.f_name as customer_f_name, customer.l_name as customer_l_name, customerOrder.delivery_id, address, customerOrder.price as price from CustomerOrder, menuItem, Customer WHERE customerOrder.menu_item_id = menuItem.id AND customerOrder.customer_id = customer.code AND customerOrder.delivery_id IS NULL;');
    [ordersWithDelivery, fields] = await con.promise().query('SELECT customerOrder.id as customer_order_id, menuItem.id as menu_item_id, menuItem.name as menu_item_name, customer.code as customer_id, customer.f_name as customer_f_name, customer.l_name as customer_l_name, delivery.code as delivery_id, delivery.f_name as delivery_f_name, delivery.l_name as delivery_l_name, address, customerOrder.price as price from CustomerOrder, menuItem, Customer, Delivery WHERE customerOrder.menu_item_id = menuItem.id AND customerOrder.customer_id = customer.code AND customerOrder.delivery_id = delivery.code;');
    [addresses, fields] = await con.promise().query('SELECT customer.code, f_name, l_name, content from Customer, Address WHERE customer.code = address.customer');
    [customers, fields] = await con.promise().query('SELECT * from Customer;');
    [menuItems, fields] = await con.promise().query('SELECT * from MenuItem;');
    [deliveries, fields] = await con.promise().query('SELECT * from Delivery;');
    customerOrders = [...ordersWithoutCustomer, ...ordersWithoutDelivery, ...ordersWithDelivery]
    let groupedCustomerOrders = {}
    customerOrders.forEach((order) => {
        if (order.customer_order_id in groupedCustomerOrders) {
            groupedCustomerOrders[order.customer_order_id].push(order)
        } else {
            groupedCustomerOrders[order.customer_order_id] = []
            groupedCustomerOrders[order.customer_order_id].push(order)
        }
    })
    res.render('customerOrder', {
        customerOrders: groupedCustomerOrders,
        customers: customers,
        addresses: addresses,
        menuItems: menuItems,
        deliveries: deliveries,
    });
});

router.post('/', async function (req, res, next) {
    var menu_items_id = req.body.menuItems;
    var customer_id = req.body.customer;
    var err = false
    if (customer_id != '-') {
        customer_id = "'" + customer_id + "'"
    } else {
        customer_id = 'NULL'
    }
    var delivery_id = req.body.delivery;
    var address = req.body.address;
    if (delivery_id != '-' && address != '-') {
        delivery_id = "'" + delivery_id + "'"
        address = "'" + address + "'"
        query = "SELECT customer FROM Address WHERE content = " + address + ";"
        var [addressCustomer, fields] = await con.promise().query(query);
        var a = 0
        for (var k in addressCustomer) {
            a = addressCustomer[k].customer
        }
        if (a !== req.body.customer) {
            err = true
        }
    } else {
        delivery_id = 'NULL'
        address = 'NULL'
    }
    var id = shortid.generate()
    if (!err) {
        if (!(Array.isArray(menu_items_id))) {
            menu_items_id = [menu_items_id]
        }
        for (var item_id in menu_items_id) {
            var query = "SELECT price FROM MenuItem WHERE id = '" + menu_items_id[item_id] + "';";
            var [price, fields] = await con.promise().query(query);
            var p = 0
            for (var k in price) {
                p = price[k].price
            }
            query = "INSERT INTO CustomerOrder(id, menu_item_id, customer_id, delivery_id, address, price)" +
                " VALUES ('" + id + "', '" + menu_items_id[item_id] + "', " + customer_id + ", " + delivery_id + ", " + address + ", " + p + ");";
            console.log(query)
            await con.promise().query(query);
        }
    }
    res.redirect('back')
});

router.post('/addTable', async function (req, res, next) {
    await con.promise().query('CREATE TABLE CustomerOrder(id VARCHAR(20) NOT NULL, menu_item_id VARCHAR(20) NOT NULL, customer_id VARCHAR(20), delivery_id VARCHAR(20), address VARCHAR(60), price INT NOT NULL, date DATE DEFAULT (CURRENT_DATE), FOREIGN KEY (menu_item_id) REFERENCES MenuItem(id), FOREIGN KEY (customer_id) REFERENCES Customer(code), FOREIGN KEY (delivery_id) REFERENCES Delivery(code), FOREIGN KEY (address) REFERENCES Address(content), PRIMARY KEY (id, menu_item_id));');
    res.redirect('back')
});

router.post('/deleteTable', async function (req, res, next) {
    await con.promise().query('DROP TABLE CustomerOrder;');
    res.redirect('back')
});

router.delete('/:id', async function (req, res, next) {
    await con.promise().query('DELETE FROM CustomerOrder WHERE id = \"' + req.params.id + '\"');
    res.redirect('back')
});


module.exports = router;
