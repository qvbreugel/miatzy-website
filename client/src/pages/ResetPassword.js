import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import API from "../utils/API";

const ResetPassword = props => {
  const { getFieldDecorator, getFieldValue } = props.form;

  useEffect(() => {
    const token = props.match.params.token;
    API.reset().then(res => console.log(res));
  }, []);

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue("password")) {
      callback("The passwords do not match");
    } else {
      callback();
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item label="Password">
        {getFieldDecorator("password", {
          rules: [
            {
              required: true,
              message: "Please fill in a password"
            }
          ]
        })(<Input.Password />)}
      </Form.Item>
      <Form.Item label="Confirm Password">
        {getFieldDecorator("confirm", {
          rules: [
            {
              required: true,
              message: "Please confirm your password"
            },
            {
              validator: compareToFirstPassword
            }
          ],
          validateTrigger: "onBlur"
        })(<Input.Password />)}
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

export default Form.create()(ResetPassword);
