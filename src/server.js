import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import User from './models/User.js';        
import studentRoutes from './routes/studentRoutes.js';


dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
