const express = require("express");
const router = express.Router();
const TransporterNameController = require("../controllers/TransporterNameControllers");


router.post("/postTransporterNameDetails", TransporterNameController.postTransporterNameDetails);
router.get("/getTransporterNameDetails", TransporterNameController.getTransporterNameDetails);
router.get("/getSingleTransporterNameDetails/:id", TransporterNameController.getSingleTransporterNameDetails);
router.delete("/deleteTransporterNameeDetails/:id", TransporterNameController.deleteTransporterNameDetails);
router.patch("/editTransporterNameDetails/:id", TransporterNameController.editTransporterNameDetails);


module.exports = router;
