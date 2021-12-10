import React, {useState, useEffect} from 'react'
import { Row, Col, Card, Table, Tag, List } from 'antd';
import axios from 'axios';
import {API_BASE_URL} from '../../../constants/ApiConstant'
import moment from 'moment';

const Home = () => {
	const [orders, setOrders] = useState([]);

	const getOrders = () => {
		var url = API_BASE_URL + 'get-orders-admin';
		var data = { type: 0 };
	
		axios.post(url, data, {}).then(response => {
			setOrders(response.data)
		});
	}

	const tableColumns = [
		{
			title: 'Payment ID#',
			dataIndex: 'payment_id',
			key: 'payment_id',
		},
		{
		  title: 'Order ID#',
		  dataIndex: 'order_id',
		  key: 'order_id',
		},
		{
		  title: 'Date',
		  dataIndex: 'date',
		  key: 'date',
		},
		{
		  title: 'Amount',
		  dataIndex: 'amount',
		  key: 'amount',
		},
		{
		  title: () => <div className="text-right">Status</div>,
		  key: 'status',
		  render: (_, record) => (
			<div className="text-right">
			  <Tag className="mr-0" color={record.status === 'Approved' ? 'cyan' : record.status === 'Pending' ? 'blue' : 'volcano'}>{record.status}</Tag>
			</div>
		  ),
		},
	];

	useEffect(() => {
		getOrders();	
	}, [])

	return (
		<>
			<Row gutter={16}>
				<Col xs={24} sm={24} md={24} lg={7}>
					<Card title="Latest Orders">
						<List
						itemLayout="horizontal"
						dataSource={orders}
						renderItem={item => (
							<List.Item>
							<div className="d-flex align-items-center justify-content-between w-100">
								<div>
								<h5 className="font-weight-bold mb-0">Order #{item.id}</h5>
								<span className="text-muted">{moment(item.created_at).format("YYYY-MM-DD")}</span>
								</div>
								<div>
									<Tag className="mr-0" color={item.status === 'Order Created' ? 'blue' : item.status === 'Order Closed' ? 'cyan' : 'orange'}>{item.status}</Tag>
								</div>
							</div>
							</List.Item>
						)}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={24} md={24} lg={17}>
					<Card title="Latest Transactions">
						<Table 
							className="no-border-last" 
							columns={tableColumns} 
							dataSource={[]} 
							rowKey='id' 
							pagination={false}
							/>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default Home
