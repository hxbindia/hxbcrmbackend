import express from "express";
// import jwt from "jsonwebtoken";
import Joi from "joi";
import { responseFn } from "../../js/Fn.js";
import userServices from "../services/users.js";
import { auth } from "../../middleware/auth.js";
import taskServices from "../services/tasks.js";
const router = express.Router();

router.post("/create", async (req, res, next) => {
  const validationSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    leadId: Joi.string().required(),
    assignedBy: Joi.string().required(),
    assignedTo: Joi.string().required(),
    priority: Joi.string().default("low"),
    weightage: Joi.string().default("easy"),
    // status:Joi.string().default('pending'),
    dueDate: Joi.string().required(),
  });

  try {
    const validatedBody = await validationSchema.validateAsync(req.body);
    validatedBody.dueDate =String( Math.floor(Date.now(validatedBody.dueDate) / 1000));
    const result = await taskServices.create(validatedBody);
    return responseFn(res, 200, false, "Task created successfully", result);
  } catch (error) {
    console.log(`Error creating Task : ${error}`);
    return next(error);
  }
});

export default router;
