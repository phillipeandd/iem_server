const mongoose = require("mongoose");
const importerSchema = new mongoose.Schema(
  {
    importerName: { type: String, required: true },
    importerAddress: { type: String, required: true },
    importerEmailAddress: { type: String, required: true },
    importerContactPersonNo: { type: String, required: true },
    importertelephoneNo: { type: String, required: true },
  },
  { timestamps: true }
);

const ImporterModel = mongoose.model("Importer", importerSchema);

module.exports = ImporterModel;
