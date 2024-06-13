const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
// Post a User
const newUserRegister = async (req, res) => {
  const { file } = req;
  const {
    first_name,
    last_name,
    email,
    alternate_email,
    phone,
    alternate_phone,
    password,
    confirm_password,
  } = req.body;

  // Check if password and confirm_password match
  if (password !== confirm_password) {
    res.send({ message: "Password and confirm password do not match." });
    return;
  }

  const existing_user = await UserModel.findOne({ email });

  if (existing_user) {
    res.send({ message: "User already exist" });
    return;
  }
  bcrypt.hash(password, 4, async function (err, hash) {
    if (err) {
      res.send({ message: "Registration Failed", err });
    } else {
      const new_user = new UserModel({
        first_name,
        last_name,
        email,
        alternate_email,
        phone,
        alternate_phone,
        password: hash,
        confirm_password: hash,
        name: file.originalname,
        path: file.path,
      });

      await new_user.save();
      res.send({ message: "Signup succesfull..", new_user });
    }
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(401).send({ message: "Invalid email ID" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).send({ message: "Invalid password" });
  }

  if (user) {
    const hashed_password = user.password;

    const user_id = user._id;

    bcrypt.compare(password, hashed_password, function (err, result) {
      if (err) {
        res.send({ message: "Something went wrong, try again later" });
      }
      if (result) {
        const token = jwt.sign({ user_id }, process.env.SECRET);
        const name = user.name;
        const path = user.path;
        const first_name = user.first_name;
        const last_name = user.last_name;
        const email = user.email;
        const alternate_email = user.alternate_email;
        const phone = user.phone;
        const alternate_phone = user.alternate_phone;
        const id = user._id;
        const document = {
          name: name,
          path: path,
          first_name: first_name,
          last_name: last_name,
          
          email: email,
          alternate_email: alternate_email,
          phone: phone,
          alternate_phone: alternate_phone,
          id: id,
          token: token,
        };
        res.send({
          message: "Login Successfull",
          document: document,
          token: token,
        });
      } else {
        res.send({ message: "Invalid Credentials", token: null });
      }
    });
  } else {
    res.send({ message: "Invalid Credentials", token: null });
  }
};



// Get a user
const getUser = async (req, res) => {
  try {
    const user = await UserModel.find();
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get User By Id
const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const singleUser = await UserModel.findOne({ _id: id });

    res.status(404).send({ message: "Single User By Id", singleUser });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Edit User
const editUser = async (req, res) => {
  const { file } = req;
  try {
    const updateObject = { ...req.body };
    if (file) {
      updateObject.path = file.path;
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      updateObject,
      {
        new: true,
      }
    );
    if (!updatedUser) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .send({ error: "An error occurred while updating the user." });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await UserModel.deleteOne({ _id: id });
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  newUserRegister,
  login,
  getUser,
  getSingleUser,
  deleteUser,
  editUser,
};
