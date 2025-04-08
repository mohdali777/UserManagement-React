const {User} = require('../Model/user/usermodel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET

const SignIn = async(req,res)=>{
try {
    const {email,password} = req.body
    const IsEmail = await User.findOne({email})
    if(!IsEmail){
        return res.status(404).json({success:false,message:'User does not exist'})
    }
    const isPasswordValid = await bcrypt.compare(password, IsEmail.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
     
    const Token = jwt.sign({userId:IsEmail._id,email:IsEmail.email},JWT_SECRET,{
      expiresIn:'1d'
    })
    
    return res.status(200).json({
    success:true,
    message:"Login Success",
    Token,
    user:{userId:IsEmail._id,email:IsEmail.email}
  })

} catch (error) {
    console.error('SignIn error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
}

}

const Signup = async(req,res)=>{
try {
    console.log(req.body);
    const {name,email,password} = req.body;
    const isName = await User.findOne({name})
    if(isName){
        return res.status(400).json({success:false,message:"User Name Alredy Used"})
    }
    const IsEmail = await User.findOne({email})
    if(IsEmail){
        return res.status(400).json({success:false,message:"Email Alredy Used"})
    }
   
    const SaltRounds = await bcrypt.genSalt(10)
    const HashPassword = await bcrypt.hash(password,SaltRounds)

    const newUser = new User({
       name:name,
       email:email,
       password:HashPassword
    })
    await newUser.save()
    
    const Token = jwt.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET, {
      expiresIn: '1d',
    });
     
    return res.status(201).json({success:true,message:"User Created Successfully",Token,user:{userId:newUser._id,email:newUser.email}})
} catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
}
}
module.exports = {
    SignIn,
    Signup
}