import React, {useEffect, useState, useRef} from 'react'
import { Row, Col, Card, Button, Timeline, Typography, Upload, Avatar, Divider, Input, Form, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { 
	FileOutlined, 
	SendOutlined
} from '@ant-design/icons';
import { Scrollbars } from 'react-custom-scrollbars';
import Flex from 'components/shared-components/Flex';
import {API_BASE_URL, SERVER_URL} from '../../../constants/ApiConstant'
import axios from 'axios';
import RequestPayment from './RequestPayment';
// import { io } from "socket.io-client";
const { Title, Text } = Typography;
const { TextArea } = Input;

const DocumentSingle = (props) => {
	const [visible, setVisible] = useState(false);

    const [msgList, setMsgList] = useState([])

    const [details, setDetails] = useState('')
    const [status, setStatus] = useState('Order Created')
    const [statusLevel, setStatusLevel] = useState(0)

    const [formURLs, setFormURLs] = useState([])
    const [fileListForm, setFileListForm] = useState([])

    const [docURLs, setDocURLs] = useState([])
    const [fileListDocs, setFileListDocs] = useState([])

    const [adminDocs, setAdminDocs] = useState([])
    const [fileListAdminDocs, setFileListAdminDocs] = useState([])

	let formRef = React.createRef();
	const inputEl = useRef(null);

	useEffect(() => {
		getOrder(props.match.params.id)
		// const socket = io(SERVER_URL);
		// socket.on(props.match.params.id, (data) => {
		// 	console.log(data);
		// 	setMsgList([data.newMsgData,...msgList]);
		// });
	}, [props.match.params.id])

	const getOrder = (id) => {
		var url = API_BASE_URL + 'get-order';
		
		var data = {
		  id: id,
		};
	
		axios.post(url, data, {}).then(response => {
		  const form_urls = response.data.form_urls;
		  const doc_urls = response.data.doc_urls;
		  const legalized_urls = response.data.legalized_urls;
  
		  setFormURLs(form_urls)
		  setDocURLs(doc_urls)
		  setAdminDocs(legalized_urls)
		  setStatus(response.data.status)

		  if(response.data.status==='Document Submitted')
		    setStatusLevel(0);
		  if(response.data.status==='Document Received')
			setStatusLevel(1);
		  if(response.data.status==='Payment Request Generated')
			setStatusLevel(2);
		  if(response.data.status==='Payment Completed')
			setStatusLevel(3);
		  if(response.data.status==='Sent For Attestation')
			setStatusLevel(4);
		  if(response.data.status==='Attested Documents Uploaded')
			setStatusLevel(5);
		  if(response.data.status==='Documents Downloaded')
			setStatusLevel(6);
		  if(response.data.status==='Order Closed')
			setStatusLevel(7);

  
		  let TempFileListForm = form_urls.map((el) => {
			  const url2 = SERVER_URL + el;
			  return { name: el.split('uploads/client-docs/')[1],status: 'done',url: url2 }
		  });
  
		  let TempFileListDocs = doc_urls.map((el) => {
			  const url2 = SERVER_URL + el;
			  return { name: el.split('uploads/client-docs/')[1],status: 'done',url: url2 }
		  });
  
		  let TempFileListAdminDocs = legalized_urls.map((el) => {
			  const url2 = SERVER_URL + el;
			  return { name: el.split('uploads/client-docs/')[1],status: 'done',url: url2 }
		  });
  
		  setFileListForm(TempFileListForm)
		  setFileListDocs(TempFileListDocs)
		  setFileListAdminDocs(TempFileListAdminDocs)
		  setDetails(response.data.details)
		  setMsgList(response.data.msg_list ? response.data.msg_list : [])
		}).catch(() => {
		  message.error("Something is wrong!");
		})
	}

	const showModal = () => {
		setVisible(true);
	};

	const changeVisible = (val) => {
		setVisible(val);
	};

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
				if(el.url) {
					TempFormURLs.push(el.url.split(SERVER_URL)[1])
				} else {
					TempFormURLs.push(el.response.url)
				}
			}
		})
		setFormURLs(TempFormURLs);
		setFileListForm(fileList);
      },
	  showUploadList: {
		showRemoveIcon: false,
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
				if(el.url) {
					TempDocURLs.push(el.url.split(SERVER_URL)[1])
				} else {
					TempDocURLs.push(el.response.url)
				}
			}
		})
		setDocURLs(TempDocURLs);
		setFileListDocs(fileList);
      },
	  showUploadList: {
		showRemoveIcon: false,
	  },
    }; 

	const AdminDocsProps = {
		name: 'file',
		action: `${API_BASE_URL}upload-order-docs-clients`,
		onChange({ file, fileList }) {
			if (file.status === 'done') {
				message.success(`${file.name} file uploaded successfully`);
			} else if (file.status === 'error') {
				message.error(`${file.name} file upload failed.`);
			}
			let fileList2 = [...fileList];
			let TempAdminDocs = [];
			fileList2.forEach((el)=>{
				if (el.status === 'done') {
					if(el.url) {
						TempAdminDocs.push(el.url.split(SERVER_URL)[1])
					} else {
						TempAdminDocs.push(el.response.url)
					}
				}
			})
			setAdminDocs([...TempAdminDocs]);
			setFileListAdminDocs(fileList);
			if(file.status === 'done') {
				inputEl.current.click()
			}
		},
		onRemove() {
			setTimeout(() => {
				inputEl.current.click()
			}, 500);
		}
	};

    const submitDocs = () => {
      var url = API_BASE_URL + 'save-order';

      var data = {
		id: props.match.params.id,
        form_urls: formURLs,
        doc_urls: docURLs,
        legalized_urls: adminDocs,
        details: details,
      };
  
      axios.post(url, data, {}).then(response => {
        message.success("Order updated successfully!");
		getOrder(props.match.params.id)
      })
    }
	
	const getMsgType = obj => {
		switch (obj.msgType) {
			case 'text':
				return <span>{obj.text}</span>
			case 'image':
				return <img src={obj.text} alt={obj.text} />
			case 'file':
				return (
				<Flex alignItems="center" className="msg-file">
					<FileOutlined className="font-size-md"/>
					<span className="ml-2 font-weight-semibold text-link pointer">
						<u>{obj.text}</u>
					</span>
				</Flex>
				)
			default:
				return null;
		}
	}
	
	const scrollToBottom = () => {

	}
	
	const onSend = values => {
		if (values.newMsg) {
			const newMsgData = {
				avatar: "",
				from: localStorage.getItem('id'),
				msgType: "text",
				text: values.newMsg,
				time: "",
			}
			formRef.current.setFieldsValue({
				newMsg: ''
			});
			setMsgList([...msgList, newMsgData]);

			scrollToBottom()
			var url = API_BASE_URL + 'send-message-order';
		
			var data = {
				id: props.match.params.id,
				msgList: [...msgList, newMsgData],
			};
		
			axios.post(url, data, {}).then(response => {
	
			}).catch(() => {
			  message.error("Something is wrong!");
			})
		}
	};
	
	const chatContentBody = (props, id) => (
		<div className="chat-content-body">
			<Scrollbars>
				{
					msgList.map((elm, i) => (
						<div 
							key={`msg-${id}-${i}`} 
							className={`msg ${elm.msgType === 'date'? 'datetime' : ''} ${elm.from !== localStorage.getItem('id')? 'msg-recipient' : elm.from === localStorage.getItem('id')? 'msg-sent' : ''}`}
						>
							{
								elm.avatar? 
								<div className="mr-2">
									<Avatar src={elm.avatar} />
								</div>
								:
								null
							}
							{
								elm.text?
								<div className={`bubble ${!elm.avatar? 'ml-5' : ''}`}>
									<div className="bubble-wrapper">
										{getMsgType(elm)}
									</div>
								</div>
								:
								null
							}
							{
								elm.msgType === 'date'?
								<Divider>{elm.time}</Divider>
								: 
								null
							}
						</div>
					))
				}
			</Scrollbars>
		</div>
	)
	
	const chatContentFooter = () => (
		<div className="chat-content-footer">
			<Form name="msgInput" ref={formRef} onFinish={onSend} className="w-100">
				<Form.Item name="newMsg" className="mb-0">
					<Input 
						autoComplete="off" 
						placeholder="Type a message..."
						suffix={
							<div className="d-flex align-items-center">
								<Button shape="circle" type="primary" size="small" onClick={onSend} htmlType="submit">
									<SendOutlined />
								</Button>
							</div>
						}
					/>
				</Form.Item>
			</Form>
		</div>
	)

	const setOrderStatus = (new_status) => {
		var url = API_BASE_URL + 'update-order-status';

		var data = {
		  id: props.match.params.id,
		  status: new_status
		};
	
		axios.post(url, data, {}).then(response => {
		  message.success("Order updated successfully!");
		  setVisible(false);
		  getOrder(props.match.params.id)
		})
	}

	return (
		<> 
			<Row gutter={16}>
				<Col xs={24} sm={24} md={24} lg={16}>
					<Card title="Order#2" extra={<>

						{status==='Document Submitted' && 
						<Button type="primary" onClick={() => setOrderStatus('Document Received')}>
							Mark Document Received
						</Button>}

						{status==='Document Received' && 
						<Button type="primary" onClick={showModal}>
							Request Payment
						</Button>}

						{status==='Payment Request Generated' && 
						<Button type="primary" onClick={() => setOrderStatus('Payment Completed')}>
							Mark as Payment Completed
						</Button>}

						{status==='Payment Completed' && 
						<Button type="primary" onClick={() => setOrderStatus('Sent For Attestation')}>
							Mark as Sent For Attestation
						</Button>}

						{status==='Sent For Attestation' && 
						<Button type="primary" onClick={() => setOrderStatus('Attested Documents Uploaded')}>
							Mark as Attested Documents Uploaded
						</Button>}

						{status==='Attested Documents Uploaded' && 
						<Button type="primary" onClick={() => setOrderStatus('Documents Downloaded')}>
							Mark as Documents Downloaded
						</Button>}

						{status==='Documents Downloaded' && 
						<Button type="primary" onClick={() => setOrderStatus('Order Closed')}>
							Close Order
						</Button>}

						<Button className={"d-none"} ref={inputEl} onClick={submitDocs}>Save Order</Button>
					</>}>
					<RequestPayment visible={visible} setVisible={changeVisible} setOrderStatus={setOrderStatus} />
					<Divider style={{marginTop:0}} />
					<Row gutter={16} className={'mt-4'}>
						<Col xs={24} sm={24} md={24} lg={8}>
							<Title level={4} className={'mb-4'}>Order Progress</Title>
							<Timeline>
								<Timeline.Item color={"green"}>Document Submitted</Timeline.Item>
								<Timeline.Item color={statusLevel>=1 ? "green": 'gray'}>Document Received</Timeline.Item>
								<Timeline.Item color={statusLevel>=2 ? "green": 'gray'}>Payment Request Generated</Timeline.Item>
								<Timeline.Item color={statusLevel>=3 ? "green": 'gray'}>Payment Completed</Timeline.Item>
								<Timeline.Item color={statusLevel>=4 ? "green": 'gray'}>Sent For Attestation</Timeline.Item>
								<Timeline.Item color={statusLevel>=5 ? "green": 'gray'}>Attested Documents Uploaded</Timeline.Item>
								<Timeline.Item color={statusLevel>=6 ? "green": 'gray'}>Documents Downloaded</Timeline.Item>
								<Timeline.Item color={statusLevel>=7 ? "green": 'gray'}>Order Closed</Timeline.Item>
							</Timeline>
						</Col>
						<Col xs={24} sm={24} md={24} lg={8}>
							<Title level={4} className={'mb-4'}>Your Form</Title>
							<Upload {...uploadPropsForm} fileList={fileListForm}>
							</Upload>
							<Title level={4} className={'mb-4 mt-4'}>Your Documents</Title>
							<Upload {...uploadPropsDocs} fileList={fileListDocs}>
							</Upload>
						</Col>
						<Col xs={24} sm={24} md={24} lg={8}>
							<Title level={4} className={'mb-4'}>Attested Documents</Title>
							<Upload {...AdminDocsProps} fileList={fileListAdminDocs}>
								<Button>
									<UploadOutlined /> Upload
								</Button>
							</Upload>
						</Col>
					</Row>

					<div className={'mb-4'}>
						<Text type="secondary">Other details submitted by user.</Text>
					</div>
					<TextArea style={{cursor:'default'}} readOnly rows={4} value={details} />

					</Card>
				</Col>
				<Col xs={24} sm={24} md={24} lg={8}>
					<Card title="Chat with us">
						<div className="chat">
							<div className="chat-content">
								<div className="chat-content">
									{chatContentBody(msgList, 1)}
									{chatContentFooter()}
								</div>
							</div>
						</div>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default DocumentSingle
