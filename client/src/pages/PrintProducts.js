import React, { useEffect, useState } from "react";
import { Spin, Col, Row, Typography } from "antd";
import API from "../utils/API";
import Barcode from "react-barcode";

const PrintProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { Text } = Typography;

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
          <Col span={8}>
            <div className="sticker">
              <Text>{product.name}</Text>
              <br />
              <Text type="secondary">
                {product.ticketnumber}.{product.product_id}
              </Text>
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
