const router = require("express").Router();
const productController = require("../../controllers/productController");

router
  .route("/")
  .get(productController.getProductsById)
  .post(productController.createNewProduct);

router.route("/delete").post(productController.deleteProduct);
router.route("/update").post(productController.updateProduct);

module.exports = router;
