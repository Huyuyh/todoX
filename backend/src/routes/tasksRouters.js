import express from 'express';
import { createTask, deleteTask, getAllTask, getTaskStats, updateTask } from '../controllers/taskController.js';

const router = express.Router();

router.get("/", getAllTask);

router.post("/", createTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

router.get("/getTaskStats", getTaskStats);

export default router;