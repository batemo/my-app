import 'reflect-metadata';
import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { container } from './di/container';
import { UserController } from './controllers/user.controller';

config();

const app = express();
app.use(express.json());

// Dependency Injection
const userController = container.resolve(UserController);
app.use('/users', userController.registerRoutes());

app.get('/', (req, res) => {
  res.send('User Management System API is running.');
});

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/userdb';

mongoose.connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  }); 