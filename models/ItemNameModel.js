const mongoose = require("mongoose");
const itemNameSchema = new mongoose.Schema(
  {
    itemSlNo: { type: String, required: true },
    itemName: { type: String, required: true },
    
  },
  { timestamps: true }
);

const ItemNameModel = mongoose.model("ItemName", itemNameSchema);

module.exports = ItemNameModel;
