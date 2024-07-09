const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    alternate_email: { type: String, required: false },
    phone: { type: String, required: true },
    alternate_phone: { type: String, required: false },
    password: { type: String, required: true },
    name: String,
    path: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
