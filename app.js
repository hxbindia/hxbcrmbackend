import "dotenv/config";
import createHttpError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import routes from "./routes/routes.js";
import usersRouter from "./routes/controllers/users.js";
import { responseFn } from "./js/Fn.js";
import { auth } from "./middleware/auth.js";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1",auth,routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render(err.message);
  return responseFn(res, 500, true, err.message, null);
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server started on : ${process.env.SERVER_PORT}`);
});

export default app;
