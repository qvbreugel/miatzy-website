import React, { useState } from "react";
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

const EditProduct = props => {
  const { Option } = Select;
  const { getFieldDecorator, getFieldValue, resetFields } = props.form;
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleSubmit = () => {
    setConfirmLoading(true);
    let changesMade = false;
    let product = {
      name: props.selectedProduct.name,
      category: props.selectedProduct.category,
      origin: props.selectedProduct.origin,
      language: props.selectedProduct.language,
      description: props.selectedProduct.description,
      price: props.selectedProduct.price,
      id: props.selectedProduct.id
    };

    if (getFieldValue("name") !== product.name) {
      changesMade = true;
      product.name = getFieldValue("name");
    }
    if (getFieldValue("category") !== product.category) {
      changesMade = true;
      product.category = getFieldValue("category");
    }
    if (getFieldValue("origin") !== product.origin) {
      changesMade = true;
      product.origin = getFieldValue("origin");
    }
    if (getFieldValue("language") !== product.language) {
      changesMade = true;
      product.language = getFieldValue("language");
    }
    if (getFieldValue("description") !== product.description) {
      changesMade = true;
      product.description = getFieldValue("description");
    }
    if (getFieldValue("price") !== product.price) {
      changesMade = true;
      product.price = getFieldValue("price");
    }
    if (changesMade) {
      API.updateProduct(product).then(res => {
        if ((res.status = 200)) {
          setConfirmLoading(false);
          message.success(`The product has been edited.`);
        }
      });
    } else {
      message.warning("Nothing was changed");
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    resetFields();
    props.toggleRefresh();
    props.setEditProductsVisible(false);
  };

  return (
    <Modal
      visible={props.editProductsVisible}
      onCancel={handleCancel}
      onOk={handleSubmit}
      confirmLoading={confirmLoading}
      title="Edit Product"
      okText="Edit"
      width={720}
    >
      <Row>
        <Col span={24}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col span={10}>
                <Form.Item label="Product name">
                  {getFieldDecorator("name", {
                    initialValue: props.selectedProduct.name
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={13} offset={1}>
                <Form.Item label="Select">
                  {getFieldDecorator("category", {
                    initialValue: props.selectedProduct.category
                  })(
                    <Select placeholder="Please select a category">
                      <Option value="Figures - Scaled Figures">
                        Figures - Scaled Figures
                      </Option>
                      <Option value="Figures - Trading figures">
                        Figures - Trading figures
                      </Option>
                      <Option value="Figures - Action figures (figma/nedoroid)">
                        Figures - Action figures (figma/nedoroid)
                      </Option>
                      <Option value="Figures - Garage kits">
                        Figures - Garage kits
                      </Option>
                      <Option value="Cosplay - Clothing">
                        Cosplay - Clothing
                      </Option>
                      <Option value="Cosplay - Accessoires">
                        Cosplay - Accessories
                      </Option>
                      <Option value="Cosplay - Wigs">Cosplay - Wigs</Option>
                      <Option value="Hanged - Small (posters/wallscrolls/clocks/etc.)">
                        Hanged - Small (posters/wallscrolls/clocks/etc.)
                      </Option>
                      <Option value="Hanged - Big (posters/wallscrolls/clocks/etc.)">
                        Hanged - Big (keychains/etc.)
                      </Option>
                      <Option value="Media - Blu-Ray">Media - Blu-Ray</Option>
                      <Option value="Media - DVD">Media - DVD</Option>
                      <Option value="Media - CD">Media - CD</Option>
                      <Option value="Games/Consoles - made for Nintendo console">
                        Games/Consoles - made for Nintendo console
                      </Option>
                      <Option value="Games/Consoles - made for Microsoft console">
                        Games/Consoles - made for Microsoft console
                      </Option>
                      <Option value="Games/Consoles - made for Sony console">
                        Games/Consoles - made for Sony console
                      </Option>
                      <Option value="Games/Consoles - made for PC">
                        Games/Consoles - made for PC
                      </Option>
                      <Option value="Books - Manga">Books - Manga</Option>
                      <Option value="Books - Artbook">Books - Artbook</Option>
                      <Option value="Books - Magazine">Books - Magazine</Option>
                      <Option value="Books - Doujinji">Books - Doujinji</Option>
                      <Option value="Fluffy - Pillows/Pluche">
                        Fluffy - Pillows/Pluche
                      </Option>
                      <Option value="Other - Clear files">
                        Other - Clear files
                      </Option>
                      <Option value="Other - Trading cards">
                        Other - Trading cards
                      </Option>
                      <Option value="Other - Buttons">Other - Buttons</Option>
                      <Option value="Other - Phone accessories">
                        Other - Phone accessories
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
                    initialValue: props.selectedProduct.origin
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={11} offset={2}>
                <Form.Item label="Language (if applicable)">
                  {getFieldDecorator("language", {
                    initialValue: props.selectedProduct.language
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={17}>
                <Form.Item label="Description">
                  {getFieldDecorator("description", {
                    initialValue: props.selectedProduct.description
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={6} offset={1}>
                <Form.Item label="Price">
                  <span className="ant-form-text">€</span>
                  {getFieldDecorator("price", {
                    initialValue: props.selectedProduct.price
                  })(<InputNumber min={0} />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default Form.create()(EditProduct);
