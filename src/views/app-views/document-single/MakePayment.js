import React, { useState } from "react";
import { Modal, Typography, InputNumber } from "antd";
const { Title, Text } = Typography;

const MakePayment = (props) => {
  const [loading] = useState(false);

  const onCancel = () => {
    props.setVisible(false);
  };

  const onOk = () => {
    props.setOrderStatus("Payment Completed");
  };

  return (
    <>
      <Modal
        style={{ top: 20 }}
        width={620}
        title="Make Payment"
        visible={props.visible}
        onOk={onOk}
        okText={"Mark As Paid"}
        onCancel={onCancel}
        confirmLoading={loading}
      >
        <Title level={4}>Payment Amount</Title>
        <InputNumber
          readOnly
          style={{ width: "100%" }}
          min={0}
          value={props.totalPrice}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        />

        <div className={"mt-4 mb-3"}>
          <Text type="secondary">
            Payment gateway will be integrated here...
          </Text>
        </div>
      </Modal>
    </>
  );
};

export default MakePayment;
