import React from "react";
import { Form, Input, Button } from "antd";
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
      <Form.Item label="Ticket number">
        {getFieldDecorator("ticketnumber", {
          rules: [
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create()(Register);
