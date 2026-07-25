import express from "express";
// import jwt from "jsonwebtoken";
import Joi from "joi";
import { responseFn } from "../../../js/Fn.js";
import userServices from "../../services/users.js";
import { auth } from "../../../middleware/auth.js";
import taskServices from "../../services/tasks/tasks.js";
const router = express.Router();

// Create a task
router.post("/create", async(req, res, next) => {
    const validationSchema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        leadId: Joi.string().optional().allow(null),
        assignees: Joi.string().required(),
        priority: Joi.string().default("low"),
        weightage: Joi.string().default("easy"),
        dueDate: Joi.string().required(), // saving unix time stamp in db (check schema.primsa file)
    });

    try {
        const validatedBody = await validationSchema.validateAsync(req.body);

        validatedBody.organisationId = req.organisationId;
        validatedBody.assignedBy = req.userId;
        validatedBody.status = "pending";
        validatedBody.organisationId = req.organisationId;
        const result = await taskServices.create(validatedBody);
        return responseFn(res, 200, false, "Task created successfully", result);
    } catch (error) {
        console.log(`Error creating Task : ${error}`);
        return next(error);
    }
});

// get all task list assigned to user
// apply filters in this api too
router.get("/getAll", async(req, res, next) => {

    try {
        // console.log(req.userId,'====userid')
        const { search = "", status = "all" } = req.query;
        const result = await taskServices.findAll({
            assigneeId: req.userId,
            organisationId: req.organisationId,
            search,
            status
        });
        if (result.length === 0) {
            return responseFn(res, 404, false, 'No Tasks Found', result)
        }
        return responseFn(res, 200, false, `${result.length} Tasks found`, result)
    } catch (error) {
        console.log(`Error while fetching all tasks : ${error}`);
        return next(error);
    }
});

router.get('/view', async(req, res, next) => {
    const validationSchema = Joi.object({
        taskId: Joi.string().required()
    })
    try {
        const validatedQuery = await validationSchema.validateAsync(req.query)
        const result = await taskServices.findOne({
            id: validatedQuery.taskId
        })
        if (!result) {
            return responseFn(res, 404, true, `Task not found`, null)
        }
        return responseFn(res, 200, false, `Task found successfully`, result)

    } catch (error) {
        console.log(`Error while viewing a task : ${error}`)
        return next(error)
    }
})

export default router;