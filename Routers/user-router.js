const { getUsers } = require("../Controllers/app.controller");

const userRouter = require("express").Router();

userRouter.get("/", getUsers);

module.exports = userRouter;
