const express = require("express");
const router = express.Router();
const ShippingDetailsController = require("../controllers/ShippingDetailsControllers");


router.post("/postShippingDetails", ShippingDetailsController.postShippingDetails);
router.get("/getShippingDetails", ShippingDetailsController.getShippingDetails);
router.get("/getSingleShippingDetails/:id", ShippingDetailsController.getSingleShippingDetails);
router.delete("/deleteShippingDetails/:id", ShippingDetailsController.deleteShippingDetails);
router.patch("/editShippingDetails/:id", ShippingDetailsController.editShippingDetails);


module.exports = router;
