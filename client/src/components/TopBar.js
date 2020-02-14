import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, message } from "antd";
import API from "../utils/API";

const TopBar = props => {
  const addProductHandler = () => {
    if (props.user.access_id > 1) {
      props.setAddProductsVisible(true);
    } else if (props.user.products_registered >= 50) {
      message.error("You have reached the limit of 50 registered products");
    } else if (props.user.products_registered < 50) {
      props.setAddProductsVisible(true);
    }
  };

  const logoutHandler = () => {
    API.getLoggedOut().then(res => {
      if ((res.status = 200)) {
        props.setUser(res.data.user);
      }
    });
  };

  return (
    <div>
      <Row type="flex" justify="space-between">
        <Col>
          <Button onClick={addProductHandler}>Add Product</Button>
        </Col>
        <Col>
          <Link to="/print">
            <Button disabled>Print Barcodes</Button>
          </Link>
        </Col>
        <Col>
          <Button onClick={() => props.setChangeTicketnumberVisible(true)}>
            Change Ticketnumber
          </Button>
        </Col>
        <Col>
          <Button onClick={logoutHandler}>Logout</Button>
        </Col>
      </Row>
    </div>
  );
};

export default TopBar;
