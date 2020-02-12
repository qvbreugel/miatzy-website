import React, { useState } from "react";
import { Form, Icon, Input, Button, Row, Col } from "antd";
import { Link, Redirect } from "react-router-dom";
import API from "../utils/API";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { getFieldDecorator } = props.form;

  const handleSubmit = event => {
    event.preventDefault();
    const userData = { username: username, password: password };
    API.postUserLogin(userData, (err, res) => {
      if (err === true) {
        return console.log("an error occurred failed to log user in.");
      }
      if (res.user.access_id > 0) {
        props.setUser(res.user);
      }
    });
  };

  return props.user.access_id > 0 ? (
    <Redirect to="/products" />
  ) : (
    <div>
      <Row type="flex" justify="space-around" align="bottom">
        <Col span={6}>
          <h1 style={{ color: "black", fontSize: "64px", textAlign: "center" }}>
            Miatzy
          </h1>
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input your username" }
                ]
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: "#FF7926" }} />}
                  size="large"
                  placeholder="Username"
                  onChange={e => {
                    setUsername(e.target.value);
                  }}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your password" }
                ]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: "#FF7926" }} />}
                  type="password"
                  size="large"
                  placeholder="Password"
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                size="large"
                className="login-form-button"
                style={{
                  width: "100%"
                }}
              >
                Log in
              </Button>
              Or
              <Link to="/register" style={{ color: "#FF7926" }}>
                &nbsp;register now!
              </Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default Form.create()(Login);
