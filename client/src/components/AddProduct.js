import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  message,
  Select,
  InputNumber,
  Modal,
  Tooltip,
  Icon
} from "antd";
import API from "../utils/API";

const AddProduct = props => {
  const { Option } = Select;
  const {
    getFieldDecorator,
    getFieldValue,
    resetFields,
    validateFields
  } = props.form;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [productsAdded, setProductsAdded] = useState(0);

  useEffect(() => {
    if (props.addProductsVisible) {
      console.log(props.user.products_registered);
      setProductsAdded(props.user.products_registered);
    }
  }, [props.addProductsVisible]);

  const handleSubmit = () => {
    setConfirmLoading(true);
    if (productsAdded >= 48) {
      message.error(
        "You've already added 48 products. You cannot add anymore products."
      );
      setConfirmLoading(false);
    } else {
      validateFields((errors, values) => {
        if (!errors) {
          const productData = {
            name: getFieldValue("name"),
            category: getFieldValue("category"),
            origin: getFieldValue("origin"),
            language: getFieldValue("language"),
            description: getFieldValue("description"),
            price: getFieldValue("price"),
            ticketnumber: props.user.ticketnumber,
            created_by_user: props.user.user_id
          };
          API.postNewProduct(productData).then(res => {
            if ((res.status = 200)) {
              const productsLeft = 48 - (productsAdded + 1);
              resetFields();
              setConfirmLoading(false);
              if (props.user.access_id > 1) {
                message.success(`The product has been added.`);
              } else {
                message.success(
                  `The product has been added. You can still add ${productsLeft} products.`
                );
                setProductsAdded(productsAdded + 1);
              }
            }
          });
        } else {
          setConfirmLoading(false);
        }
      });
    }
  };

  const handleCancel = () => {
    const newUser = props.user;
    newUser.products_registered = productsAdded;
    props.setUser(newUser);
    props.toggleRefresh();
    props.setAddProductsVisible(false);
  };

  const checkIfValidPrice = (rule, value, callback) => {
    const splitPrice = value.split(".");
    if (value % 1 !== 0) {
      console.log(splitPrice[1]);
      if (splitPrice[1] == 50) {
        callback();
      } else if (splitPrice[1] == 5) {
        callback();
      } else {
        callback("Price can only be entered in whole or halve euros.");
      }
    } else {
      callback();
    }
  };

  const ten = 10;
  const initialPrice = ten.toFixed(2);

  return (
    <Modal
      visible={props.addProductsVisible}
      onCancel={handleCancel}
      onOk={handleSubmit}
      confirmLoading={confirmLoading}
      title="Add Product"
      okText="Add"
      width={720}
      destroyOnClose
    >
      <Row>
        <Col span={24}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col span={10}>
                <Form.Item label="Product">
                  {getFieldDecorator("name", {
                    rules: [
                      {
                        required: true,
                        message: "Please input the name the your product",
                        whitespace: true
                      },
                      {
                        max: 64,
                        message:
                          "Product name cannot be longer than 64 characters."
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={13} offset={1}>
                <Form.Item label="Product category">
                  {getFieldDecorator("category", {
                    rules: [
                      { required: true, message: "Please select a category" }
                    ]
                  })(
                    <Select placeholder="Please select a category">
                      <Option value="Books - Artbook">Books - Artbook</Option>
                      <Option value="Books - Doujinji">Books - Doujinji</Option>
                      <Option value="Books - Light Novel">
                        Books - Light Novel
                      </Option>
                      <Option value="Books - Magazine">Books - Magazine</Option>
                      <Option value="Books - Manga">Books - Manga</Option>
                      <Option value="Books - Other">Books - Other</Option>
                      <Option value="Cosplay - Accessoires">
                        Cosplay - Accessories
                      </Option>
                      <Option value="Cosplay - Clothing">
                        Cosplay - Clothing
                      </Option>
                      <Option value="Cosplay - Wigs">Cosplay - Wigs</Option>
                      <Option value="Figures - Action figures (figma/nedoroid)">
                        Figures - Action figures (figma/nedoroid)
                      </Option>
                      <Option value="Figures - Garage kits">
                        Figures - Garage kits
                      </Option>
                      <Option value="Figures - Scaled Figures">
                        Figures - Scaled Figures
                      </Option>
                      <Option value="Figures - Trading figures">
                        Figures - Trading figures
                      </Option>
                      <Option value="Fluffy - Pillows/Pluche">
                        Fluffy - Pillows/Pluche
                      </Option>
                      <Option value="Games/Consoles - made for Microsoft console">
                        Games/Consoles - made for Microsoft console
                      </Option>
                      <Option value="Games/Consoles - made for Nintendo console">
                        Games/Consoles - made for Nintendo console
                      </Option>
                      <Option value="Games/Consoles - made for PC">
                        Games/Consoles - made for PC
                      </Option>

                      <Option value="Games/Consoles - made for Sony console">
                        Games/Consoles - made for Sony console
                      </Option>
                      <Option value="Hanged - Big (posters/wallscrolls/clocks/etc.)">
                        Hanged - Big (posters/wallscrolls/clocks/etc.)
                      </Option>
                      <Option value="Hanged - Small (keychains/etc.)">
                        Hanged - Small (keychains/etc.)
                      </Option>
                      <Option value="Media - Blu-Ray">Media - Blu-Ray</Option>
                      <Option value="Media - CD">Media - CD</Option>
                      <Option value="Media - DVD">Media - DVD</Option>
                      <Option value="Other - Buttons">Other - Buttons</Option>
                      <Option value="Other - Clear files">
                        Other - Clear files
                      </Option>
                      <Option value="Other - Phone accessories">
                        Other - Phone accessories
                      </Option>
                      <Option value="Other - Trading cards">
                        Other - Trading cards
                      </Option>
                      <Option value="Other - Other">Other - Other</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={11}>
                <Form.Item
                  label={
                    <span>
                      Origin&nbsp;
                      <Tooltip title="Enter the series or the manga this product belongs to (if applicable)">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  }
                >
                  {getFieldDecorator("origin", {
                    rules: [
                      {
                        max: 256,
                        message: "Origin cannot be longer than 256 characters."
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={11} offset={2}>
                <Form.Item label="Language (if applicable)">
                  {getFieldDecorator("language", {
                    rules: [
                      {
                        max: 128,
                        message:
                          "Language cannot be longer than 128 characters."
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={14}>
                <Form.Item
                  label={
                    <span>
                      Description&nbsp;
                      <Tooltip title="Provide extra information about the product such as scale, function, special remarks, etc. (when necessary)">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  }
                >
                  {getFieldDecorator("description", {
                    rules: [
                      {
                        max: 256,
                        message:
                          "Description cannot be longer than 256 characters."
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={4} offset={1}>
                <Form.Item label="Price" required>
                  <span className="ant-form-text">€</span>
                  {getFieldDecorator("price", {
                    rules: [
                      {
                        required: true,
                        message: "Please fill in a price",
                        whitespace: true
                      },
                      {
                        validator: checkIfValidPrice
                      }
                    ],
                    initialValue: initialPrice
                  })(<Input style={{ width: "80%" }} min={0} />)}
                </Form.Item>
              </Col>
              {props.user.access_id < 2 ? (
                <Col span={4} offset={1}>
                  <Form.Item
                    label={
                      <span>
                        You will receive&nbsp;
                        <Tooltip title="A 10% fee is deducted when selling through Miatzy">
                          <Icon type="question-circle-o" />
                        </Tooltip>
                      </span>
                    }
                  >
                    <span className="ant-form-text">
                      €{(getFieldValue("price") * 0.9).toFixed(2)}
                    </span>
                  </Form.Item>
                </Col>
              ) : (
                ""
              )}
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default Form.create()(AddProduct);
