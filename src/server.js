import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import User from './models/User.model.js';
import studentRoutes from './routes/studentRoutes.js';
import authRoutes from './routes/authRoutes.js';


dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);


app.use('/auth', authRoutes); 

// ✅ Optional basic route
app.get('/', (req, res) => {
  res.send('API running');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
