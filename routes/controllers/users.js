import express from "express";
import jwt from "jsonwebtoken";
import Joi from "joi";
import { responseFn } from "../../js/Fn.js";
import userServices from "../services/users.js";
import { auth } from "../../middleware/auth.js";
const router = express.Router();




router.post('/login',async(req,res,next)=>{
  const validationSchema = Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required()
  })
  try{
    const validatedBody = await validationSchema.validateAsync(req.body);
    const existingUser = await userServices.findOne({email:validatedBody.email,password:validatedBody.password});
    if(!existingUser){
      return responseFn(res,400,true,'Wrong credentials or user doesnt exist',null)
    }
    delete existingUser.password
    const token = jwt.sign(existingUser,process.env.JWT_SECRET,{
      expiresIn:process.env.JWT_EXPIRY
    })
    existingUser.token = token
    return responseFn(res,200,false,'Login successfull',existingUser)
  }catch(error){
    console.log(`Error in login user : ${error}`)
    return next(error)
  }
})


// create a user
router.post("/create",async (req, res, next) => {
  const validationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
    roleId: Joi.string().required(),
    departmentId: Joi.string().required(),
    status: Joi.string().default("active"),
  });

  try {
    const validatedBody = await validationSchema.validateAsync(req.body);
    const existingUser = await userServices.findOne({
      email: validatedBody.email,
    });
    // console.log(existingUser,'========>existing')
    if (existingUser && existingUser.email === validatedBody.email) {
      return responseFn(res, 400, true, "Email already registered", null);
    }
    const result = await userServices.create(validatedBody);
    return responseFn(res, 200, false, "User Created", result);
  } catch (error) {
    console.log(`Error while creating a user : ${error}`);
    return next(error)
  }
});

export default router;
