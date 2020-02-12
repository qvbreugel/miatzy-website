const db = require("../models/index.js");

module.exports = {
  getProductsById: (req, res) => {
    db.Product.selectAllById(req.session.passport.user, data => {
      res.status(200).json(data);
    });
  },
  createNewProduct: (req, res) => {
    const productData = req.body.vals;

    db.Product.insertOne(productData, result => {
      res.status(200).json({ id: result.insertId });
    });
  },
  updateProduct: (req, res) => {
    const productData = req.body.vals;

    db.Product.updateOne(productData, result => {
      res.status(200).json(result);
    });
  },
  deleteProduct: (req, res) => {
    db.Product.deleteOne(req.body.data, data => {
      res.status(200).json(data);
    });
  }
};
