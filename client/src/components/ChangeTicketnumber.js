import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Form,
  Input,
  message,
  Modal,
  Tooltip,
  Icon
} from "antd";
import API from "../utils/API";

const EditProduct = props => {
  const { getFieldDecorator, getFieldValue, resetFields } = props.form;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ticketnumbers, setTicketnumbers] = useState([]);
  const [validateStatus, setValidateStatus] = useState({
    type: "validating",
    feedback: true
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    API.getAllUsers().then(res => {
      const fetchedTicketnumbers = [];
      const fetchedEmails = [];
      res.map(user => {
        fetchedTicketnumbers.push(user.ticketnumber);
      });
      setTicketnumbers(fetchedTicketnumbers);
      setValidateStatus({ type: "none", feedback: false });
    });
  }, []);

  const handleSubmit = () => {
    setConfirmLoading(true);
    let changesMade = false;
    let data = { ticketnumber: "", id: props.user.user_id };
    console.log(props.user);

    if (getFieldValue("ticketnumber") !== props.user.ticketnumber) {
      changesMade = true;
      data["ticketnumber"] = getFieldValue("ticketnumber");
    }
    if (changesMade) {
      API.updateTicketnumber(data).then(res => {
        if ((res.status = 200)) {
          message.success(`The ticket number has been changed.`);
          setConfirmLoading(false);
          props.setChangeTicketnumberVisible(false);
        }
      });
    } else {
      message.warning("Nothing was changed");
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    resetFields();
    props.setChangeTicketnumberVisible(false);
  };

  const compareToTicketnumbers = (rule, value, callback) => {
    if (value) {
      ticketnumbers.forEach(ticketnumber => {
        if (value === ticketnumber) {
          setButtonDisabled(true);
          setValidateStatus({ type: "error", feedback: false });
          callback("This ticket number is already registered");
        }
      });
    } else {
      callback();
      if (validateStatus.type != "none") {
        setValidateStatus({ type: "none", feedback: false });
        setButtonDisabled(false);
      }
    }
  };

  return (
    <Modal
      visible={props.changeTicketnumberVisible}
      onCancel={handleCancel}
      onOk={handleSubmit}
      confirmLoading={confirmLoading}
      title="Change Ticket Number"
      okText="Change"
      width={512}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={confirmLoading}
          onClick={handleSubmit}
          disabled={buttonDisabled}
        >
          Change
        </Button>
      ]}
    >
      <Row>
        <Col span={24}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col span={11}>
                <Form.Item
                  validateStatus={validateStatus.type}
                  hasFeedback={validateStatus.feedback}
                  label={
                    <span>
                      Ticket number&nbsp;
                      <Tooltip title="Make sure this corresponds to the number on the ticket you bought for the convention">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  }
                >
                  {getFieldDecorator("ticketnumber", {
                    rules: [{ validator: compareToTicketnumbers }],
                    initialValue: props.user.ticketnumber
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default Form.create()(EditProduct);
