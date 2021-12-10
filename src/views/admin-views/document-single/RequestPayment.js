import React, {useState} from 'react'
import { Modal, Typography, Input, InputNumber } from 'antd';
const { Title, Text } = Typography;
const { TextArea } = Input;

const RequestPayment = (props) => {
    const [loading] = useState(false)

    const onCancel = () => {
      props.setVisible(false);
    }
    
    const onOk = () => {
      props.setOrderStatus('Payment Request Generated');
    }

    return (
		<>
        <Modal
          style={{ top: 20 }}
          width={620}
          title="Payment Request"
          visible={props.visible}
          onOk={onOk}
          onCancel={onCancel}
          confirmLoading={loading}
        >
          <Title level={4} >Payment Amount</Title>
          <InputNumber
            style={{width: '100%'}}
            min={0} max={10000000}
            defaultValue={1000}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
          />

          <div className={'mt-4 mb-3'}>
            <Text type="secondary">Please provide other details (if any) that you want client to know.</Text>
          </div>
          <TextArea rows={4}  />

        </Modal>
        </>
    );
}

export default RequestPayment