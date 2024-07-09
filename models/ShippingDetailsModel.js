const mongoose = require("mongoose");

const ShipmentItemRowSchema = new mongoose.Schema({
  itemName: { type: String, default: null },
  quantity: { type: String, default: null },
  hsn: { type: String, default: null },
  rate: { type: String, default: null },
  exchangeRate: { type: String, default: null },
  hssValueUSD: { type: String, default: null },
  hssValueINR: { type: String, default: null },
  currency: { type: String, default: null },
  invoiceValue: { type: String, default: null },
  difference: { type: String, default: null },
});



const ShipmentItemRowCCSSchema = new mongoose.Schema({
  dispatchFrom: { type: String, default: null },
  dispatchTo: { type: String, default: null },
  transporterName: { type: String, default: null },
  transporterQty: { type: String, default: null },
  transporterRate: { type: String, default: null },
 
});

const DocumentStatusSchema = new mongoose.Schema({
  draftStatusFromShipper: { type: Map, of: Boolean, default: {} },
  originalStatusFromShipper: { type: Map, of: String, default: {} },
  draftStatusToClearingAgent: { type: Map, of: Boolean, default: {} },
  originalStatusToClearingAgent: { type: Map, of: String, default: {} },
});

const paymentStatusRowSchema = new mongoose.Schema({
  modeOfPayment: { type: String, default: null },
  paymentDate: { type: Date, default: null },
  paymentBankName: { type: String, default: null },
  transactionRefNo: { type: String, default: null },
  paymentAmount: { type: String, default: null },
  paymentCurrency: { type: String, default: null },
  exchangeRate: { type: String, default: null },
  amountInINR: { type: String, default: null },
  bankCharges: { type: String, default: null },
  creditPeriod: { type: String, default: null },
  paymentDueDate: { type: Date, default: null },
});
const WeightLevel1Schema = new mongoose.Schema({
  containerNumber: { type: String, default: null },
  noOfPackage: { type: Number, default: null },
  invoiceNetWeight: { type: Number, default: null },
  emptyContainerWeight: { type: Number, default: null },
  cfsWeight1: { type: Number, default: null },
  cfsWeight2: { type: Number, default: null },
  averageWeight3: { type: Number, default: null },
});

const WeightLevel2Schema = new mongoose.Schema({
  vehicleNumber: { type: String, default: null },
  noOfPackageLoad: { type: Number, default: null },
  portLoadingWeight1: { type: Number, default: null },
  portLoadingWeight2: { type: Number, default: null },
  averageWeight3: { type: Number, default: null },
  dispatchDate: { type: Date, default: null },
  ewayBillNo: { type: String, default: null },
});

const WeightLevel3Schema = new mongoose.Schema({
  vehicleNumber: { type: String, default: null },
  noOfPackageLoad: { type: Number, default: null },
  destinationWeight1: { type: Number, default: null },
  destinationWeight2: { type: Number, default: null },
  destinationWeight3: { type: Number, default: null },
  averageWeight4: { type: Number, default: null },
  materialReceivedDate: { type: Date, default: null },
});

const totalsWeightLevel1Schema = new mongoose.Schema({
  noOfPackage: { type: Number, default: null },
  invoiceNetWeight: { type: Number, default: null },
  emptyContainerWeight: { type: Number, default: null },
  cfsWeight1: { type: Number, default: null },
  cfsWeight2: { type: Number, default: null },
  averageWeight3: { type: Number, default: null },
});

const totalsWeightLevel2Schema = new mongoose.Schema({
  noOfPackageLoad: { type: Number, default: null },
  portLoadingWeight1: { type: Number, default: null },
  portLoadingWeight2: { type: Number, default: null },
  averageWeight3: { type: Number, default: null },
});

const totalsWeightLevel3Schema = new mongoose.Schema({
  noOfPackageLoad: { type: Number, default: null },
  destinationWeight1: { type: Number, default: null },
  destinationWeight2: { type: Number, default: null },
  destinationWeight3: { type: Number, default: null },
  averageWeight4: { type: Number, default: null },
});

const shippingDetailsSchema = new mongoose.Schema(
  {
    salesContractNumber: { type: String, ref: 'SalesContract' },
    shipmentWiseData: {
      exporterName: { type: String, default: null },
      hssName: { type: String, default: null },
      shipperName: { type: String, default: null },
      hssSellerInvoiceNo: { type: String, default: null },
      shipmentcountry: { type: String, default: null },
      typeOfDuty: { type: String, default: null },
      shippingLine: { type: String, default: null },
      lendingNo: { type: String, default: null },
      eta: { type: Date, default: null },
      finalDeliveryPort: { type: String, default: null },
      clearingHouseAgentName: { type: String, default: null },
      quantityInMTS: { type: String, default: null },
      exporterInvoiceNo: { type: String, default: null },
      exporterInvoiceDate: { type: String, default: null },
    },
    rows: [ShipmentItemRowSchema],
    documentsStatusData: DocumentStatusSchema,
    paymentStatusRows: [paymentStatusRowSchema],
    paymentStatusData: {
      shipperInvoiceRemarks: { type: String, default: null },
      shipperInvoiceCurrency: { type: String, default: null },
      shipperInvoiceAmount: { type: String, default: null },
      otherAmountRemarks: { type: String, default: null },
      otherAmountCurrency: { type: String, default: null },
      otherAmountAmount: { type: String, default: null },
      lessAmountRemarks: { type: String, default: null },
      lessAmountCurrency: { type: String, default: null },
      lessAmountAmount: { type: String, default: null },
      lessCreditRemarks: { type: String, default: null },
      lessCreditCurrency: { type: String, default: null },
      lessCreditAmount: { type: String, default: null },
      lessClaimRemarks: { type: String, default: null },
      lessClaimCurrency: { type: String, default: null },
      lessClaimAmount: { type: String, default: null },
    },
    customerClearingStatusData: {
      checkListReceivedDate: { type: Date, default: null },
      checkListApprovedDate: { type: Date, default: null },
      checkListApprovedBy: { type: String, default: null },
      beNo: { type: String, default: null },
      beDate: { type: Date, default: null },
      bePaymentDate: { type: Date, default: null },
      sealPhotoDate: { type: Date, default: null },
      sealPhotoRemarks: { type: String, default: null },
      cfsWeightDate: { type: Date, default: null },
      cfsWeightRemarks: { type: String, default: null },
      transporterName: { type: String, default: null },
      transporterRateINR: { type: String, default: null },
      dispatchFrom1: { type: String, default: null },
      dispatchTo1: { type: String, default: null },
      dispatchDate1: { type: Date, default: null },
      dispatchFrom2: { type: String, default: null },
      dispatchTo2: { type: String, default: null },
      dispatchDate2: { type: Date, default: null },
    },
    rowsCCS: [ShipmentItemRowCCSSchema],
    rowsWeightLevel1: [WeightLevel1Schema],
    rowsWeightLevel2: [WeightLevel2Schema],
    rowsWeightLevel3: [WeightLevel3Schema],
    totalsWeightLevel1: [totalsWeightLevel1Schema],
    totalsWeightLevel2: [totalsWeightLevel2Schema],
    totalsWeightLevel3: [totalsWeightLevel3Schema],
  },
  { timestamps: true }
);

const ShippingDetailsModel = mongoose.model(
  "ShippingDetails",
  shippingDetailsSchema
);

module.exports = ShippingDetailsModel;
