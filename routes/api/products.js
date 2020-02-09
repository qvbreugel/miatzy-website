const router = require("express").Router();
const productController = require("../../controllers/productController");

router
  .route("/")
  // GET "/api/user"
  .get(productController.getProductsById)
  .post(productController.createNewProduct);

module.exports = router;
