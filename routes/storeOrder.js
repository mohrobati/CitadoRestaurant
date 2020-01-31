var express = require('express');
var router = express.Router();
var con = require('../database');
var shortid = require('shortid');

router.get('/', async function (req, res, next) {
    [storeOrders, fields] = await con.promise().query('select * from storeOrder');
    [goodsItems, fields] = await con.promise().query('SELECT GoodsItem.name as goods_item_name, GoodsItem.price as price, Store.name as store_name FROM GoodsItem, Store where GoodsItem.store = Store.id and Store.available=1;');
    groupedStoreOrders = {}
    storeOrders.forEach((order) => {
        if (order.id in groupedStoreOrders) {
            groupedStoreOrders[order.id].push(order)
        } else {
            groupedStoreOrders[order.id] = []
            groupedStoreOrders[order.id].push(order)
        }
    })
    res.render('storeOrder', { 
        storeOrders: groupedStoreOrders,
        goodsItems: goodsItems })
});

router.post('/', async function (req, res, next) {
    var goodsItems = req.body.goodsItems
    store_tmp = ""
    err = false
    if (!(Array.isArray(goodsItems))) {
        goodsItems = [goodsItems]
    }
    for (item in goodsItems) {
        var query = "SELECT store FROM GoodsItem WHERE name = '" + goodsItems[item] + "';";
        var [store, fields] = await con.promise().query(query);
        s = store[0].store
        if (store_tmp === "") {
            store_tmp = s;
        } else {
            if (store_tmp !== s) {
                err = true
            }
        }
    }
    
    if (!err) {
        var query = "SELECT name FROM Store WHERE id = '" + store_tmp + "';";
        var [store, fields] = await con.promise().query(query);
        var id = shortid.generate()
        for (item in goodsItems) {
            console.log(goodsItems[item])
            var query = "SELECT price FROM GoodsItem WHERE name = '" + goodsItems[item] + "';";
            var [price, fields] = await con.promise().query(query);
            query = 'INSERT INTO StoreOrder(id, goods_item_name, store, price) VALUES (\"' +
                id + '\", \"' + goodsItems[item] + '\", \"' + store[0].name + '\", '+ price[0].price + ");";
            console.log(query)
            await con.promise().query(query);
        }
    }
    res.redirect('back')
});

router.post('/addTable', async function (req, res, next) {
    await con.promise().query('CREATE TABLE StoreOrder(id VARCHAR(20) NOT NULL, goods_item_id VARCHAR(20) NOT NULL, price INT NOT NULL, date DATE DEFAULT (CURRENT_DATE), FOREIGN KEY (goods_item_id) REFERENCES GoodsItem(id), PRIMARY KEY (id, goods_item_id));');
    res.redirect('back')
});

router.post('/deleteTable', async function (req, res, next) {
    await con.promise().query('DROP TABLE StoreOrder;');
    res.redirect('back')
});

router.delete('/:id', async function(req, res, next) {
    await con.promise().query('DELETE FROM StoreOrder WHERE id = \"'+req.params.id+'\"');
    res.redirect('back')
});


module.exports = router;
