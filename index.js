const dotenv = require('dotenv').config()
const express = require('express')
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);


app.get('/',(req,res)=>{
    res.send("Hello World!")
})
const port = process.env.PORT || 7000
app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})