const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserControllers");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

const upload = multer({ storage: storage });

router.post("/signuser", upload.single("file"), UserController.newUserRegister);
router.post("/login", UserController.login);
router.get("/users", UserController.getUser);
router.get("/singleUser/:id", UserController.getSingleUser);
router.delete("/deleteUser/:id", UserController.deleteUser);
router.patch("/editUser/:id", upload.single("file"), UserController.editUser);
router.post('/requestPasswordReset', UserController.requestPasswordReset);
router.post('/reset/:token', UserController.resetPassword);

module.exports = router;
