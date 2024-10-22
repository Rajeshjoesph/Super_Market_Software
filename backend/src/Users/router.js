const express = require("express");
const userControllor = require("../Users/controllor");
const UsersRouter = express.Router();

UsersRouter.route("/users")
  .post(userControllor.CreateUsers)
  .get(userControllor.GetUsers);
UsersRouter.route("/users/:id")
  .get(userControllor.GetSingleUser)
  .put(userControllor.updateUserDetail)
  .delete(userControllor.deleteUser);

//   sigin Router
UsersRouter.route("/sigin").post(userControllor.sigin);

module.exports = UsersRouter;
