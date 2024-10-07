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
    const user = await Users.findById(id);
    if (!user) {
      res.json({
        message: "User is not  found",
      });
      res.status(200).json({
        data: user,
        message: "User found successfully",
      });
    }
  } catch (err) {
    res.json({ message: err });
  }
};

module.exports = {
  CreateUsers,
  GetUsers,
  GetSingleUser,
};
