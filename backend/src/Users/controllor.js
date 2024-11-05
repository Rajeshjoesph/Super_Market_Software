const Users = require("./module");

const CreateUsers = async (req, res) => {
  try {
    console.log(req.body);
    const findUsers = await Users.find({ email: req.body.email });
    if (findUsers.length > 0) {
      res.json({ message: "User  already exist" });
    }
    const lastUser = await Users.findOne().sort({ _id: -1 });
    // console.log(lastUser);

    let newUserCode;
    if (lastUser && lastUser.userId) {
      const prefix = "EMP-";
      let numericPart = lastUser.userId;
      if (lastUser.userId.startsWith(prefix)) {
        numericPart = lastUser.userId.replace(prefix, "");
      }
      const parsedNumber = parseInt(numericPart, 10);
      if (isNaN(parsedNumber)) {
        throw new Error("Invalid User number format in the database.");
      }
      newUserCode = parsedNumber + 1;
    } else {
      newUserCode = 1;
    }
    const formattedUserNumber = String(newUserCode).padStart(5, "0");
    const userdata = {
      userId: formattedUserNumber,
      ...req.body,
    };
    const createUsers = await Users.create(userdata);
    res.json({
      data: createUsers,
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

const GetUsers = async (req, res) => {
  try {
    const userData = await Users.find();
    res.json({ data: userData });
  } catch (err) {
    res.json({
      message: err,
    });
  }
};

const GetSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const user = await Users.findById(id);
    if (!user) {
      res.json({
        message: "User is not  found",
      });
    }
    res.status(200).json({
      data: user,
      message: "User found successfully",
    });
  } catch (err) {
    res.json({ message: err });
  }
};
const updateUserDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const updateUser = await Users.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateUser) {
      res.json({
        message: "User is not  found",
      });
    }
    res.status(200).json({
      data: updateUser,
      message: "Update Sussesfully",
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
};

const sigin = async (req, res) => {
  try {
    console.log(req.body);

    const { email, password } = req.body;

    // const user = await Users.find({ email, password });
    const user = await Users.findOne({ email: email, password: password });

    console.log(user);

    if (!user) {
      return res.status(401).json({
        message: "Invail User Login and Password",
      });
    }
    return res.status(200).json({
      data: user,
      message: "Login Sussesfully",
    });
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await Users.findOneAndDelete(id);
    if (!deleteUser || deleteUser.length === 0) {
      res.json({
        message: "User is not found",
      });
    }
    res.json({
      data: deleteUser,
      message: "SuccessFully User Deleted",
    });
  } catch (err) {
    res.json({
      Error: err,
    });
  }
};

module.exports = {
  CreateUsers,
  GetUsers,
  GetSingleUser,
  updateUserDetail,
  sigin,
  deleteUser,
};
