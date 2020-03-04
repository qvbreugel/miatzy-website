import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import API from "../utils/API";

const ResetPassword = props => {
  const {
    getFieldDecorator,
    getFieldValue,
    validateFieldsAndScroll
  } = props.form;

  useEffect(() => {
    const token = props.match.params.token;
    API.getUserByToken(token).then(res => console.log(res));
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
    validateFieldsAndScroll((err, values) => {
      if (err) throw err;
      else {
        const data = {
          password: getFieldValue("password"),
          token: props.match.params.token
        };
        API.resetPassword(data).then(res => console.log(res));
      }
    });
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
