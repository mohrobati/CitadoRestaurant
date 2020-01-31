var express = require('express');
var router = express.Router();
var con = require('../database');
var shortid = require('shortid');

router.get('/', async function (req, res, next) {
  [customers, fields] = await con.promise().query('SELECT * FROM Customer');
  [menuItems, fields] = await con.promise().query('SELECT * FROM MenuItem');
  res.render('customer', { customers: customers, menuItems: menuItems })
});

router.post('/', async function (req, res, next) {
  var f_name = req.body.f_name
  var l_name = req.body.l_name
  var age = req.body.age
  var mobile_phone = req.body.mobile_phone
  var code = req.body.code
  var favorite = req.body.favorite
  console.log(favorite)
  var query = 'INSERT INTO Customer(f_name, l_name, age, mobile_phone, code, favorite) VALUES (\"' +
    f_name + '\", \"' + l_name + '\", ' + age + ', \"' + mobile_phone + '\", \"' + code + '\", \"' + favorite + '\");';
  console.log(query)
  await con.promise().query(query);
  res.redirect('back')
});

router.put('/:id', async function (req, res, next) {
  var f_name = req.body.f_name
  var l_name = req.body.l_name
  var age = req.body.age
  var mobile_phone = req.body.mobile_phone
  var code = req.body.code
  var favorite = req.body.favorite
  var query = "UPDATE Customer " +
    "SET f_name='" + f_name + "', l_name='" + l_name + "' " +
    ", age=" + age + ", mobile_phone='"+mobile_phone+"', code='"+code+"' "+", favorite='"+favorite+"' "+
    "WHERE code = '" + req.params.id + "';"
  console.log(query)
  await con.promise().query(query);
  res.redirect('back')
});

router.post('/addTable', async function (req, res, next) {
  await con.promise().query('CREATE TABLE Customer(code VARCHAR(20) NOT NULL, f_name VARCHAR(40) NOT NULL, l_name VARCHAR(40) NOT NULL, age INT NOT NULL, mobile_phone DECIMAL(11) NOT NULL CHECK (mobile_phone > 1000000000), favorite VARCHAR(40), PRIMARY KEY (code));');
  res.redirect('back')
});

router.post('/deleteTable', async function (req, res, next) {
  await con.promise().query('DROP TABLE Customer;');
  res.redirect('back')
});

router.delete('/:id', async function (req, res, next) {
  await con.promise().query('DELETE FROM Customer WHERE code = \"' + req.params.id + '\"');
  res.redirect('back')
});

router.post('/address', async function (req, res, next) {
  var content = req.body.content
  var home_phone = req.body.home_phone
  var customer = req.body.customer
  var query = 'INSERT INTO Address(customer, home_phone, content) VALUES (\"' +
    customer + '\", \"' + home_phone + '\", \"' + content + '\");';
  console.log(query)
  await con.promise().query(query);
  res.redirect('back')
});

module.exports = router;
