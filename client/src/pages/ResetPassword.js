import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import API from "../utils/API";
import ResetPasswordForm from "../components/ResetPasswordForm";
import LoadingPageIcon from "../components/LoadingPageIcon";
import ResetPasswordFeedback from "../components/ResetPasswordFeedback";

const ResetPassword = props => {
  const [screen, setScreen] = useState("loading");

  useEffect(() => {
    const token = props.match.params.token;
    API.getUserByToken(token).then(res => {
      if (!res.data.length) {
        setScreen("invalid");
      } else if (Date.now() >= res.data[0].reset_password_expires) {
        setScreen("expired");
      } else {
        setScreen("reset");
      }
    });
  }, []);

  switch (screen) {
    case "loading":
      return <LoadingPageIcon />;

    case "invalid":
      return <ResetPasswordFeedback type="invalid" />;

    case "expired":
      return <ResetPasswordFeedback type="expired" />;

    case "success":
      return <ResetPasswordFeedback type="success" />;

    case "reset":
      return (
        <ResetPasswordForm
          token={props.match.params.token}
          setScreen={setScreen}
        />
      );

    default:
      return <Spin size="large" />;
  }
};

export default ResetPassword;
