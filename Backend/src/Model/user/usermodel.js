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
 status:{
    type:String,
    enum:['blocked','active','inactive'],
    default:'active'
 },
 Image:{
    type:String,
    required:false
 },
 password:{
    type:String,
    required:true
 }
},{timestamps:true})

const User = mongoose.model('User',UserSchema)

module.exports = {User}