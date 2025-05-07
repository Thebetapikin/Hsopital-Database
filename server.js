require('dotenv').config(); 
// console.log('MONGODB_URI:', process.env.MONGODB_URI);
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./Routes/routes');

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
}));


// Middleware
app.use(express.json());

// CORS Configuration
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {  
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
})
.then(() => console.log('✅ MongoDB Connected!'))
.catch(err => {
  console.error('❌ Connection Error:', err);
  process.exit(1); 
});

// Routes
app.use('/api', userRoutes);

// After all routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Server Start
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});




