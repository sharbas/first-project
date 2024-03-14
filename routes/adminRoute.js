var express = require('express');
var admin_route = express();
const path=require('path')
// view engine setup


/* GET home page. */
admin_route.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = admin_route;
