import React, { useEffect, useState } from "react";
import { Spin, Col, Typography, Row } from "antd";
import Barcode from "react-barcode";
import ViewProducts from "../components/ViewProducts";

const PrintList = props => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { Text } = Typography;

  useEffect(() => {
    console.log(props.user);
    setTimeout(() => {
      console.log(props.user);
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
        <React.Fragment>
          <Row type="flex" justify="left">
            <h1 style={{ textAlign: "left", marginLeft: "16px" }}>
              Miatzy Bring &#38; Buy
            </h1>
          </Row>
          <Row type="flex" justify="space-between">
            <Col style={{ marginLeft: "8px" }}>
              <Barcode
                value={props.user.ticketnumber}
                height="50"
                displayValue="false"
              />
            </Col>
            <Col>
              <h2 style={{ marginRight: "16px" }}>
                Name: {props.user.firstname + " " + props.user.lastname}
                <br />
                Ticketnumber: {props.user.ticketnumber}
              </h2>
            </Col>
          </Row>
        </React.Fragment>
      )}
      <ViewProducts type="print" setLoading={setLoading} user={props.user} />
    </div>
  );
};

export default PrintList;
