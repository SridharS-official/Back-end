const crypto = require('crypto')
const User = require('../models/User')
const ErrorResponse=require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

const getUserById=async(req,res)=>{
  const user=await User.findById(req.params.id).exec()
  if(!user){
      res.status(404).json({message:`no project is Available in this id: ${req.params.id}`})
  }
  try{
      await User.findOne({_id:req.params.id}).then((data)=>{
          res.status(200).json({message:"Successfull",data})
      }).catch((error)=>res.status(404).json({error}))
  }
  catch(error){
      res.status(404).json({error})
  }
}

const register = async (req, res, next) => {
    const { firstname,lastname, password, email } = req.body;
    try {
        const user = await User.create({
            firstname,
            lastname,
            password,
            email,
        });
    sendToken(user,201,res)

    } catch (error) {
     next(error)
    }
};


const login = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new ErrorResponse("please provide email and password", 400))
    }
    try {

        const user = await User.findOne({ email }).select("+password")

        if (!user) {
        return next(new ErrorResponse("Invalid credentials", 401))
        }

        const isMatch=await user.matchPasswords(password);

        if(!isMatch){

        return next(new ErrorResponse("Invalid credentials", 401))

        }
    sendToken(user,200,res)

    }
    catch (error) {
        res.status(500).json({success:false, error:error.message})
    }
}

const forgotpassword = async (req, res, next) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return next(new ErrorResponse('Email could not be sent', 404));
      }
  
      const resetToken = user.getResetPasswordToken();
  
      await user.save();
  
      const resetUrl = `http://localhost:5000/passwordreset/${resetToken}`;
  
      const message = `
        <h1>You have requested a password reset<h1/>
        <p>Please go to this link to reset your password:<p/>
        <a href="${resetUrl}" clicktracking="off">${resetUrl}<a/>`;
  
      try {
        await sendEmail({
          to: user.email,
          subject: 'Reset Password Request',
          text: message,
        });
  
        res.status(200).json({ success: true, data: 'Email sent' });
      } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
  
        await user.save();
  
        return next(new ErrorResponse('Email could not be sent', 500));
      }
    } catch (error) {
      next(error);
    }
  };

const resetpassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

    try {
      const user = await User.findOne({
          resetPasswordToken,
          resetPasswordExpire:{$gt:Date.now()}
      })

      if(!user){
        return next(new ErrorResponse("Invalid Reset Token", 400))
      }
      
      user.password = req.body.password;
      user.resetPasswordToken=undefined;
      user.resetPasswordExpire=undefined;

      await user.save();

    res.status(201).json({
      success:true,
      data:"password Reset success"
    })
    } catch (error) {
      next(error)
    }
}

const sendToken = (user,statusCode,res)=>{
    const token = user.getSignedToken();
    res.status(statusCode).json({
        success:true,
        token
    })
}

module.exports = {
    register,
    login,
    forgotpassword,
    resetpassword,
    getUserById
}