const mongoose = require("mongoose");
const financerSchema = new mongoose.Schema(
  {
    financerOrganizationName: { type: String, required: true },
    financerAddress: { type: String, required: true },
    financerContactPersonNo: { type: String, required: true },
    financerBankAccountNo: { type: String, required: true },
    financerSwiftCode: { type: String, required: true },
    financerBankName: { type: String, required: true },
    limitOfFinance: { type: String, required: true },
    financerCurrency: { type: String, required: true },
  },
  { timestamps: true }
);

const FinancerModel = mongoose.model("Financer", financerSchema);

module.exports = FinancerModel;
