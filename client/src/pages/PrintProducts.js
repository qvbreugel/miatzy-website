import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import API from "../utils/API";
import Barcode from "react-barcode";

const PrintProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.getAllProductsById().then(res => {
      let fetchedProducts = [];
      res.map((product, index) => {
        product["key"] = product.id;
        product["product_id"] = index + 1;
        fetchedProducts.push(product);
      });
      setProducts(fetchedProducts);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : (
        products.map(product => (
          <Barcode
            value={
              product.ticketnumber +
              "." +
              product.product_id +
              " " +
              "EUR" +
              product.price
            }
          />
        ))
      )}
    </div>
  );
};

export default PrintProducts;
