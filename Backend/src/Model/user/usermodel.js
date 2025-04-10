const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
 name:{
    type:String,
    required: true,
 },
 email:{
    type:String,
    required:true
 },
 bio:{
  type:String,
  default:"Add Your bio"
 },
 status:{
    type:String,
    enum:['blocked','active','inactive'],
    default:'active'
 },
 isAdmin:{
type:Boolean,
default:false
 },
 Image:{
    type:String,
    required:false,
    default:'https://www.kasandbox.org/programming-images/avatars/cs-hopper-happy.png'
 },
 password:{
    type:String,
    required:true
 }
},{timestamps:true})

const User = mongoose.model('User',UserSchema)

module.exports = {User}