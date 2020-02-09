import React, { useContext } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  InputNumber,
  Modal,
  Tooltip,
  Icon
} from "antd";
import UserContext from "../UserContext";
import API from "../utils/API";

const AddProduct = props => {
  const { Option } = Select;
  const { getFieldDecorator, getFieldValue } = props.form;

  const userContext = useContext(UserContext);

  const handleSubmit = () => {
    const productData = {
      name: getFieldValue("name"),
      category: getFieldValue("category"),
      origin: getFieldValue("origin"),
      language: getFieldValue("language"),
      description: getFieldValue("description"),
      price: getFieldValue("price"),
      ticketnumber: userContext.user.ticketnumber,
      created_by_user: userContext.user.user_id
    };
    API.postNewProduct(productData).then(res => console.log(res));
  };
  return (
    <Modal
      visible={props.addProductsVisible}
      onCancel={() => props.setAddProductsVisible(false)}
      onOk={handleSubmit}
      title="Add Product"
      okText="Add"
      width={720}
    >
      <Row>
        <Col span={24}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col span={10}>
                <Form.Item label="Product name">
                  {getFieldDecorator("name", {
                    rules: [
                      {
                        required: true,
                        message: "Please input the name of your product!",
                        whitespace: true
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={13} offset={1}>
                <Form.Item label="Select">
                  {getFieldDecorator("category", {
                    rules: [{ required: true, message: "Category" }]
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
                      <Option value="Other - Clear files">
                        Other - Buttons
                      </Option>
                      <Option value="Other - Clear files">
                        Other - Phone accessories
                      </Option>
                      <Option value="Other - Clear files">Other - Other</Option>
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
                  {getFieldDecorator("origin")(<Input />)}
                </Form.Item>
              </Col>
              <Col span={11} offset={2}>
                <Form.Item label="Language (if applicable)">
                  {getFieldDecorator("language")(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={17}>
                <Form.Item label="Description">
                  {getFieldDecorator("description", {
                    rules: [
                      {
                        required: true,
                        message: "Please write a description!",
                        whitespace: true
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={6} offset={1}>
                <Form.Item label="Price" required>
                  <span className="ant-form-text">€</span>
                  {getFieldDecorator("price", {
                    initialValue: 10
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

export default Form.create()(AddProduct);
