import React, { useState } from "react";
import { Row, Col, Form, Input, message, Modal, Tooltip, Icon } from "antd";
import API from "../utils/API";

const EditProduct = props => {
  const { getFieldDecorator, getFieldValue, resetFields } = props.form;
  const [confirmLoading, setConfirmLoading] = useState(false);

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

  return (
    <Modal
      visible={props.changeTicketnumberVisible}
      onCancel={handleCancel}
      onOk={handleSubmit}
      confirmLoading={confirmLoading}
      title="Change Ticket Number"
      okText="Change"
      width={512}
    >
      <Row>
        <Col span={24}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col span={11}>
                <Form.Item
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
