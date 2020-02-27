import React from "react";
import { Modal } from "antd";

const SupportModal = props => {
  return (
    <Modal
      title="Support"
      visible={props.supportVisible}
      onCancel={() => props.setSupportVisible(false)}
      footer={null}
    >
      <p>
        This application is still under development. In case you encounter any
        errors, crashes or have questions in general, please send an email to{" "}
        <a
          href={`mailto:support@cactusweb.dev?subject=Miatzy Bring %26 Buy Support&body=%0D%0A%0D%0APlease keep the information below in the email. %0D%0Auser_id: ${props.user.user_id}`}
          target="_blank"
        >
          support@cactusweb.dev
        </a>
      </p>
    </Modal>
  );
};

export default SupportModal;
