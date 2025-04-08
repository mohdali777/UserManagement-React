const {User} = require('../Model/user/usermodel')

const getUserData = async (req,res) => {
    try {
 const Users = await User.find({})
 return res.status(200).json({success:true,message:'Data Fetched',Users})          
    } catch (error) {
        
    }
}

module.exports = {
    getUserData
}