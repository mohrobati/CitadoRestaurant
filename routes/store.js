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
    var id = shortid.generate()
    var query = 'INSERT INTO Store(id, name) VALUES (\"'+
    id+'\", \"'+name+'\");';
    console.log(query)
    await con.promise().query(query);
    res.redirect('back')
});

router.put('/:id', async function(req, res, next) {
    var name = req.body.name
    var query = "UPDATE Store " +
    "SET name='"+name+"' "+
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
