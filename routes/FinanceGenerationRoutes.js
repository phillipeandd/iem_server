const express = require("express");
const router = express.Router();
const FinanceGenerationController = require("../controllers/FinanceGenerationControllers");


router.post("/postFinanceGenerationDetails", FinanceGenerationController.postFinanceGenerationDetails);
router.get("/getFinanceGenerationDetails", FinanceGenerationController.getFinanceGenerationDetails);
router.get("/getSingleFinanceGenerationDetails/:id", FinanceGenerationController.getSingleFinanceGenerationDetails);
router.delete("/deleteFinanceGenerationDetails/:id", FinanceGenerationController.deleteFinanceGenerationDetails);
router.patch("/editFinanceGenerationDetails/:id", FinanceGenerationController.editFinanceGenerationDetails);


module.exports = router;
