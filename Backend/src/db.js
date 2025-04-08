const mongoose = require('mongoose')
require("dotenv").config()

let  db = async ()=>{
    try {
        await mongoose.connect(process.env.MONOGO_CONNECT)
    } catch (error) {
        
    }
}

module.exports = db