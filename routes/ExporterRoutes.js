const express = require("express");
const router = express.Router();
const ExporterController = require("../controllers/ExporterControllers");


router.post("/postExporterDetails", ExporterController.postExporterDetails);
router.get("/getExporterDetails", ExporterController.getExporterDetails);
router.get("/getSingleExporterDetails/:id", ExporterController.getSingleExporterDetails);
router.delete("/deleteExporterDetails/:id", ExporterController.deleteExporterDetails);
router.patch("/editExporterDetails/:id", ExporterController.editExporterDetails);


module.exports = router;
