import express from "express";
// import { auth } from '../middleware/auth.js';
import userRouter from "../routes/controllers/users.js";
import taskRouter from "../routes/controllers/tasks.js";
const router = express.Router();
router.use("/users", userRouter);
router.use("/tasks", taskRouter);

export default router;
