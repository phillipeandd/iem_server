const mongoose = require("mongoose");
const exporterSchema = new mongoose.Schema(
  {
    exporterName: { type: String, required: true },
    exporterEmailAddress: { type: String, required: true },
    exporterAddress: { type: String, required: true },
    exporterContactPersonNo: { type: String, required: true },
    exportertelephoneNo: { type: String, required: true },
    exportercountry: { type: String, default:null },
  },
  { timestamps: true }
);

const ExporterModel = mongoose.model("Exporter", exporterSchema);

module.exports = ExporterModel;
