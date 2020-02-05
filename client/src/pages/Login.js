import React, { useState, useContext } from "react";
import { Form, Icon, Input, Button, Row, Col } from "antd";
import UserContext from "../UserContext";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(UserContext);

  const handleSubmit = event => {
    event.preventDefault();
    context.postUserLogin({
      username: username,
      password: password
    });
  };
  const { getFieldDecorator } = props.form;
  return (
    <div className="login">
      <Row type="flex" justify="space-around" align="bottom">
        <Col span={6}>
          <h1 style={{ color: "white", fontSize: "64px" }}>Cercom</h1>
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: "#2482c5" }} />}
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
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: "#2482c5" }} />}
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
                type="primary"
                htmlType="submit"
                size="large"
                className="login-form-button"
                style={{
                  color: "#374147",
                  backgroundColor: "#f6fafd",
                  width: "50%"
                }}
              >
                Log in
              </Button>
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
Login.contextType = UserContext;
export default Form.create()(Login);
