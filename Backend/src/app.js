const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000

app.use(cors({origin:'http://localhost:5173'}))

app.get('/',(req,res)=>{
    res.send("hdsf")
})

app.post('/test',(req,res)=>{
    res.json({test:'Success'})
})
app.listen(3000,()=>{
    console.log("Running");
})