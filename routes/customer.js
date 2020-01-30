var express = require('express');
var router = express.Router();
var con = require('../database');
var shortid = require('shortid');

router.get('/', async function (req, res, next) {
  [customers, fields] = await con.promise().query('SELECT * FROM Customer');
  res.render('customer', { customers: customers })
});

router.post('/', async function (req, res, next) {
  var f_name = req.body.f_name
  var l_name = req.body.l_name
  var age = req.body.age
  var mobile_phone = req.body.mobile_phone
  var code = req.body.code
  var query = 'INSERT INTO Customer(f_name, l_name, age, mobile_phone, code) VALUES (\"' +
    f_name + '\", \"' + l_name + '\", ' + age + ', \"' + mobile_phone + '\", \"' + code + '\");';
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
  var query = "UPDATE Customer " +
    "SET f_name='" + f_name + "', l_name='" + l_name + "' " +
    ", age=" + age + ", mobile_phone='"+mobile_phone+"', code='"+code+"' "+
    "WHERE code = '" + req.params.id + "';"
  console.log(query)
  await con.promise().query(query);
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
