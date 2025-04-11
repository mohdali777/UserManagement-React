const {User} = require('../Model/user/usermodel')
const bcrypt = require('bcrypt');

const getUserData = async (req,res) => {
    try {
 const Users = await User.find({})
 return res.status(200).json({success:true,message:'Data Fetched',Users})          
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
}

const EditUsers = async (req,res) => {
    try {
        const {userId,name,email,Role,password} = req.body
        const user = await User.findById(userId)
        console.log(user);
        const Isname = await User.findOne({name})
        console.log(Isname);
        
        if(Isname && Isname._id.toString() !== user._id.toString()){
            return res.status(401).json({success:false,message:"Username Alredy Taken"})
        }
        const IsEmail = await User.findOne({email})
        if(IsEmail && IsEmail._id.toString() !== user._id.toString()){
            return res.status(401).json({success:false,message:"Email Alredy Taken"})
        }
        if(password){
            const SaltRounds = await bcrypt.genSalt(10)
            const HashPassword = await bcrypt.hash(password,SaltRounds) 
            user.password = HashPassword 
        }
        user.name = name
        user.email = email
        if(Role === 'Admin'){
            user.isAdmin = true
        }else{
            user.isAdmin = false
        }
        await user.save()
        return res.status(401).json({success:true,message:"Updated SuccessFully"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
}

const DeleteUser = async (req,res) => {
    try {
        const {id} = req.params
        if(!id){
           return res.status(404).json({success:false,message:"User Not Found"})
        }        
        await User.findByIdAndDelete(id)
        return res.status(200).json({success:true,message:"Deleted Successfully"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
}

const serachQuery = async (req, res) => {
    try {
      const { search } = req.query;  
      const users = await User.find({
        name: { $regex: search, $options: 'i' } 
      });  
      res.status(200).json({ success: true, Users: users });
    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };
  
  const Addusers = async (req,res) => {
    try {
        const {name,email,Role,password} = req.body
        const Isname = await User.findOne({name})
        if(Isname){
            return res.status(401).json({success:false,message:"Username Alredy Taken"})
        }
        const IsEmail = await User.findOne({email})
        if(IsEmail){
            return res.status(401).json({success:false,message:"Email Alredy Taken"})
        }
        const SaltRounds = await bcrypt.genSalt(10)
            const HashPassword = await bcrypt.hash(password,SaltRounds) 

        const newuser =  new User({
               name:name,
               email:email,
               Role:Role,
               password:HashPassword
        })   
          await newuser.save()   
         return res.status(201).json({success:true,message:"User Created Successfully",user:newuser})

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
  }

module.exports = {
    getUserData,
    EditUsers,
    DeleteUser,
    serachQuery,
    Addusers
}