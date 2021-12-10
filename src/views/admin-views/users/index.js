import React, {useState, useEffect} from 'react'
import { Row, Col, Card, Table, Tag } from 'antd';
import axios from 'axios';
import {API_BASE_URL} from '../../../constants/ApiConstant'

const tableColumns = [
	{
		title: 'User ID#',
		dataIndex: 'id',
		key: 'id',
	},
	{
	  title: 'Email',
	  dataIndex: 'email',
	  key: 'email',
	},
	{
	  title: 'Name',
	  dataIndex: 'name',
	  key: 'name',
	},
	{
	  title: 'Phone Number',
	  dataIndex: 'phone_number',
	  key: 'phone_number',
	},
	{
	  title: () => <div className="text-right">Status</div>,
	  key: 'status',
	  render: (_, record) => (
		<div className="text-right">
		  <Tag className="mr-0" color={record.status === 'approved' ? 'cyan' : record.status === 'verified' ? 'blue' : 'volcano'}>{record.status}</Tag>
		</div>
	  ),
	},
];

const Transactions = () => {
	const [users, setUsers] = useState([]);

	const getUsers = () => {
		var url = API_BASE_URL + 'get-users-admin';
		console.log(url);
		var data = { type: 0 };
	
		axios.post(url, data, {}).then(response => {
			setUsers(response.data)
		});
	}

	useEffect(() => {
		getUsers();	
	}, [])

	return (
		<>
			<Row gutter={16}>
				<Col xs={24} sm={24} md={24} lg={24}>
					<Card title="All Users">
						<Table 
							className="no-border-last" 
							columns={tableColumns} 
							dataSource={users} 
							rowKey='id' 
							pagination={false}
							/>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default Transactions
