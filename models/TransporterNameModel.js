const mongoose = require("mongoose");
const transporterNameSchema = new mongoose.Schema(
  {
    transporterName: { type: String, required: true },
    transporterNumber: { type: String, required: true },
    
  },
  { timestamps: true }
);

const TransporterNameModel = mongoose.model("TransporterName", transporterNameSchema);

module.exports = TransporterNameModel;
