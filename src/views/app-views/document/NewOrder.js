import React, {useState} from 'react'
import { Modal, Typography, Upload, Button, message, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {API_BASE_URL} from '../../../constants/ApiConstant'
import axios from 'axios';
const { Title, Text } = Typography;
const { TextArea } = Input;

const NewOrder = (props) => {
    const [loading, setLoading] = useState(false);
    const [formURLs, setFormURLs] = useState([])
    const [details, setDetails] = useState('')
    const [docURLs, setDocURLs] = useState([])

    const uploadPropsForm = {
      name: 'file',
      action: API_BASE_URL+'upload-order-docs-clients',
      onChange(info) {
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
        let fileList = [...info.fileList];
        let TempFormURLs = [];
        fileList.forEach((el)=>{
          if (el.status === 'done') {
              TempFormURLs.push(el.response.url)
          }
        })
        setFormURLs(TempFormURLs);
      },
    };
    
    const uploadPropsDocs = {
      name: 'file',
      action: `${API_BASE_URL}upload-order-docs-clients`,
      onChange(info) {
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
        let fileList = [...info.fileList];
        let TempDocURLs = [];
        fileList.forEach((el)=>{
          if (el.status === 'done') {
              TempDocURLs.push(el.response.url)
          }
        })
        setDocURLs(TempDocURLs);
      },
    };

    const submitDocs = () => {
      var url = API_BASE_URL + 'new-order';
      
      var data = {
        form_urls: formURLs,
        doc_urls: docURLs,
        details: details,
      };
  
      axios.post(url, data, {}).then(response => {
        message.success("Order updated successfully!");
        setLoading(false);
        props.getOrders();
        props.setVisible(false);
      }).catch(() => {
        setLoading(false);
      })
    }

    const onCancel = () => {
      props.setVisible(false);
    }
    
    const onOk = () => {
      setLoading(true);
      submitDocs();
    }

    return (
		<>
        <Modal
          style={{ top: 20 }}
          width={620}
          title="New Order"
          visible={props.visible}
          onOk={onOk}
          onCancel={onCancel}
          confirmLoading={loading}
        >
          Download order form from this <a href="https://apostille.inkapps.io/assets/Order Form.pdf" target="_blank" rel="noreferrer">link</a>

          <Title level={4} className={'mt-4'}>Upload Filled Form</Title>

          <Upload {...uploadPropsForm}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>

          <Title level={4} className={'mt-4'}>Upload Your Documents</Title>
          <Upload {...uploadPropsDocs}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>

          <div className={'mt-4 mb-3'}>
            <Text type="secondary">Please provide other details (if any) that will assist us to escalate your order.</Text>
          </div>
          <TextArea rows={4} value={details} onChange={(e) => setDetails(e.target.value)} />

        </Modal>
        </>
    );
}

export default NewOrder