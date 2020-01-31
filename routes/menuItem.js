var express = require('express');
var router = express.Router();
var con = require('../database');
var shortid = require('shortid');

router.get('/', async function(req, res, next) {
    [menuItems, fields] = await con.promise().query('SELECT * FROM MenuItem');
    res.render('menuItem', {menuItems: menuItems})
});

router.post('/', async function(req, res, next) {
    var name = req.body.name
    var price = req.body.price
    var query = 'INSERT INTO MenuItem(id, name, price) VALUES (\"'+
    shortid.generate()+'\", \"'+name+'\", '+price+');';
    console.log(query)
    await con.promise().query(query);
    res.redirect('back')
});

router.post('/addTable', async function (req, res, next) {
    await con.promise().query('CREATE TABLE MenuItem(id VARCHAR(20) NOT NULL, name VARCHAR(40) NOT NULL, price INT NOT NULL, PRIMARY KEY (id));');
    res.redirect('back')
});

router.post('/deleteTable', async function (req, res, next) {
    await con.promise().query('DROP TABLE MenuItem;');
    res.redirect('back')
});

router.put('/:id', async function(req, res, next) {
    var name = req.body.name
    var price = req.body.price
    var query = "UPDATE MenuItem " +
    "SET name='"+name+"', price='"+price+"' "+
    "WHERE id = '"+req.params.id+"';"
    console.log(query)
    await con.promise().query(query);
    res.redirect('back')
});

router.delete('/:id', async function(req, res, next) {
    await con.promise().query('DELETE FROM MenuItem WHERE id = \"'+req.params.id+'\"');
    res.redirect('back')
});

module.exports = router;
