const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/forgot").post(userController.forgotPassword);
router.route("/reset/:token").get(userController.getUserByToken);
router.route("/reset").post(userController.resetPassword);

module.exports = router;
