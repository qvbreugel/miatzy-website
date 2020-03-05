import React, { useState } from "react";
import { Input, Form, Button, Result, Icon, Row } from "antd";
import API from "../utils/API";
import LinkButton from "../components/LinkButton";

const ForgotPassword = props => {
  const [success, setSuccess] = useState(false);

  const {
    getFieldDecorator,
    getFieldValue,
    validateFields,
    setFields
  } = props.form;

  const handleSubmit = e => {
    e.preventDefault();
    validateFields(["email"], err => {
      if (!err) {
        const data = { email: getFieldValue("email") };
        API.forgotPassword(data).then(res => {
          if (res.data.affectedRows) {
            setSuccess(true);
          } else {
            setFields({
              email: {
                value: data.email,
                errors: [
                  new Error(
                    "The email address you entered is not connected to an account."
                  )
                ]
              }
            });
          }
        });
      }
    });
  };

  if (success) {
    return (
      <Result
        icon={<Icon type="mail" theme="filled" />}
        title="A link has been sent to your email address"
        subTitle="Please follow the instructions in the email to reset your password."
      />
    );
  } else {
    return (
      <div>
        <h2 style={{ textAlign: "center", margin: "auto" }}>
          Forgot your password?
        </h2>
        <p style={{ textAlign: "center", margin: "auto" }}>
          Fill in the email address you signed up with and a link to reset your
          password will be sent.
        </p>
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
              ],
              validateTrigger: "onBlur"
            })(<Input />)}
          </Form.Item>
          <Form.Item>
            <Row type="flex" justify="space-between">
              <Button
                type="primary"
                htmlType="submit"
                className="register-form-button"
                style={{ width: "45%" }}
              >
                Send reset link
              </Button>
              <LinkButton
                className="register-form-button"
                to="/register"
                style={{ width: "45%" }}
              >
                Create new account
              </LinkButton>
            </Row>
          </Form.Item>
        </Form>
      </div>
    );
  }
};

export default Form.create()(ForgotPassword);
