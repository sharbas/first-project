const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/daily_fresh')
var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var userRouter = require('./routes/userRoute');
var adminRouter = require('./routes/adminRoute');







app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', userRouter);
app.use('/admin', adminRouter);







module.exports = app;
