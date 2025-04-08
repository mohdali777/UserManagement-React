const express = require('express')
const app = express()
require('dotenv').config();
const db = require('./db')
const userControllers = require('./Routes/user')
const AdminControllers = require('./Routes/adminRoutes')

const cors = require('cors')
app.use(cors({origin:'http://localhost:5173'}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/',userControllers)
app.use('/admin',AdminControllers)


db()

app.listen(process.env.PORT,()=>{
    console.log("Running");
})