import jwt from "jsonwebtoken";
// import moment from "moment/moment.js";
import { responseFn } from "../js/Fn.js";

export async function auth(req, res, next) {
  try {
    const allowedPaths = ["/users/login", "/users/signup"];
    // console.log(req.path)
    if (allowedPaths.includes(req.path)) {
      return next();
    }
    // console.log(req.headers)
    const bearerToken = req.headers["authorization"];

    if (!bearerToken) {
      return responseFn(res, 404, true, "Token not present", null);
    }
    const token = bearerToken.split("Bearer ")[1];

    const decoded = jwt.decode(token);
    if (!decoded) {
      return responseFn(res, 401, true, "Invalid token", null);
    }
    const now = Math.floor(Date.now() / 1000);

    if (decoded.exp < now) {
      return responseFn(res, 401, true, "Token expired", null);
    }
    req.organisationId = decoded.organisationId;
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(`Error in auth middleware: ${error}`);
    return responseFn(res, 500, error.message, null);
  }
}