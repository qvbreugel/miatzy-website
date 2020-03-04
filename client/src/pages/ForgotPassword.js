import React from "react";
import { Input, Form, Button } from "antd";
import API from "../utils/API";

const ForgotPassword = props => {
  const { getFieldDecorator, getFieldValue } = props.form;

  const handleSubmit = e => {
    e.preventDefault();
    const data = { email: getFieldValue("email") };
    API.forgotPassword(data);
  };

  return (
    <Form style={{ width: "25%", margin: "auto" }} onSubmit={handleSubmit}>
      <Form.Item label="E-mail">
        {getFieldDecorator("email", {
          rules: [
            {
              type: "email",
              message: "The input is not valid E-mail"
            },
            {
              required: true,
              message: "Please fill in your E-mail"
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="register-form-button"
          style={{ width: "100%" }}
        >
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create()(ForgotPassword);
