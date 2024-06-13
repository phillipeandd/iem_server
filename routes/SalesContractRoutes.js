const express = require("express");
const router = express.Router();
const SalesContractController = require("../controllers/SalesContractControllers");


router.post("/postSalesContractDetails", SalesContractController.postSalesContractDetails);
router.get("/getSalesContractDetails", SalesContractController.getSalesContractDetails);
router.get("/getSingleSalesContractDetails/:id", SalesContractController.getSingleSalesContractDetails);
router.delete("/deleteSalesContractDetails/:id", SalesContractController.deleteSalesContractDetails);
router.patch("/editSalesContractDetails/:id", SalesContractController.editSalesContractDetails);


module.exports = router;
