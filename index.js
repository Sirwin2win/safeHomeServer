const dotenv = require('dotenv').config()
const express = require('express')
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const path = require('path');

const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/uploads', express.static('uploads'));


// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', profileRoutes);
app.use('/api/auth', authRoutes);
app.use('/categories', categoryRoutes);



app.get('/',(req,res)=>{
    res.send("Hello World!")
})
const port = process.env.PORT || 7000
app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})