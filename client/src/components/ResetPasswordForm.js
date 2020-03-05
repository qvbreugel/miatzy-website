import React from "react";
import { Form, Input, Button, Row } from "antd";
import LinkButton from "../components/LinkButton";
import API from "../utils/API";

const ResetPasswordForm = props => {
  const {
    getFieldDecorator,
    getFieldValue,
    validateFieldsAndScroll
  } = props.form;

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
      if (err) {
        console.log(err);
      } else {
        const data = {
          password: getFieldValue("password"),
          token: props.token
        };
        API.resetPassword(data).then(res => {
          if (res.data.affectedRows) {
            props.setScreen("success");
          }
        });
      }
    });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "auto" }}>
        Reset your password
      </h2>
      <p style={{ textAlign: "center", margin: "auto" }}>
        Enter a new password and confirm it to change your password.
      </p>
      <Form onSubmit={handleSubmit} style={{ width: "25%", margin: "auto" }}>
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
          <Row type="flex" justify="space-between">
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
              style={{ width: "45%" }}
            >
              Change password
            </Button>
            <LinkButton
              className="register-form-button"
              to="/"
              style={{ width: "45%" }}
            >
              Login instead
            </LinkButton>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Form.create()(ResetPasswordForm);
