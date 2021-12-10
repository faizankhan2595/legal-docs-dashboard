import React from 'react'
import { Row, Col, Card, Table, Tag } from 'antd';

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

const Transactions = () => {

	return (
		<>
			<Row gutter={16}>
				<Col xs={24} sm={24} md={24} lg={24}>
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

export default Transactions
