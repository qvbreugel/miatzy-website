import React from "react";
import { Result, Button } from "antd";
import LinkButton from "./LinkButton";

const ResetPasswordFeedback = props => {
  switch (props.type) {
    case "success":
      return (
        <Result
          status="success"
          title="Your password has been changed"
          subTitle="Use the button below to login with your new password"
          extra={
            <LinkButton type="primary" to="/">
              Login
            </LinkButton>
          }
        />
      );
    case "invalid":
      return (
        <Result
          status="error"
          title="This link is invalid"
          subTitle="If you want to reset your password use the button below to request a link."
          extra={
            <LinkButton type="primary" to="/forgotpassword">
              Request password reset link
            </LinkButton>
          }
        />
      );
    case "expired":
      return (
        <Result
          status="error"
          title="This password reset link has expired."
          subTitle="If you still want to reset your password use the button below to request a new link."
          extra={
            <LinkButton type="primary" to="/forgotpassword">
              Request password reset link
            </LinkButton>
          }
        />
      );
    default:
      return (
        <Result
          status="error"
          title="Something went wrong"
          subTitle="If you want to reset your password use the button below to request a new link."
          extra={
            <LinkButton type="primary" to="/forgotpassword">
              Request password reset link
            </LinkButton>
          }
        />
      );
  }
};

export default ResetPasswordFeedback;
