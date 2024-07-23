const mongoose = require("mongoose");
const rePaymentSchema = new mongoose.Schema(
  {
    financerOrganizationName: { type: String, required: true },
    transactionRefNo: { type: String, required: true },
    netAmountPayable: { type: String, required: true },
    additionalCharges: { type: String, required: true },
    totalAmount: { type: String, required: true },
    repaymentDate: { type: Date, required: true },
    repaymentCurrency: { type: String, required: true },
    reExchangeRate: { type: String, required: true },
    amountInINR: { type: String, required: true },
    bankCharges: { type: String, required: true },
  },
  { timestamps: true }
);

const RepaymentModel = mongoose.model("Repayment", rePaymentSchema);

module.exports = RepaymentModel;
