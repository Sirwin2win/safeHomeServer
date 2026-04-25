const dotenv = require('dotenv').config()
const express = require('express')
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const maintenanceCategoryRoutes = require('./routes/maintenanceCategoryRoutes');


const path = require('path');

const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cors set up
const allowedOrigins = ['http://localhost:5173', 'https://safehomeproperties.com'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
// app.use('/uploads', express.static('uploads'));


// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/profile', profileRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/maintenance-categories', maintenanceCategoryRoutes);




app.get('/',(req,res)=>{
    res.send("Hello World!")
})
const port = process.env.PORT || 7000
app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})