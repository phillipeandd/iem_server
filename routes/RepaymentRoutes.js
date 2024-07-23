const express = require("express");
const router = express.Router();
const RepaymentController = require("../controllers/RepaymentControllers");


router.post("/postrePaymentDetails", RepaymentController.postrePaymentDetails);
router.get("/getrePaymentDetails", RepaymentController.getrePaymentDetails);
router.get("/getSinglerePaymentDetails/:id", RepaymentController.getSinglerePaymentDetails);
router.delete("/deleterePaymentDetails/:id", RepaymentController.deleterePaymentDetails);
router.patch("/editrePaymentDetails/:id", RepaymentController.editrePaymentDetails);


module.exports = router;
