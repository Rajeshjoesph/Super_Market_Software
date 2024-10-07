const mongoose = require("mongoose");

const EmpUsers = new mongoose.Schema({
  userId: { type: String, require: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: Boolean, require: true },
  created_at: { type: Date, default: Date.now },
});

const Users = mongoose.model("Users", EmpUsers);
module.exports = Users;
