import React, { useEffect, useState } from "react";
import { Spin, Col, Typography, Row } from "antd";
import API from "../utils/API";
import Barcode from "react-barcode";
import ViewProducts from "../components/ViewProducts";

const PrintProducts = props => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { Text } = Typography;

  useEffect(() => {
    setTimeout(() => {
      if (!loading) {
        window.print();
      }
    }, 2000);
  }, [loading]);
  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row type="flex" justify="space-between">
          <Col>
            <h2 style={{ marginLeft: "16px" }}>
              Name: {props.user.firstname + " " + props.user.lastname}
            </h2>
          </Col>
          <Col>
            <Barcode value={props.user.ticketnumber} displayValue="false" />
          </Col>
          <Col>
            <h2 style={{ marginRight: "16px" }}>
              Ticketnumber: {props.user.ticketnumber}
            </h2>
          </Col>
        </Row>
      )}
      <ViewProducts type="print" setLoading={setLoading} user={props.user} />
    </div>
  );
};

export default PrintProducts;
