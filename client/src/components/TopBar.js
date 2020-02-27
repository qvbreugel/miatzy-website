import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, message, Icon } from "antd";
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
    <React.Fragment>
      <div
        style={{
          height: "12vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h1
          style={{
            marginRight: "auto",
            fontSize: 32,
            marginLeft: 16,
            marginTop: 12
          }}
        >
          Miatzy Bring &#38; Buy{" "}
          <Icon
            style={{ fontSize: 18, cursor: "pointer" }}
            type="question-circle"
            onClick={() => props.setSupportVisible(true)}
          />
          <p
            style={{
              fontSize: 12,
              fontWeight: 300,
              marginLeft: 2,
              marginTop: -10
            }}
          >
            Built proudly by{" "}
            <a href="https://cactusweb.dev/" target="_blank">
              Cactus Web Development <span style={{ fontSize: 16 }}>🌵</span>
            </a>
          </p>
        </h1>

        <Row type="flex" justify="center" align="bottom" gutter={16}>
          <Col>
            <Button icon="plus" onClick={addProductHandler}>
              Add Product
            </Button>
          </Col>
          <Col>
            <Link to="/print" target="_blank">
              <Button icon="barcode">Print Barcodes</Button>
            </Link>
          </Col>
          <Col>
            <Link to="/printlist" target="_blank">
              <Button icon="printer">Print List</Button>
            </Link>
          </Col>
          <Col>
            <Button
              icon="edit"
              onClick={() => props.setChangeTicketnumberVisible(true)}
            >
              Change Ticketnumber
            </Button>
          </Col>
          <Col style={{ marginRight: 16 }}>
            <Button icon="logout" onClick={logoutHandler}>
              Logout
            </Button>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default TopBar;
