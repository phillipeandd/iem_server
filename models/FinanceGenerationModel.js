const mongoose = require("mongoose");
const financeGenerationSchema = new mongoose.Schema(
  {
    financerOrganizationName: { type: String, required: true },
    transactionRefNo: { type: String, required: true },
    salesContractNumber: { type: String, required: true },
    exporterName: { type: String, required: true },
    exporterInvoiceValue: { type: String, required: true },
    invoiceDate: { type: String, required: true },
    financeCurrency: { type: String, required: true },
    creditTakenDate: { type: String, required: true },
    creditDueDate: { type: String, required: true },
    creditPeriod: { type: String, required: true },
  },
  { timestamps: true }
);

const FinanceGenerationModel = mongoose.model("FinanceGeneration", financeGenerationSchema);

module.exports = FinanceGenerationModel;
