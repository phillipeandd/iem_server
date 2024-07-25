const express = require("express");
const router = express.Router();
const ClearingAgentController = require("../controllers/ClearingAgentControllers");


router.post("/postClearingAgentDetails", ClearingAgentController.postClearingAgentDetails);
router.get("/getClearingAgentDetails", ClearingAgentController.getClearingAgentDetails);
router.get("/getSingleClearingAgentDetails/:id", ClearingAgentController.getSingleClearingAgentDetails);
router.delete("/deleteClearingAgentDetails/:id", ClearingAgentController.deleteClearingAgentDetails);
router.patch("/editDetails/clearing_agent/:id", ClearingAgentController.editClearingAgentDetails);


module.exports = router;
