import React from "react";
import { Form, Input, Button, Row, Col, Popover, Icon } from "antd";
import { Link } from "react-router-dom";
import API from "../utils/API";

const Register = props => {
  const { getFieldDecorator, getFieldValue } = props.form;

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          username: getFieldValue("username"),
          password: getFieldValue("password"),
          email: getFieldValue("email"),
          ticketnumber: getFieldValue("ticketnumber"),
          access_id: 1
        };
        API.postNewUser(data).then(res => console.log(res));
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 style={{ color: "black", fontSize: "64px", textAlign: "center" }}>
        Miatzy
      </h1>
      <Row justify="center" type="flex" gutter={[32]}>
        <Col span={6}>
          <Form.Item label="Username">
            {getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  message: "Please input your nickname!",
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label={
              <span>
                Ticket Number&nbsp;
                <Popover
                  title="Ticket Number"
                  content={
                    <div style={{ width: 392 }}>
                      Use the unique number on the ticket you bought for the
                      convention. If you do not have a ticket yet, you may now
                      use a random unique combination of characters. Be sure to
                      change your ticket number into a valid one before printing
                      your barcodes as this will be checked when handing in your
                      products at the convention.
                    </div>
                  }
                >
                  <Icon type="question-circle-o" />
                </Popover>
              </span>
            }
          >
            {getFieldDecorator("ticketnumber", {
              rules: [
                {
                  required: true,
                  message: "Please input a ticket number",
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center" type="flex" gutter={[32]}>
        <Col span={6}>
          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center" type="flex">
        <Col span={8}>
          <Form.Item label="E-mail">
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center" type="flex">
        <Col span={6}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
            >
              Register
            </Button>
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center" type="flex">
        If you already have an account, you can
        <Link to="/" style={{ color: "#FF7926" }}>
          &nbsp;login here
        </Link>
      </Row>
    </Form>
  );
};

export default Form.create()(Register);
