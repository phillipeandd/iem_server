const mongoose = require("mongoose");
const bankSchema = new mongoose.Schema(
  {
    bankName: { type: String, required: true },
    bankAddress: { type: String, required: true },
    bankAccountNo: { type: String, required: true },
  },
  { timestamps: true }
);

const BankModel = mongoose.model("Bank", bankSchema);

module.exports = BankModel;
