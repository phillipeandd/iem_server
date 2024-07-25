const express = require("express");
const router = express.Router();
const BankController = require("../controllers/BankControllers");


router.post("/postBankDetails", BankController.postBankDetails);
router.get("/getBankDetails", BankController.getBankDetails);
router.get("/getSingleBankDetails/:id", BankController.getSingleBankDetails);
router.delete("/deleteBankDetails/:id", BankController.deleteBankDetails);
router.patch("/editDetails/bank/:id", BankController.editBankDetails);


module.exports = router;
