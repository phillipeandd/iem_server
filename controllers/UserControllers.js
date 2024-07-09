const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

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
    return res.status(400).send({ message: "Password and confirm password do not match." });
  }

  try {
    const existing_user = await UserModel.findOne({ email });

    if (existing_user) {
      return res.status(400).send({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const new_user = new UserModel({
      first_name,
      last_name,
      email,
      alternate_email,
      phone,
      alternate_phone,
      password: hashedPassword,
      name: file ? file.originalname : undefined,
      path: file ? file.path : undefined,
    });

    await new_user.save();
    res.status(201).send({ message: "Signup successful", new_user });
  } catch (err) {
    res.status(500).send({ message: "Registration failed", error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: "Invalid email ID" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ user_id: user._id }, process.env.SECRET, { expiresIn: '1h' });

    const document = {
      name: user.name,
      path: user.path,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      alternate_email: user.alternate_email,
      phone: user.phone,
      alternate_phone: user.alternate_phone,
      id: user._id,
      token,
    };

    res.send({ message: "Login successful", document, token });
  } catch (err) {
    res.status(500).send({ message: "Something went wrong, try again later", error: err.message });
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

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User with this email does not exist" });
    }

    const token = crypto.randomBytes(20).toString('hex');

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now

    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL,
      subject: 'Password Reset For Import Export Management(IEM)',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      http://${req.headers.host}/reset/${token}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Password reset link sent to email' });

  } catch (err) {
    res.status(500).send({ message: 'Error requesting password reset', error: err.message });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).send({ message: "Passwords do not match" });
  }

  try {
    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send({ message: "Password reset token is invalid or has expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).send({ message: "Password has been reset successfully" });

  } catch (err) {
    res.status(500).send({ message: "Error resetting password", error: err.message });
  }
};

module.exports = {
  newUserRegister,
  login,
  getUser,
  getSingleUser,
  deleteUser,
  editUser,
  requestPasswordReset,
  resetPassword

};
