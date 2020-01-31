var express = require('express');
var router = express.Router();
var con = require('../database');
var shortid = require('shortid');

router.get('/', async function (req, res, next) {
    [customerOrders, fields] = await con.promise().query('SELECT * from customerOrder');
    [addresses, fields] = await con.promise().query('SELECT customer.code, f_name, l_name, content from Customer, Address WHERE customer.code = address.customer');
    [customers, fields] = await con.promise().query('SELECT * from Customer;');
    [menuItems, fields] = await con.promise().query('SELECT * from MenuItem;');
    [deliveries, fields] = await con.promise().query('SELECT * from Delivery;');
    let groupedCustomerOrders = {}
    customerOrders.forEach((order) => {
        if (order.id in groupedCustomerOrders) {
            groupedCustomerOrders[order.id].push(order)
        } else {
            groupedCustomerOrders[order.id] = []
            groupedCustomerOrders[order.id].push(order)
        }
    })
    console.log(groupedCustomerOrders)
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
        console.log(query)
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
            var query = "SELECT name, price FROM MenuItem WHERE id = '" + menu_items_id[item_id] + "';";
            console.log(query)
            var [menuItem, fields] = await con.promise().query(query);
            query = "SELECT f_name, l_name FROM Customer WHERE code = " + customer_id + ";";
            console.log(query)
            var [customer, fields] = await con.promise().query(query);
            var customer_name;
            if(customer[0] !== undefined)
                customer_name = "'" + customer[0].f_name + " " + customer[0].l_name + "'"
            else
                customer_name = "NULL"
            var delivery_name;
            query = "SELECT f_name, l_name FROM Delivery WHERE code = " + delivery_id + ";";
            console.log(query)
            var [delivery, fields] = await con.promise().query(query);
            if(delivery[0] !== undefined)
                delivery_name = "'" + delivery[0].f_name + " " + delivery[0].l_name + "'"
            else
                delivery_name = "NULL"
            query = "INSERT INTO CustomerOrder(id, menu_item_name, customer_name, delivery_name, address, price)" +
                " VALUES ('" + id + "', '" + menuItem[0].name + "', " + customer_name + ", " + delivery_name + ", " + address + ", " + menuItem[0].price + ");";
            console.log(query)
            await con.promise().query(query);
        }
    }
    res.redirect('back')
});

router.post('/addTable', async function (req, res, next) {
    await con.promise().query('CREATE TABLE CustomerOrder(id VARCHAR(20) NOT NULL, menu_item_name VARCHAR(60) NOT NULL, customer_name VARCHAR(20), delivery_name VARCHAR(20), address VARCHAR(60), price INT NOT NULL, date DATE DEFAULT (CURRENT_DATE), PRIMARY KEY (id, menu_item_name));');
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
