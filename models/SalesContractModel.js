const mongoose = require("mongoose");

const floatingPriceRowSchema = new mongoose.Schema({
  date: { type: String, default: null },
  quantity: { type: String, default: null },
  lmePrice: { type: String, default: null },
  rate: { type: String, default: null },
  finalPrice: { type: String, default: null },
});

const advancePaymentDetailSchema = new mongoose.Schema({
  date: { type: String, default: null },
  bankName: { type: String, default: null },
  transactionReferenceNo: { type: String, default: null },
  amount: { type: String, default: null },
  currency: { type: String, default: null },
  exchangeRates: { type: String, default: null },
  amountInINR: { type: String, default: null },
  bankCharges: { type: String, default: null },
});

const salesContractSchema = new mongoose.Schema(
  {
    salesContractNumber: { type: String, required: true, unique: true },
    salesContractDate: { type: String, required: true },
    exporterName: { type: String, required: true },
    salesContractContactPersonName: { type: String, default: null },
    importingFirmName: { type: String, default: null },
    typeOfDuty: { type: String, default: null },
    typeOfImport: { type: String, default: null },
    paymentMode: { type: String, default: null },
    itemName: { type: String, default: null },
    itemUnit: { type: String, default: null },
    fixedQuantity: { type: String, default: null },
    priceTerms: { type: String, default: null },
    salesContractRemarks: { type: String, default: null },
    floatingPriceRows: [floatingPriceRowSchema],
    advancePaymentDetails: [advancePaymentDetailSchema],
  },
  { timestamps: true }
);

const SalesContractModel = mongoose.model("SalesContract", salesContractSchema);

module.exports = SalesContractModel;
