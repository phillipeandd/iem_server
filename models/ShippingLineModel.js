const mongoose = require("mongoose");
const shippingLineSchema = new mongoose.Schema(
  {
    shippingName: { type: String, required: true },
    shippingGSTNumber: { type: String, required: true },
    shippingState: { type: String, required: true },
  },
  { timestamps: true }
);

const ShippingLineModel = mongoose.model("ShippingLine", shippingLineSchema);

module.exports = ShippingLineModel;
