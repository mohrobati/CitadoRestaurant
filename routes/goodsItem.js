var express = require('express');
var router = express.Router();
var con = require('../database');
var shortid = require('shortid');

router.get('/', async function(req, res, next) {
    [stores, fields] = await con.promise().query('SELECT * FROM Store');
    [goodsItems, fields] = await con.promise().query('SELECT * FROM GoodsItem');
    res.render('goodsItem', {goodsItems: goodsItems, stores: stores})
});

router.post('/', async function(req, res, next) {
    var id = shortid.generate()
    var name = req.body.name
    var price = req.body.price
    var store = req.body.store
    var query = 'INSERT INTO GoodsItem(id, name, price, store) VALUES (\"'+
    id+'\", \"'+name+'\", ' + price + ', \"' + store + '\");';
    console.log(query)
    await con.promise().query(query);
    res.redirect('back')
});

router.post('/addTable', async function (req, res, next) {
    await con.promise().query('CREATE TABLE GoodsItem(id VARCHAR(20) NOT NULL, name VARCHAR(40) NOT NULL, price INT NOT NULL, store VARCHAR(20) NOT NULL, FOREIGN KEY (store) REFERENCES Store(id), PRIMARY KEY (id));');
    res.redirect('back')
});

router.post('/deleteTable', async function (req, res, next) {
    await con.promise().query('DROP TABLE GoodsItem;');
    res.redirect('back')
});

router.put('/:id', async function(req, res, next) {
    var name = req.body.name
    var price = req.body.price
    var query = "UPDATE GoodsItem " +
    "SET name='"+name+"', price="+price +
    " WHERE id = '"+req.params.id+"';"
    console.log(query)
    await con.promise().query(query);
    res.redirect('back')
});

router.delete('/:id', async function(req, res, next) {
    await con.promise().query('DELETE FROM GoodsItem WHERE id = \"'+req.params.id+'\"');
    res.redirect('back')
});

module.exports = router;
