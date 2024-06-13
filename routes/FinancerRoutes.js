const express = require("express");
const router = express.Router();
const FinancerController = require("../controllers/FinancerControllers");


router.post("/postFinancerDetails", FinancerController.postFinancerDetails);
router.get("/getFinancerDetails", FinancerController.getFinancerDetails);
router.get("/getSingleFinancerDetails/:id", FinancerController.getSingleFinancerDetails);
router.delete("/deleteFinancerDetails/:id", FinancerController.deleteFinancerDetails);
router.patch("/editFinancerDetails/:id", FinancerController.editFinancerDetails);


module.exports = router;
