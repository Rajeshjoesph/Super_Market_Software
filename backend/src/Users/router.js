const express = require("express");
const userControllor = require("../Users/controllor");
const UsersRouter = express.Router();

UsersRouter.route("/users")
  .post(userControllor.CreateUsers)
  .get(userControllor.GetUsers);
UsersRouter.route("/users/:id").get(userControllor.GetSingleUser);

module.exports = UsersRouter;
