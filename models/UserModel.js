const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    alternate_email: { type: String, required: true },
    phone: { type: String, required: true },
    alternate_phone: { type: String, required: true },
    password: { type: String, required: true },
    confirm_password: { type: String, required: true },
    name: String,
    path: String,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
