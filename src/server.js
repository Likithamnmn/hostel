import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/user.routes.js';
import hostelRoutes from './routes/hostel.routes.js';
import User from './models/User.model.js';
import studentRoutes from './routes/student.routes.js';
import authRoutes from './routes/auth.routes.js';


dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/hostels', hostelRoutes);


app.use('/auth', authRoutes);

// ✅ Optional basic route
app.get('/', (req, res) => {
  res.send('API running');
});
import roomRoutes from "./routes/room.routes.js";
app.use("/api/rooms", roomRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
