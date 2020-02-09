import React, { useContext } from "react";
import { Row, Col, Button, message } from "antd";
import userContext from "../UserContext";
import API from "../utils/API";

const TopBar = props => {
  const context = useContext(userContext);

  const addProductHandler = () => {
    API.getLoginStatus().then(res => {
      if (res.user.access_id > 1) {
        props.setAddProductsVisible(true);
      } else if (res.user.products_registered >= 50) {
        message.error("You have reached the limit of 50 registered products");
      } else if (res.user.products_registered < 50) {
        props.setAddProductsVisible(true);
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
          <Button>Print Barcodes</Button>
        </Col>
        <Col>
          <Button>Change Ticketnumber</Button>
        </Col>
        <Col>
          <Button onClick={e => context.getUserLogout(e)}>Logout</Button>
        </Col>
      </Row>
    </div>
  );
};

export default TopBar;
