const express = require("express");
const router = express.Router();
const ItemNameController = require("../controllers/ItemNameControllers");


router.post("/postItemNameDetails", ItemNameController.postItemNameDetails);
router.get("/getItemNameDetails", ItemNameController.getItemNameDetails);
router.get("/getSingleItemNameDetails/:id", ItemNameController.getSingleItemNameDetails);
router.delete("/deleteItemNameDetails/:id", ItemNameController.deleteItemNameDetails);
router.patch("/editItemNameDetails/:id", ItemNameController.editItemNameDetails);


module.exports = router;
