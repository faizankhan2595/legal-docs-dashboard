import React, {useEffect, useState} from 'react'
import { Row, Col, Card, Button, Input, Typography, message } from 'antd';
import axios from 'axios';
import {API_BASE_URL} from '../../../constants/ApiConstant'


const { Title } = Typography;
const Profile = () => {

	const [profile, setProfile] = useState({
		id: -1,
		user_id: -1,
		name: "",
		last_name: "",
		company_name: "",
		phone_number: "",
		address: "",
		address_line_2: "",
		city: "",
		state: "",
		country: "",
		profile_pic: "",
		email: "",
	})

	const getProfile = () => {
		var url = API_BASE_URL + 'get-profile';
		var data = { };
	
		axios.post(url, data, {}).then(response => {
			setProfile(response.data)
		});
	}

	useEffect(() => {
		getProfile();	
	}, [])

	const changeInput = (e) => {
		setProfile({...profile, [e.target.name]: e.target.value})
	}

	const saveuser = () => {
		var url = API_BASE_URL + 'save-profile';
		var data = {...profile};
	
		axios.post(url, data, {}).then(response => {
			message.success('Profile Updated!')
		});
	}

	return (
		<>
			<Row gutter={16}>
				<Col xs={24} sm={24} md={24} lg={24}>
					<Card title="Your Profile" extra={<Button className={'mt-4'} type="primary" onClick={saveuser}>Save</Button>}>
						<Row gutter={[16, 16]}>
							<Col xs={24} sm={24} md={24} lg={12}>
								<Title level={4}>First Name</Title>
								<Input name="name" placeholder="First Name" value={profile.name} onChange={changeInput} />
							</Col>
							<Col xs={24} sm={24} md={24} lg={12}>
								<Title level={4}>Last Name</Title>
								<Input name="last_name" placeholder="Last Name" value={profile.last_name} onChange={changeInput} />
							</Col>
							<Col xs={24} sm={24} md={24} lg={12}>
								<Title level={4}>Email</Title>
								<Input name="email" placeholder="Email" value={profile.email} onChange={changeInput} />
							</Col>
							<Col xs={24} sm={24} md={24} lg={12}>
								<Title level={4}>Phone number</Title>
								<Input name="phone_number" placeholder="Phone number" value={profile.phone_number} onChange={changeInput} />
							</Col>
							<Col xs={24}>
								<Title level={4}>Address</Title>
								<Input name="address" placeholder="Address" value={profile.address} onChange={changeInput} />
							</Col>
							<Col xs={24}>
								<Title level={4}>Appartment/Suite#</Title>
								<Input name="address_line_2" placeholder="Appartment/Suite#" value={profile.address_line_2} onChange={changeInput} />
							</Col>
							<Col xs={24} sm={24} md={24} lg={12}>
								<Title level={4}>City</Title>
								<Input name="city" placeholder="City" value={profile.city} onChange={changeInput} />
							</Col>
							<Col xs={24} sm={24} md={24} lg={12}>
								<Title level={4}>State</Title>
								<Input name="state" placeholder="State" value={profile.state} onChange={changeInput} />
							</Col>
							<Col xs={24} sm={24} md={24} lg={12} className={'mb-3'}>
								<Title level={4}>Zip Code</Title>
								<Input name="country" placeholder="Zip Code" value={profile.country} onChange={changeInput} />
							</Col>
							<Col xs={24} sm={24} md={24} lg={12} className={'mb-3'}>
								<Title level={4}>Country</Title>
								<Input name="country" placeholder="Country" value={profile.country} onChange={changeInput} />
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default Profile
