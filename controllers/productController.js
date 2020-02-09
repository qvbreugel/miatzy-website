const db = require("../models/index.js");

module.exports = {
  getProductsById: (req, res) => {
    db.Product.selectAllById(req.session.passport.user, data => {
      res.status(200).json(data);
    });
  },
  createNewProduct: (req, res) => {
    console.log(req.body);

    const productData = req.body.vals; // grab onto the new user array of values

    db.Product.insertOne(productData, result => {
      res.status(200).json({ id: result.insertId });
    });
  }
};
