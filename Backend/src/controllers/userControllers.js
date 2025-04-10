const {User} = require('../Model/user/usermodel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dy5xp5ai5',
  api_key: '769411556796447',
  api_secret: '49JXIH5zvXqTdEh-fs4phDfTC8k',
});

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
    user:IsEmail  
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
     
    return res.status(201).json({success:true,message:"User Created Successfully",Token,user:newUser})
} catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
}
}

const getData = async (req,res) => {
  try {
    const Token = req.headers.authorization.split(' ')[1]
    if (!Token) return res.status(401).json({success:false , message: 'Unauthorized' });
    const decode = jwt.verify(Token,JWT_SECRET)
    const user = await User.findById(decode.userId)
    if (!user) return res.status(404).json({ success:false,message: 'User not found' });
    res.json({ user ,success:true});    
  } catch (error) {
    res.status(401).json({ message: 'Invalid Token' });
  }
}

const editprofile = async (req, res) => {
  try {
    const { name, email, bio,profileImage,uploadimageId,imageId} = req.body;
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized',log:'Logout'});
    }
    const decode = jwt.verify(token,JWT_SECRET)
    const user = await User.findById(decode.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found',log:'Logout' });
    }
  
    if(profileImage){
      if(imageId){
        await cloudinary.uploader.destroy(imageId);
      }
      user.Image = profileImage
      user.ImageId = uploadimageId
      await user.save();
    }

    const isNameUsed = await User.findOne({ name });
    if (isNameUsed && isNameUsed._id.toString() !== user._id.toString()) {
      return res.status(400).json({ success: false, message: 'Username already taken' });
    }
    const isEmailUsed = await User.findOne({ email });
    if (isEmailUsed && isEmailUsed._id.toString() !== user._id.toString()) {
      return res.status(400).json({ success: false, message: 'Email already taken' });
    }
    user.name = name;
    user.email = email;
    user.bio = bio;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Edited successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }

};

const verifyUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided or wrong format' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ user, token, success: true });
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(403).json({ success: false, message: 'Invalid or malformed token', error: error.message });
  }
};



module.exports = {
    SignIn,
    Signup,
    getData,
    editprofile,
    verifyUser
}