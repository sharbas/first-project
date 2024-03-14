const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const nodemailer = require("nodemailer");

const config = require("../config/config");



//hash the passwored to secure it
const securePassword = async (password)=>{
  try{
    const passwordHash= await bcrypt.hash(password,10)
    return passwordHash
  }catch(error){
    console.log(error.message);
  }
}

const sendverifyMail = async (name, email, user_id) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      prot: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: config.emailUser,
        pass: config.emailPassword,
      },
    });
    const mailOptions = {
      from: "mohammedsharbas33@gmail.com",
      to: email,
      subject: "for verification mail",
      html:
        "<p>hi" +
        name +
        ',please click here to <a href="https://nutrifreshfruit.store/verify?id=' +
        user_id +
        '">verify</a>your mail.</p>',
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email has been sent:-", info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

//to load signup page
const signupLoad = async (req, res) => {
  try {
    res.render("signup");
  } catch (error) {
    console.log(error.message);
  }
};

//to insert the data of user from signup
const insertUser = async (req, res) => {
  try {
    console.log(req.body.Password);
    if (req.body.Password === req.body.rePassword) {
      const spassword=await securePassword(req.body.Password)
      console.log(spassword);
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: spassword,
        is_admin: 0,
      });
      const userData = await user.save();
      if (userData) {
        sendverifyMail(req.body.name, req.body.email, userData._id);
        res.render("signup", {
          message:
            "your signup has been succesfully. please verify your mail",
        });
      } else {
        res.render("signup", { message: "your registration is failed" });
      }
    } else {
      res.render("signup", { message: "your password is not matching" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const verifyMail = async (req, res) => {
  try {
    const updateInfo = await User.updateOne(
      { _id: req.query.id },
      { $set: { is_verified: 1 } }
    );

    res.render("email-verified");
  } catch (error) {
    console.log(error.message);
  }
};

const loginLoad=async(req,res)=>{
  try{
   
    res.render('login')

  }catch(error){
    console.log(error.message);
  }
}

const loginVerify=async(req,res)=>{
  try{
  

 const  email=req.body.email
 const  password=req.body.password

console.log(password);
const userData=await User.findOne({email:email})
if(userData){
  const passwordMatch=await bcrypt.compare(password,userData.password)
  console.log(passwordMatch);
  if(passwordMatch){
    if(userData.is_verified===0){
      res.render('login',{message:"please verify your mail"})
    }else{
      req.session.user_id=userData._id
      res.redirect('/home')
    }
  }else{
    res.render('login',{message:'password is wrong'})
  }
}else{
  res.render('login',{message:'incorrect login credentials!'})
}


  }catch(error){
    console.log(error.message);
  }
}

const loadHome=async(req,res)=>{
  try{

    res.render('home')
  }catch(error){
    console.log(error.message);
  }
}

module.exports = {
  signupLoad,
  insertUser,
  verifyMail,
  loginLoad,
  loginVerify,
  loadHome,

};
