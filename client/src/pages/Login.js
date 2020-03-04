import React, { useState } from "react";
import { Form, Icon, Input, Button, Row, Col, notification } from "antd";
import { Link, Redirect } from "react-router-dom";
import API from "../utils/API";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { getFieldDecorator, validateFieldsAndScroll } = props.form;

  const handleSubmit = event => {
    event.preventDefault();
    const userData = { username: username, password: password };
    API.postUserLogin(userData, (err, res) => {
      if (err === true) {
        console.log(res);
        setError(true);
        validateFieldsAndScroll();
        return console.log("an error occurred failed to log user in.");
      }
      if (res.user.access_id > 0) {
        props.setUser(res.user);
        setTimeout(() => {
          notification.warning({
            message: "Closing date",
            description:
              "You cannot add products after May 1, 20:00. At that moment, product submissions will be closed. Any unregistered products cannot be sold at the convention.",
            duration: 0
          });
          notification.info({
            message: "In development",
            description:
              "The application you're using in still in development. Some errors may still be present and crashes could occur. Use the question mark next to the miatzy title if you'd like to report an error, crash or just want to ask a question.",
            duration: 0
          });
        }, 5000);
        setTimeout(() => {
          console.log("Log out");
          API.getLoggedOut().then(res => {
            props.setUser(res.data.user);
          });
        }, 7200000);
      }
    });
  };

  const checkLoginInfo = (rule, value, callback) => {
    if (error) {
      callback(
        "An error ocurred while trying to login. Please check your username and password"
      );
    } else {
      callback();
    }
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
                  { required: true, message: "Please input your username" },
                  {
                    validator: checkLoginInfo
                  }
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
              <Link to="/forgotpassword" style={{ color: "#FF7926" }}>
                &nbsp;Forgot password?
              </Link>
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
              <Link to="/register" style={{ color: "#FF7926", margin: "auto" }}>
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
