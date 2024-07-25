const express = require("express");
const router = express.Router();
const ImporterController = require("../controllers/ImporterControllers");


router.post("/postImporterDetails", ImporterController.postImporterDetails);
router.get("/getImporterDetails", ImporterController.getImporterDetails);
router.get("/getSingleImporterDetails/:id", ImporterController.getSingleImporterDetails);
router.delete("/deleteImporterDetails/:id", ImporterController.deleteImporterDetails);
router.patch("/editDetails/importer/:id", ImporterController.editImporterDetails);


module.exports = router;
