import React, { useEffect, useState } from "react";
import { Spin, Col, Row } from "antd";
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
      setTimeout(() => {
        window.print();
      }, 1000);
    });
  }, []);
  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : (
        products.map(product => (
          <Col span={12}>
            <div className="sticker">
              <h3 className="productName">{product.name}</h3>
              <p className="productDescription">{product.description}</p>
              <h2>&euro;{product.price.toFixed(2)}</h2>
              <Barcode
                value={
                  product.ticketnumber +
                  "." +
                  product.product_id +
                  " " +
                  "EUR" +
                  product.price
                }
                width={1}
                displayValue="false"
              />
            </div>
          </Col>
        ))
      )}
    </div>
  );
};

export default PrintProducts;
