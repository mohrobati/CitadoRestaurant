var express = require('express');
var router = express.Router();
var con = require('../database');
var shortid = require('shortid');

router.get('/', async function (req, res, next) {
    [storeOrders, fields] = await con.promise().query('select StoreOrder.id as store_order_id, GoodsItem.id as goods_item_id, GoodsItem.name as goods_item_name, StoreOrder.price as price, Store.id as store_id, Store.name as store_name from StoreOrder, GoodsItem, Store where StoreOrder.goods_item_id = GoodsItem.id and GoodsItem.store = Store.id;');
    [goodsItems, fields] = await con.promise().query('SELECT GoodsItem.id as goods_item_id, GoodsItem.name as goods_item_name, GoodsItem.price as price, Store.name as store_name FROM GoodsItem, Store where GoodsItem.store = Store.id;');
    groupedStoreOrders = {}
    storeOrders.forEach((order) => {
        if (order.store_order_id in groupedStoreOrders) {
            groupedStoreOrders[order.store_order_id].push(order)
        } else {
            groupedStoreOrders[order.store_order_id] = []
            groupedStoreOrders[order.store_order_id].push(order)
        }
    })
    res.render('storeOrders', { storeOrders: groupedStoreOrders, goodsItems: goodsItems })
});

router.post('/', async function (req, res, next) {
    var goodsItems = req.body.goodsItems
    store_tmp = ""
    err = false
    for (item in goodsItems) {
        var query = "SELECT store FROM GoodsItem WHERE id = '" + goodsItems[item] + "';";
        var [store, fields] = await con.promise().query(query);
        s = ""
        for (var k in store) {
            s = store[k].store
        }
        if (store_tmp === "") {
            store_tmp = s;
        } else {
            if (store_tmp !== s) {
                err = true
            }
        }
    }
    if (!err) {
        var id = shortid.generate()
        if (!(Array.isArray(goodsItems))) {
            goodsItems = [goodsItems]
        }
        for (item in goodsItems) {
            var query = "SELECT price FROM GoodsItem WHERE id = '" + goodsItems[item] + "';";
            var [price, fields] = await con.promise().query(query);
            var p = 0
            for (var k in price) {
                p = price[k].price
            }
            query = 'INSERT INTO StoreOrder(id, goods_item_id, price) VALUES (\"' +
                id + '\", \"' + goodsItems[item] + '\", ' + p + ");";
            console.log(query)
            await con.promise().query(query);
        }
    }
    res.redirect('back')
});

router.delete('/:id', async function(req, res, next) {
    await con.promise().query('DELETE FROM StoreOrder WHERE id = \"'+req.params.id+'\"');
    res.redirect('back')
});


module.exports = router;
