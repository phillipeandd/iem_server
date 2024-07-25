const express = require("express");
const router = express.Router();
const ShippingLineController = require("../controllers/ShippingLineControllers");


router.post("/postShippingLineDetails", ShippingLineController.postShippingLineDetails);
router.get("/getShippingLineDetails", ShippingLineController.getShippingLineDetails);
router.get("/getSingleShippingLineDetails/:id", ShippingLineController.getSingleShippingLineDetails);
router.delete("/deleteShippingLineDetails/:id", ShippingLineController.deleteShippingLineDetails);
router.patch("/editDetails/shippingline/:id", ShippingLineController.editShippingLineDetails);


module.exports = router;
