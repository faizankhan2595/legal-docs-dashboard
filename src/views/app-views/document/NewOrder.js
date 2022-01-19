import React, { useState } from "react";
import { Modal, Typography, Upload, Button, message, Input, Checkbox, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { API_BASE_URL } from "../../../constants/ApiConstant";
import axios from "axios";
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

const NewOrder = (props) => {
  const [loading, setLoading] = useState(false);
  const [formURLs, setFormURLs] = useState([]);
  const [details, setDetails] = useState("");
  const [docURLs, setDocURLs] = useState([]);
  const [showFee, setShowFee] = useState(false);

  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [centralDocs, setCentralDocs] = useState(false);
  const [stateProvinceDocs, setStateProvinceDocs] = useState(false);
  const [notary, setNotary] = useState(false);
  const [verification, setVerification] = useState(false);
  const [equalization, setEqualization] = useState(false);


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
          TempFormURLs.push(el.response.url);
        }
      });
      setFormURLs(TempFormURLs);
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
          TempDocURLs.push(el.response.url);
        }
      });
      setDocURLs(TempDocURLs);
    },
  };

  const submitDocs = () => {
    var url = API_BASE_URL + "new-order";

    if (docURLs.length === 0) {
      message.error("Please upload documents");
      return false;
    }

    // Check email, contact number, address, city, state, country, service type, central docs, state province docs, notary, verification, equalization

    if (email === '') {
      message.error("Please enter email");
      return false;
    }

    if (contactNumber === '') {
      message.error("Please enter contact number");
      return false;
    }

    if (address === '') {
      message.error("Please enter address");
      return false;
    }

    if (city === '') {
      message.error("Please enter city");
      return false;
    }

    if (state === '') {
      message.error("Please enter state");
      return false;
    }

    if (country === '') {
      message.error("Please select country");
      return false;
    }

    if (serviceType === '') {
      message.error("Please select service type");
      return false;
    }

    setLoading(true);

    var data = {
      form_urls: formURLs,
      doc_urls: docURLs,
      details: details,
      email: email,
      contact_number: contactNumber,
      address: address,
      city: city,
      state: state,
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
        setLoading(false);
        props.getOrders();
        props.setVisible(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onCancel = () => {
    props.setVisible(false);
  };

  const onOk = () => {
    submitDocs();
  };

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
        You can check our fees{" "} <span
          onClick={() => {
            setShowFee(true);
          }}
          style={{
            cursor: "pointer",
            color: "#1890ff",
          }}
        >
          from here.
        </span>

        <Title level={5} className={"mt-4"} >
          Email
        </Title>

        <Input placeholder="Email" type={"email"} value={email} onChange={(e)=>setEmail(e.target.value)} />

        <Title level={5} className={"mt-4"} >
          Contact Number
        </Title>

        <Input placeholder="Contact Number" value={contactNumber} onChange={(e)=>setContactNumber(e.target.value)} />

        <Title level={5} className={"mt-4"}>
          Address
        </Title>

        <Input placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)}/>

        <Title level={5} className={"mt-4"}>
          City
        </Title>

        <Input placeholder="City" value={city} onChange={(e)=>setCity(e.target.value)}/>
        
        <Title level={5} className={"mt-4"}>
          State
        </Title>

        <Input placeholder="State" value={state} onChange={(e)=>setState(e.target.value)} />

        <Title level={5} className={"mt-4"}>
          Country
        </Title>

        <Select value={country} style={{ width: '100%' }} onChange={(val)=>setCountry(val)}>
          {countries.map((el, key) => (
            <Option value={el} key={key}>
              {el}
            </Option>
          ))}
        </Select>

        <Title level={5} className={"mt-4"}>
          Service Type
        </Title>

        <Select value={serviceType} style={{ width: '100%' }} onChange={(val)=>setServiceType(val)}>
          {['Document Attestion', 'Apostille', 'Notary', 'Legalization of Documents', 'University Degree Authentication', 'Legal Document Attestation'].map((el, key) => (
            <Option value={el} key={key}>
              {el}
            </Option>
          ))}
        </Select>

        <Title level={5} className={"mt-4"}>
          Upload Your Documents
        </Title>
        <Upload {...uploadPropsDocs}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>

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
          

        <div className={"mt-4 mb-3"}>
          <Text type="secondary">
            Please provide other details (if any) that will assist us to
            escalate your order.
          </Text>
        </div>
        <TextArea
          rows={4}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </Modal>

      <Modal
        style={{ top: 20 }}
        width={620}
        title="Fees Guarantee"
        visible={showFee}
        onOk={() => {
          setShowFee(false);
        }}
        onCancel={() => {
          setShowFee(false);
        }}
      >
        <span>Our fees is the lowest in market. We only charge a small fee for our services. The fees and the charges by the embassy or the governments are invoiced as per actuals.</span><br/><br/>
        <span>As an example, a degree or a diploma certificate which must be apostilled in USA, the customer would pay U.S. \$ 8 as the US Department of State fees and US \$ 41 UAE embassy fees. There could be an additional charge, if the document must be apostle by a state Government. We charge only a small fee as our service charges of US \$ 50 per document for each apostle or attestations or legalization or Notary. The Courier charges within the United States and to the customers address will be build extra.</span><br/><br/>
        <span>On uploading the documents to be apostilled or attested or legalized, you will receive a detailed invoice with transparent fees and charges. There are no hidden fees, and we guarantee a FULL refund if the document is not rejected by the government or embassy as per their policies.</span>
      </Modal>
    </>
  );
};

export default NewOrder;
