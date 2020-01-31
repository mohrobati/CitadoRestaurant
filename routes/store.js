var express = require('express');
var router = express.Router();
var con = require('../database');
var shortid = require('shortid');

router.get('/', async function(req, res, next) {
    [stores, fields] = await con.promise().query('SELECT * FROM Store');
    res.render('store', {stores: stores})
});

router.post('/', async function(req, res, next) {
    var name = req.body.name
    var available = req.body.available
    console.log(available);
    var id = shortid.generate()
    var query = 'INSERT INTO Store(id, name, available) VALUES (\"'+
    id+'\", \"'+name+'\", 1);';
    console.log(query)
    await con.promise().query(query);
    res.redirect('back')
});

router.post('/addTable', async function (req, res, next) {
    await con.promise().query('CREATE TABLE Store(id VARCHAR(20) NOT NULL, name VARCHAR(40) NOT NULL, available INT NOT NULL CHECK (available IN (0, 1)), PRIMARY KEY (id));');
    res.redirect('back')
});

router.post('/deleteTable', async function (req, res, next) {
    await con.promise().query('DROP TABLE Store;');
    res.redirect('back')
});

router.put('/:id', async function(req, res, next) {
    var name = req.body.name
    var available = req.body.available
    if (available === 'on') 
        available = 1;
    else available = 0;
    var query = "UPDATE Store " +
    "SET name='"+name+"', available="+available+" "+
    "WHERE id = '"+req.params.id+"';"
    console.log(query)
    await con.promise().query(query);
    res.redirect('back')
});

router.delete('/:id', async function(req, res, next) {
    await con.promise().query('DELETE FROM Store WHERE id = \"'+req.params.id+'\"');
    res.redirect('back')
});

module.exports = router;
