import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './configs/db.js';
import taskRoute from './routes/tasksRouters.js';

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

// middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }))

app.use('/api/tasks', taskRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server ${PORT} started`);
  });
});



