import React, { useEffect, useState, useRef, useReducer } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Timeline,
  Typography,
  Upload,
  Avatar,
  Divider,
  Input,
  Form,
  message,
  Select,
  Checkbox
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FileOutlined, SendOutlined } from "@ant-design/icons";
import { Scrollbars } from "react-custom-scrollbars";
import Flex from "components/shared-components/Flex";
import { API_BASE_URL, SERVER_URL } from "../../../constants/ApiConstant";
import axios from "axios";
// import { io } from "socket.io-client";
import MakePayment from "./MakePayment";
const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const countries = [
	"Afghanistan",
	"Albania",
	"Algeria",
	"American Samoa",
	"Andorra",
	"Angola",
	"Anguilla",
	"Antarctica",
	"Antigua and Barbuda",
	"Argentina",
	"Armenia",
	"Aruba",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Belarus",
	"Belgium",
	"Belize",
	"Benin",
	"Bermuda",
	"Bhutan",
	"Bolivia (Plurinational State of)",
	"Bonaire, Sint Eustatius and Saba",
	"Bosnia and Herzegovina",
	"Botswana",
	"Bouvet Island",
	"Brazil",
	"British Indian Ocean Territory",
	"Brunei Darussalam",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cabo Verde",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Cayman Islands",
	"Central African Republic",
	"Chad",
	"Chile",
	"China",
	"Christmas Island",
	"Cocos (Keeling) Islands",
	"Colombia",
	"Comoros",
	"Congo (the Democratic Republic of the)",
	"Congo",
	"Cook Islands",
	"Costa Rica",
	"Croatia",
	"Cuba",
	"Curaçao",
	"Cyprus",
	"Czechia",
	"Côte d'Ivoire",
	"Denmark",
	"Djibouti",
	"Dominica",
	"Dominican Republic",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Eritrea",
	"Estonia",
	"Eswatini",
	"Ethiopia",
	"Falkland Islands [Malvinas]",
	"Faroe Islands",
	"Fiji",
	"Finland",
	"France",
	"French Guiana",
	"French Polynesia",
	"French Southern Territories",
	"Gabon",
	"Gambia",
	"Georgia",
	"Germany",
	"Ghana",
	"Gibraltar",
	"Greece",
	"Greenland",
	"Grenada",
	"Guadeloupe",
	"Guam",
	"Guatemala",
	"Guernsey",
	"Guinea",
	"Guinea-Bissau",
	"Guyana",
	"Haiti",
	"Heard Island and McDonald Islands",
	"Holy See",
	"Honduras",
	"Hong Kong",
	"Hungary",
	"Iceland",
	"India",
	"Indonesia",
	"Iran (Islamic Republic of)",
	"Iraq",
	"Ireland",
	"Isle of Man",
	"Israel",
	"Italy",
	"Jamaica",
	"Japan",
	"Jersey",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
	"Korea (the Democratic People's Republic of)",
	"Korea (the Republic of)",
	"Kuwait",
	"Kyrgyzstan",
	"Lao People's Democratic Republic",
	"Latvia",
	"Lebanon",
	"Lesotho",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Macao",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Marshall Islands",
	"Martinique",
	"Mauritania",
	"Mauritius",
	"Mayotte",
	"Mexico",
	"Micronesia (Federated States of)",
	"Moldova (the Republic of)",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Montserrat",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Namibia",
	"Nauru",
	"Nepal",
	"Netherlands",
	"New Caledonia",
	"New Zealand",
	"Nicaragua",
	"Niger",
	"Nigeria",
	"Niue",
	"Norfolk Island",
	"Northern Mariana Islands",
	"Norway",
	"Oman",
	"Pakistan",
	"Palau",
	"Palestine, State of",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines",
	"Pitcairn",
	"Poland",
	"Portugal",
	"Puerto Rico",
	"Qatar",
	"Republic of North Macedonia",
	"Romania",
	"Russian Federation",
	"Rwanda",
	"Réunion",
	"Saint Barthélemy",
	"Saint Helena, Ascension and Tristan da Cunha",
	"Saint Kitts and Nevis",
	"Saint Lucia",
	"Saint Martin (French part)",
	"Saint Pierre and Miquelon",
	"Saint Vincent and the Grenadines",
	"Samoa",
	"San Marino",
	"Sao Tome and Principe",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Sint Maarten (Dutch part)",
	"Slovakia",
	"Slovenia",
	"Solomon Islands",
	"Somalia",
	"South Africa",
	"South Georgia and the South Sandwich Islands",
	"South Sudan",
	"Spain",
	"Sri Lanka",
	"Sudan",
	"Suriname",
	"Svalbard and Jan Mayen",
	"Sweden",
	"Switzerland",
	"Syrian Arab Republic",
	"Taiwan",
	"Tajikistan",
	"Tanzania, United Republic of",
	"Thailand",
	"Timor-Leste",
	"Togo",
	"Tokelau",
	"Tonga",
	"Trinidad and Tobago",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Turks and Caicos Islands",
	"Tuvalu",
	"Uganda",
	"Ukraine",
	"United Arab Emirates",
	"United Kingdom of Great Britain and Northern Ireland",
	"United States Minor Outlying Islands",
	"United States of America",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
	"Venezuela (Bolivarian Republic of)",
	"Viet Nam",
	"Virgin Islands (British)",
	"Virgin Islands (U.S.)",
	"Wallis and Futuna",
	"Western Sahara",
	"Yemen",
	"Zambia",
	"Zimbabwe",
	"Åland Islands"
];

function msgReducer(state, action) {
  if (action.type === "NEW_MESSAGE") {
    state.messages.push(action.message);
    return { ...state };
  }
  if (action.type === "ALL_MESSAGES") {
    const messages = [...action.messages];
    state.messages = messages;
    return { ...state };
  }
  return state;
}

const DocumentSingle = (props) => {
  // const [msgList, setMsgList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState("Order Created");
  const [statusLevel, setStatusLevel] = useState(0);
  const [formURLs, setFormURLs] = useState([]);
  const [fileListForm, setFileListForm] = useState([]);

  const [docURLs, setDocURLs] = useState([]);
  const [fileListDocs, setFileListDocs] = useState([]);
  // const [adminDocs, setAdminDocs] = useState([]);
  const [fileListAdminDocs, setFileListAdminDocs] = useState([]);
  const [state, dispatch] = useReducer(msgReducer, { messages: [] });

  let formRef = React.createRef();
  const inputEl = useRef(null);

  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state2, setState2] = useState('');
  const [country, setCountry] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [centralDocs, setCentralDocs] = useState(false);
  const [stateProvinceDocs, setStateProvinceDocs] = useState(false);
  const [notary, setNotary] = useState(false);
  const [verification, setVerification] = useState(false);
  const [equalization, setEqualization] = useState(false);
  const [firstLoaded, setFirstLoaded] = useState(false);

  // const socket = useRef();

  useEffect(() => {
    getOrder(props.match.params.id);
  }, [props.match.params.id]);

  useEffect(() => {
    if(firstLoaded) {
      submitDocs();
    }
  }, [centralDocs, stateProvinceDocs, notary, verification, equalization]);


  //   useEffect(() => {
  //     socket.current = io(SERVER_URL);
  //     socket.current.on(props.match.params.id, (data) => {
  //       dispatch({ type: "NEW_MESSAGE", message: data.newMsgData });
  //     });
  //     return () => {
  //       socket.current?.disconnect();
  //     };
  //   }, [props.match.params.id]);

  const getOrder = (id) => {
    var url = API_BASE_URL + "get-order";

    var data = {
      id: id,
    };

    axios
      .post(url, data, {})
      .then((response) => {
        const form_urls = response.data.form_urls;
        const doc_urls = response.data.doc_urls;
        const legalized_urls = response.data.legalized_urls;

        setFormURLs(form_urls);
        setDocURLs(doc_urls);
        // setAdminDocs(legalized_urls);
        setStatus(response.data.status);

        if (response.data.status === "Document Submitted") setStatusLevel(0);
        if (response.data.status === "Document Received") setStatusLevel(1);
        if (response.data.status === "Payment Request Generated")
          setStatusLevel(2);
        if (response.data.status === "Payment Completed") setStatusLevel(3);
        if (response.data.status === "Sent For Attestation") setStatusLevel(4);
        if (response.data.status === "Attested Documents Uploaded")
          setStatusLevel(5);
        if (response.data.status === "Documents Downloaded") setStatusLevel(6);
        if (response.data.status === "Order Closed") setStatusLevel(7);

        let TempFileListForm = form_urls.map((el, i) => {
          const url2 = SERVER_URL + el;
          return { name: `ORDER_FORM_${i + 1}`, status: "done", url: url2 };
        });

        let TempFileListDocs = doc_urls.map((el, i) => {
          const url2 = SERVER_URL + el;
          return { name: `YOUR_DOCUMENT_${i + 1}`, status: "done", url: url2 };
        });

        let TempFileListAdminDocs = legalized_urls.map((el, i) => {
          const url2 = SERVER_URL + el;
          return {
            name: `ATTESTED_DOCUMENT_${i + 1}`,
            status: "done",
            url: url2,
          };
        });

        setFileListForm(TempFileListForm);
        setFileListDocs(TempFileListDocs);
        setFileListAdminDocs(TempFileListAdminDocs);
        setDetails(response.data.details);
        setEmail(response.data.email);
        setContactNumber(response.data.contact_number);
        setAddress(response.data.address);
        setCity(response.data.city);
        setState2(response.data.state);
        setCountry(response.data.country);
        setServiceType(response.data.service_type);
        setCentralDocs(response.data.centralDocuments == 1 ? true : false);
        setStateProvinceDocs(response.data.stateDocuments == 1 ? true : false);
        setNotary(response.data.notaryDocuments == 1 ? true : false);
        setVerification(response.data.verificationDocuments == 1 ? true : false);
        setEqualization(response.data.equalizationDocuments == 1 ? true : false);

        dispatch({
          type: "ALL_MESSAGES",
          messages: response.data.msg_list ? response.data.msg_list : [],
        });

        setFirstLoaded(true);
      })
      .catch(() => {
        message.error("Something is wrong!");
      });
  };

  const uploadPropsForm = {
    name: "file",
    action: API_BASE_URL + "upload-order-docs-clients",
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
      let fileList = [...info.fileList];
      let TempFormURLs = [];
      fileList.forEach((el) => {
        if (el.status === "done") {
          if (el.url) {
            TempFormURLs.push(el.url.split(SERVER_URL)[1]);
          } else {
            TempFormURLs.push(el.response.url);
          }
        }
      });
      setFormURLs(TempFormURLs);
      setFileListForm(fileList);
      if (info.file.status === "done") {
        inputEl.current.click();
      }
    },
    onRemove() {
      setTimeout(() => {
        inputEl.current.click();
      }, 500);
    },
  };

  const uploadPropsDocs = {
    name: "file",
    action: `${API_BASE_URL}upload-order-docs-clients`,
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
      let fileList = [...info.fileList];
      let TempDocURLs = [];
      fileList.forEach((el) => {
        if (el.status === "done") {
          if (el.url) {
            TempDocURLs.push(el.url.split(SERVER_URL)[1]);
          } else {
            TempDocURLs.push(el.response.url);
          }
        }
      });
      setDocURLs(TempDocURLs);
      setFileListDocs(fileList);
      if (info.file.status === "done") {
        inputEl.current.click();
      }
    },
    onRemove() {
      setTimeout(() => {
        inputEl.current.click();
      }, 500);
    },
  };

  const AdminDocsProps = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange({ file, fileList }) {},
    showUploadList: {
      showRemoveIcon: false,
    },
  };

  const submitDocs = () => {
    var url = API_BASE_URL + "save-order";

    var data = {
      id: props.match.params.id,
      form_urls: formURLs,
      doc_urls: docURLs,
      details: details,
      email: email,
      contact_number: contactNumber,
      address: address,
      city: city,
      state: state2,
      country: country,
      service_type: serviceType,
      centralDocuments: centralDocs ? '1' : '0',
      stateDocuments: stateProvinceDocs ? '1' : '0',
      notaryDocuments: notary ? '1' : '0',
      verificationDocuments: verification ? '1' : '0',
      equalizationDocuments: equalization ? '1' : '0',
    };

    axios
      .post(url, data, {})
      .then((response) => {
        message.success("Order updated successfully!");
        getOrder(props.match.params.id);
      })
      .catch(() => {});
  };

  const getMsgType = (obj) => {
    switch (obj.msgType) {
      case "text":
        return <span>{obj.text}</span>;
      case "image":
        return <img src={obj.text} alt={obj.text} />;
      case "file":
        return (
          <Flex alignItems="center" className="msg-file">
            <FileOutlined className="font-size-md" />
            <span className="ml-2 font-weight-semibold text-link pointer">
              <u>{obj.text}</u>
            </span>
          </Flex>
        );
      default:
        return null;
    }
  };

  const scrollToBottom = () => {};

  const onSend = (values) => {
    if (values.newMsg) {
      const newMsgData = {
        avatar: "",
        from: localStorage.getItem("id"),
        msgType: "text",
        text: values.newMsg,
        time: "",
      };
      formRef.current.setFieldsValue({
        newMsg: "",
      });

      dispatch({ type: "NEW_MESSAGE", message: newMsgData });

      scrollToBottom();
      var url = API_BASE_URL + "send-message-order";

      var data = {
        id: props.match.params.id,
        newMsgData: newMsgData,
        msgList: [...state.messages],
      };

      axios
        .post(url, data, {})
        .then((response) => {})
        .catch(() => {
          message.error("Something is wrong!");
        });
    }
  };

  const chatContentBody = (props, id) => (
    <div className="chat-content-body">
      <Scrollbars>
        {state.messages &&
          state.messages.map((elm, i) => (
            <div
              key={`msg-${id}-${i}`}
              className={`msg ${elm.msgType === "date" ? "datetime" : ""} ${
                elm.from !== localStorage.getItem("id")
                  ? "msg-recipient"
                  : elm.from === localStorage.getItem("id")
                  ? "msg-sent"
                  : ""
              }`}
            >
              {elm.avatar ? (
                <div className="mr-2">
                  <Avatar src={elm.avatar} />
                </div>
              ) : null}
              {elm.text ? (
                <div className={`bubble`}>
                  <div className="bubble-wrapper">{getMsgType(elm)}</div>
                </div>
              ) : null}
              {elm.msgType === "date" ? <Divider>{elm.time}</Divider> : null}
            </div>
          ))}
      </Scrollbars>
    </div>
  );

  const chatContentFooter = () => (
    <div className="chat-content-footer">
      <Form name="msgInput" ref={formRef} onFinish={onSend} className="w-100">
        <Form.Item name="newMsg" className="mb-0">
          <Input
            autoComplete="off"
            placeholder="Type a message..."
            suffix={
              <div className="d-flex align-items-center">
                <Button
                  shape="circle"
                  type="primary"
                  size="small"
                  onClick={onSend}
                  htmlType="submit"
                >
                  <SendOutlined />
                </Button>
              </div>
            }
          />
        </Form.Item>
      </Form>
    </div>
  );

  const showModal = () => {
    setVisible(true);
  };

  const changeVisible = (val) => {
    setVisible(val);
  };

  const setOrderStatus = (new_status) => {
    var url = API_BASE_URL + "update-order-status";

    var data = {
      id: props.match.params.id,
      status: new_status,
    };

    axios.post(url, data, {}).then((response) => {
      message.success("Order updated successfully!");
      setVisible(false);
      getOrder(props.match.params.id);
    });
  };

  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={16}>
          <Card
            title={`Order#${props.match.params.id}`}
            extra={
              <>
                {status === "Payment Request Generated" && (
                  <Button type="primary" className={"mr-2"} onClick={()=> {
                    window.location.href = `https://documentsattestations.com/checkout/?order_id${props.match.params.id}&token=${localStorage.getItem("token")}`;
                  }}>
                    Make Payment
                  </Button>
                )}

                <Button className={"d-none"} ref={inputEl} onClick={submitDocs}>
                  Save Order
                </Button>
              </>
            }
          >
            <MakePayment
              visible={visible}
              setVisible={changeVisible}
              setOrderStatus={setOrderStatus}
            />

            <Divider style={{ marginTop: 0 }} />

            <Row gutter={16} className={"mt-4"}>
              <Col xs={24} sm={24} md={24} lg={8}>
                <Title level={4} className={"mb-4"}>
                  Order Progress
                </Title>
                <Timeline>
                  <Timeline.Item color={"green"}>
                    Document Submitted
                  </Timeline.Item>
                  <Timeline.Item color={statusLevel >= 1 ? "green" : "gray"}>
                    Document Received
                  </Timeline.Item>
                  <Timeline.Item color={statusLevel >= 2 ? "green" : "gray"}>
                    Payment Request Generated
                  </Timeline.Item>
                  <Timeline.Item color={statusLevel >= 3 ? "green" : "gray"}>
                    Payment Completed
                  </Timeline.Item>
                  <Timeline.Item color={statusLevel >= 4 ? "green" : "gray"}>
                    Processing your documents
                  </Timeline.Item>
                  <Timeline.Item color={statusLevel >= 5 ? "green" : "gray"}>
                    Documents Uploaded
                  </Timeline.Item>
                  <Timeline.Item color={statusLevel >= 6 ? "green" : "gray"}>
                    Documents Downloaded
                  </Timeline.Item>
                  <Timeline.Item color={statusLevel >= 7 ? "green" : "gray"}>
                    Order Closed
                  </Timeline.Item>
                </Timeline>
              </Col>
              <Col xs={24} sm={24} md={24} lg={8}>
                {/* <Title level={4} className={"mb-4"}>
                  Your Form
                </Title>
                <Upload {...uploadPropsForm} fileList={fileListForm}>
                  <Button>
                    <UploadOutlined /> Upload
                  </Button>
                </Upload> */}

                <Title level={5} className={"mt-4"} >
                  Email
                </Title>

                <Input placeholder="Email" type={"email"} value={email} onChange={(e)=>setEmail(e.target.value)} onBlur={submitDocs} />

                <Title level={5} className={"mt-4"} >
                  Contact Number
                </Title>

                <Input placeholder="Contact Number" value={contactNumber} onChange={(e)=>setContactNumber(e.target.value)} onBlur={submitDocs} />

                <Title level={5} className={"mt-4"}>
                  Address
                </Title>

                <Input placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)} onBlur={submitDocs}/>

                <Title level={5} className={"mt-4"}>
                  City
                </Title>

                <Input placeholder="City" value={city} onChange={(e)=>setCity(e.target.value)} onBlur={submitDocs}/>
                
                <Title level={5} className={"mt-4"}>
                  State
                </Title>

                <Input placeholder="State" value={state2} onChange={(e)=>setState2(e.target.value)} onBlur={submitDocs} />

                <Title level={5} className={"mt-4"}>
                  Country
                </Title>

                <Select value={country} style={{ width: '100%' }} onChange={(val)=>setCountry(val)} onBlur={submitDocs}>
                  {countries.map((el, key) => (
                    <Option value={el} key={key}>
                      {el}
                    </Option>
                  ))}
                </Select>

                <Title level={5} className={"mt-4"}>
                  Service Type
                </Title>

                <Select value={serviceType} style={{ width: '100%' }} onChange={(val)=>setServiceType(val)} onBlur={submitDocs}>
                  {['Document Attestion', 'Apostille', 'Notary', 'Legalization of Documents', 'University Degree Authentication', 'Legal Document Attestation'].map((el, key) => (
                    <Option value={el} key={key}>
                      {el}
                    </Option>
                  ))}
                </Select>


                <Title level={5} className={"mt-4"}>
                  Select Options
                </Title>

                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}>
                  <Checkbox checked={centralDocs} style={{marginLeft: "8px"}} onChange={(e) => setCentralDocs(e.target.checked)}>
                    Central/Federal Documents
                  </Checkbox>
                  <Checkbox checked={stateProvinceDocs} onChange={(e) => setStateProvinceDocs(e.target.checked)}>State/Province Documents</Checkbox>
                  <Checkbox checked={notary} onChange={(e) => setNotary(e.target.checked)}>Notary</Checkbox>
                  <Checkbox checked={verification} onChange={(e) => setVerification(e.target.checked)}>Verification</Checkbox>
                  <Checkbox checked={equalization} onChange={(e) => setEqualization(e.target.checked)}>Equalization</Checkbox>
                </div>

              </Col>
              <Col xs={24} sm={24} md={24} lg={8}>

              <Title level={4} className={"mb-4 mt-4"}>
                  Your Documents
                </Title>
                <Upload {...uploadPropsDocs} fileList={fileListDocs}>
                  <Button>
                    <UploadOutlined /> Upload
                  </Button>
                </Upload>

                <Title level={4} className={"mb-4 mt-5"}>
                  Attested Documents
                </Title>
                <Upload
                  {...AdminDocsProps}
                  fileList={fileListAdminDocs}
                ></Upload>
              </Col>
            </Row>

            

            <div className={"mb-4 mt-5"}>
              <Text type="secondary">
                Please provide other details (if any) that will assist us to
                escalate your order.
              </Text>
            </div>
            <TextArea
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)} onBlur={submitDocs}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8}>
          <Card title="Chat with us">
            <div className="chat">
              <div className="chat-content">
                <div className="chat-content">
                  {chatContentBody(state.messages, 1)}
                  {chatContentFooter()}
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DocumentSingle;
