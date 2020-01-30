var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var menuItemRouter = require('./routes/menuItem');
var customerRouter = require('./routes/customer');
var deliveryRouter = require('./routes/delivery');
var storeRouter = require('./routes/store');
var goodsItem = require('./routes/goodsItem');
var storeOrders = require('./routes/storeOrders');
var methodOverride = require('method-override');
var con = require('./database')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use('/menuItem', menuItemRouter);
app.use('/customer', customerRouter);
app.use('/delivery', deliveryRouter);
app.use('/store', storeRouter);
app.use('/goodsItem', goodsItem);
app.use('/storeOrders', storeOrders);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
