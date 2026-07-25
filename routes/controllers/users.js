import express from "express";
import jwt from "jsonwebtoken";
import Joi from "joi";
import { responseFn } from "../../js/Fn.js";
import userServices from "../services/users.js";
import { auth } from "../../middleware/auth.js";
import { seedDefaultTaskStatuses } from "../../js/default.js";
import organisationServices from "../services/organisation.js";
const router = express.Router();

//login
router.post("/login", async(req, res, next) => {
    const validationSchema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    });
    try {
        // console.log(req.body,'====>body')
        const validatedBody = await validationSchema.validateAsync(req.body);
        const existingUser = await userServices.findOne({
            email: validatedBody.email,
            password: validatedBody.password,
        });
        if (!existingUser) {
            return responseFn(
                res,
                400,
                true,
                "Wrong credentials or user doesnt exist",
                null,
            );
        }
        delete existingUser.password;
        const token = jwt.sign(existingUser, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRY,
        });
        req.userId = existingUser.id;
        req.organisationId = existingUser.organisationId;
        existingUser.token = token;
        return responseFn(res, 200, false, "Login successfull", existingUser);
    } catch (error) {
        console.log(`Error in login user : ${error}`);
        return next(error);
    }
});

// signup with organisation
// check in organisation services for logic
router.post("/signup", async(req, res, next) => {
    const validationSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        phone: Joi.string().required(),
        status: Joi.string().default("active"),
        organisationName: Joi.string().required(),
    });
    try {
        const validatedBody = await validationSchema.validateAsync(req.body);
        const existingUser = await userServices.findOne({
            email: validatedBody.email
        })
        if (existingUser) {
            return responseFn(res, 400, true, 'Email already in use', null)
        }
        const result = await organisationServices.create(validatedBody); // this return user object with organisationId within object

        await seedDefaultTaskStatuses(result.organisationId)
        if (result) {
            return responseFn(
                res,
                200,
                false,
                "Organisation and user created",
                result,
            );
        } else {
            throw new Error("Something went wrong, please try again");
        }
    } catch (error) {
        console.log(`Error while signup : ${error}`);
        return next(error);
    }
});

// create a user
router.post("/create", async(req, res, next) => {
    const validationSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        phone: Joi.string().required(),
        status: Joi.string().default("active"),
    });

    try {
        const validatedBody = await validationSchema.validateAsync(req.body);
        const existingUser = await userServices.findOne({
            email: validatedBody.email,
            organisationId: req.organisationId,
        });
        // console.log(existingUser,'========>existing')
        if (existingUser && existingUser.email === validatedBody.email) {
            return responseFn(res, 400, true, "Email already registered", null);
        }
        validatedBody.organisationId = req.organisationId;
        const result = await userServices.create(validatedBody);
        return responseFn(res, 200, false, "User Created", result);
    } catch (error) {
        console.log(`Error while creating a user : ${error}`);
        return next(error);
    }
});

router.get("/getAllOrgUsers", async(req, res, next) => {
    try {
        const result = await userServices.findAll({

            organisationId: req.organisationId,
        });
        return responseFn(res, 200, false, `${result.length} users found`, result);
    } catch (error) {
        console.log(`Error getting all org users : ${error}`);
        return next(error);
    }
});

router.post("/verifyToken", async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return responseFn(res, 401, true, "Authorization token missing", null);
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.id;
        req.organisationId = decoded.organisationId;
        return responseFn(
            res,
            200,
            false,
            "Token verification successfull",
            decoded,
        );
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return responseFn(res, 401, true, "Token has expired", null);
        }

        if (error.name === "JsonWebTokenError") {
            return responseFn(res, 401, true, "Invalid token", null);
        }

        console.log("Error while verifying token:", error);
        return next(error);
    }
});

export default router;