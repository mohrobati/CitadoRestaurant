var express = require('express');
var router = express.Router();
var con = require('../database');

router.get('/', async function (req, res, next) {
  [deliveries, fields] = await con.promise().query('SELECT * FROM Delivery');
  res.render('delivery', { deliveries: deliveries })
});

router.post('/', async function (req, res, next) {
  var f_name = req.body.f_name
  var l_name = req.body.l_name
  var mobile_phone = req.body.mobile_phone
  var code = req.body.code
  var query = 'INSERT INTO Delivery(f_name, l_name, mobile_phone, code) VALUES (\"' +
    f_name + '\", \"' + l_name + '\", \"' + mobile_phone + '\", \"' + code + '\");';
  console.log(query)
  await con.promise().query(query);
  res.redirect('back')
});

router.post('/addTable', async function (req, res, next) {
  await con.promise().query('CREATE TABLE Delivery(code VARCHAR(20) NOT NULL, f_name VARCHAR(20) NOT NULL, l_name VARCHAR(20) NOT NULL, mobile_phone DECIMAL(11) NOT NULL CHECK (mobile_phone > 1000000000), PRIMARY KEY (code));');
  res.redirect('back')
});

router.post('/deleteTable', async function (req, res, next) {
  await con.promise().query('DROP TABLE Delivery;');
  res.redirect('back')
});

router.put('/:id', async function (req, res, next) {
  var f_name = req.body.f_name
  var l_name = req.body.l_name
  var mobile_phone = req.body.mobile_phone
  var code = req.body.code
  var query = "UPDATE Delivery " +
    "SET f_name='" + f_name + "', l_name='" + l_name + "' " +
    ", mobile_phone='"+mobile_phone+"', code='"+code+"' "+
    "WHERE code = '" + req.params.id + "';"
  console.log(query)
  await con.promise().query(query);
  res.redirect('back')
});

router.delete('/:id', async function (req, res, next) {
  await con.promise().query('DELETE FROM Delivery WHERE code = \"' + req.params.id + '\"');
  res.redirect('back')
});

module.exports = router;
