var express = require('express');
var user_route = express();

const config=require('../config/config')
const auth=require('../middleware/auth')


var s=r


// view engine setup


// const bodyparser=require('body-parser')
// user_route.use(bodyparser.json())
// user_route.use(bodyparser.urlencoded({extented:true}))


const userController=require('../controllers/userController')

user_route.get('/signup',auth.isLogout,userController.signupLoad)
user_route.post('/signup',userController.insertUser)

user_route.get('/verify',userController.verifyMail)

user_route.get('/',auth.isLogout,userController.loginLoad)
user_route.get('/login',auth.isLogout,userController.loginLoad)
user_route.post('/login',userController.loginVerify)

user_route.get('/home',auth.isLogin,userController.loadHome)

module.exports=user_route

