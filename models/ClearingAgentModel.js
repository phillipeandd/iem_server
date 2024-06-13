const mongoose = require("mongoose");
const clearingAgentSchema = new mongoose.Schema(
  {
    agentCompanyName: { type: String, required: true },
    agentEmailAddress: { type: String, required: true },
    agentContactPersonName: { type: String, required: true },
    agentContactPersonNo: { type: String, required: true },
    agentAddress: { type: String, required: true },
   
   
  },
  { timestamps: true }
);

const ClearingAgentModel = mongoose.model("ClearingAgent", clearingAgentSchema);

module.exports = ClearingAgentModel;
