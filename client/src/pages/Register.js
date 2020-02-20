import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Popover, Icon } from "antd";
import { Link, Redirect } from "react-router-dom";
import API from "../utils/API";

const Register = props => {
  const {
    getFieldDecorator,
    getFieldValue,
    validateFieldsAndScroll
  } = props.form;
  const [usernames, setUsernames] = useState([]);
  const [ticketnumbers, setTicketnumbers] = useState([]);
  const [emails, setEmails] = useState([]);
  const [accountCreated, setAccountCreated] = useState(false);

  useEffect(() => {
    API.getAllUsers().then(res => {
      const fetchedUsernames = [];
      const fetchedTicketnumbers = [];
      const fetchedEmails = [];
      res.map(user => {
        fetchedUsernames.push(user.username);
        fetchedTicketnumbers.push(user.ticketnumber);
        fetchedEmails.push(user.email);
      });
      setUsernames(fetchedUsernames);
      setTicketnumbers(fetchedTicketnumbers);
      setEmails(fetchedEmails);
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    let errorsFound = false;
    validateFieldsAndScroll((err, values) => {
      if (err) {
        errorsFound = true;
      }
    });
    if (!errorsFound) {
      const data = {
        firstname: getFieldValue("firstname"),
        lastname: getFieldValue("lastname"),
        username: getFieldValue("username"),
        password: getFieldValue("password"),
        email: getFieldValue("email"),
        ticketnumber: getFieldValue("ticketnumber"),
        access_id: 1
      };
      console.log(data);
      API.postNewUser(data).then(res => {
        if (res.status === 200) {
          const loginData = {
            username: getFieldValue("username"),
            password: getFieldValue("password")
          };
          API.postUserLogin(loginData, (err, res) => {
            if (err === true) {
              return console.log("an error occurred failed to log user in.");
            }
            if (res.user.access_id > 0) {
              props.setUser(res.user);
              setAccountCreated(true);
            }
          });
        }
      });
    }
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue("password")) {
      callback("The passwords do not match");
    } else {
      callback();
    }
  };

  const compareToUsernames = (rule, value, callback) => {
    if (value) {
      usernames.forEach(username => {
        if (value === username) {
          callback("This username already exists");
        }
      });
    } else {
      callback();
    }
  };

  const compareToTicketnumbers = (rule, value, callback) => {
    if (value) {
      ticketnumbers.forEach(ticketnumber => {
        if (value === ticketnumber) {
          callback("This ticket number is already registered");
        }
      });
    } else {
      callback();
    }
  };

  const compareToEmails = (rule, value, callback) => {
    if (value) {
      emails.forEach(email => {
        if (value === email) {
          callback("This email is already registered");
        }
      });
    } else {
      callback();
    }
  };

  return accountCreated ? (
    <Redirect to="/products" />
  ) : (
    <Form onSubmit={handleSubmit}>
      <h1 style={{ color: "black", fontSize: "64px", textAlign: "center" }}>
        Miatzy
      </h1>
      <Row justify="center" type="flex" gutter={[32]}>
        <Col span={6}>
          <Form.Item label="First name">
            {getFieldDecorator("firstname", {
              rules: [
                {
                  required: true,
                  message: "Please fill in your first name",
                  whitespace: true
                }
              ],
              validateTrigger: "onBlur"
            })(<Input />)}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Last name">
            {getFieldDecorator("lastname", {
              rules: [
                {
                  required: true,
                  message: "Please fill in your last name",
                  whitespace: true
                }
              ],
              validateTrigger: "onBlur"
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center" type="flex" gutter={[32]}>
        <Col span={6}>
          <Form.Item label="Username">
            {getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  message: "Please fill in a username",
                  whitespace: true
                },
                {
                  validator: compareToUsernames
                }
              ],
              validateTrigger: "onBlur"
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
                  message: "Please fill in a ticket number",
                  whitespace: true
                },
                {
                  validator: compareToTicketnumbers
                }
              ],
              validateTrigger: "onBlur"
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center" type="flex" gutter={[32]}>
        <Col span={6}>
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
        </Col>
        <Col span={6}>
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
        </Col>
      </Row>
      <Row justify="center" type="flex">
        <Col span={8}>
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
                },
                {
                  validator: compareToEmails
                }
              ],
              validateTrigger: "onBlur"
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
              style={{ width: "100%" }}
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
