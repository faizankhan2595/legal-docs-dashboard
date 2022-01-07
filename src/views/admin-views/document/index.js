import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table, Tag, Button } from "antd";
import axios from "axios";
import { API_BASE_URL } from "../../../constants/ApiConstant";
import NumberFormat from "react-number-format";
import { useHistory } from "react-router-dom";
import moment from "moment";
// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyBGyzscBV90rsOfaRQs1ZXKr43RCp6Wjao",
//   authDomain: "earth-s-lab.firebaseapp.com",
//   databaseURL: "https://earth-s-lab.firebaseio.com",
//   projectId: "earth-s-lab",
//   storageBucket: "earth-s-lab.appspot.com",
//   messagingSenderId: "860632506024",
//   appId: "1:860632506024:web:f8f8cf470f689735856c9d",
// };

// const messaging = getMessagingFB();

const Document = () => {
  const [orders, setOrders] = useState([]);
  let history = useHistory();

  const getOrders = () => {
    var url = API_BASE_URL + "get-orders-admin";
    var data = { type: 0 };

    axios.post(url, data, {}).then((response) => {
      setOrders(response.data);
    });
  };

  const ViewOrder = (id) => {
    history.push(`/admin/document-single/${id}`);
  };

  const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (_, record) => "#" + record.id,
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (_, record) => moment(record.created_at).format("DD MMM YYYY"),
    },
    {
      title: "Closing Date",
      dataIndex: "closing_date",
      key: "closing_date",
      render: (_, record) =>
        record.closing_date && moment(record.closing_date).format("DD MM YYYY"),
    },
    {
      title: () => <div className="text-right">Order Status</div>,
      key: "status",
      render: (_, record) => (
        <div className="text-right">
          <Tag
            className="mr-0"
            color={
              record.status === "Document Submitted"
                ? "blue"
                : record.status === "Order Closed"
                ? "cyan"
                : "orange"
            }
          >
            {record.status}
          </Tag>
        </div>
      ),
    },
    {
      title: () => <div className="text-right">Payment Status</div>,
      key: "status",
      render: (_, record) => (
        <div className="text-right">
          {record.payment_status && (
            <Tag
              className="mr-0"
              color={record.payment_status === "Paid" ? "cyan" : "volcano"}
            >
              {record.payment_status}
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: () => <div className="text-right">Amount</div>,
      key: "status",
      render: (_, record) => (
        <div className="text-right">
          <NumberFormat
            displayType={"text"}
            value={record.amount}
            prefix={"$"}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
          />
        </div>
      ),
    },
    {
      title: () => <div className="text-right"></div>,
      key: "action",
      render: (_, record) => (
        <div className="text-right">
          <Button onClick={() => ViewOrder(record.id)}>View Order</Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getOrders();
    // const app = initializeApp(firebaseConfig);
    // console.log(app);
  }, []);

  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Card title="All Orders">
            <Table
              className="no-border-last"
              columns={tableColumns}
              dataSource={orders}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Document;
