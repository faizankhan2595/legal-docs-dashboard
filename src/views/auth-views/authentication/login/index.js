import React ,{useEffect} from 'react'
import LoginForm from '../../components/LoginForm'
import { Card, Row, Col } from "antd";
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

const backgroundStyle = {
	backgroundImage: 'url(/img/others/img-17.jpg)',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover'
}

const LoginOne = props => {
	const theme = useSelector(state => state.theme.currentTheme)

	let history = useHistory();

	useEffect(()=>{
		var token = localStorage.getItem("token"); 
		var role = +localStorage.getItem("role"); 
		if(token) {
		  if(role===0) {
			history.push('/admin/home');
		  } else {
			history.push('/client/home');
		  } 
		}
		// eslint-disable-next-line
	},[])



	return (
		<div className="h-100" style={backgroundStyle}>
			<div className="container d-flex flex-column justify-content-center h-100">
				<Row justify="center">
					<Col xs={20} sm={20} md={20} lg={7}>
						<Card>
							<div className="my-4">
								<div className="text-center">
									<img className="img-fluid" src={`/img/${theme === 'light' ? 'logo.png': 'logo-white.png'}`} alt="" />
									<p>Don't have an account yet? <a href="/auth/register">Sign Up</a></p>
								</div>
								<Row justify="center">
									<Col xs={24} sm={24} md={20} lg={20}>
										<LoginForm {...props} />
									</Col>
								</Row>
							</div>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	)
}

const Login = () => {
	return (
		<LoginOne allowRedirect={true} />
	)
}

export default Login
