import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Alert, Divider, message as message2 } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import {
  showLoading,
  showAuthMessage,
  hideAuthMessage,
  authenticated,
} from "redux/actions/Auth";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../../../constants/ApiConstant";
import axios from "axios";

export const LoginForm = (props) => {
  let history = useHistory();
  const [loadingLogin, setloadingLogin] = useState(false);

  const {
    hideAuthMessage,
    extra,
    loading,
    showMessage,
    message,
    token,
    redirect,
    allowRedirect,
  } = props;

  const pushToAdminHome = () => {
    history.push("/admin/home");
    window.location.reload();
  };

  const pushToClientHome = () => {
    history.push("/client/home");
    window.location.reload();
  };

  const onLogin = (values) => {
    //   setloadingLogin(true);
    var url = API_BASE_URL + "login";

    var data = {
      email: values.email,
      password: values.password,
    };

    axios
      .post(url, data, {})
      .then((response) => {
        setloadingLogin(false);

        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.token.token;
        message2.success(`Logged In Successfully!`);
        localStorage.setItem("token", response.data.token.token);
        localStorage.setItem("id", response.data.user.id);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("name", response.data.user.name);
        localStorage.setItem("role", response.data.user.role);
        localStorage.setItem("status", response.data.user.status);
        localStorage.setItem("avatarURL", response.data.user.avatarURL);

        if (+response.data.user.role === 0) {
          pushToAdminHome();
        } else {
          pushToClientHome();
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data) {
            if (error.response.data === "Invalid credentials") {
              message2.error("Invalid credentials!");
              return false;
            }
            if (error.response.data.error) {
              message2.error(error.response.data.error);
            } else {
              message2.error("Something went wrong!");
            }
          } else {
            message2.error("Something went wrong!");
          }
        } else {
          message2.error("Something went wrong!");
        }
      });
  };

  useEffect(() => {
    if (token !== null && allowRedirect) {
      history.push(redirect);
    }
    if (showMessage) {
      setTimeout(() => {
        hideAuthMessage();
      }, 3000);
    }
  });

  useEffect(() => {
    var token = localStorage.getItem("token");
    var role = localStorage.getItem("role");
    if (token) {
      if (+role === 0) {
        history.push(["/admin/home"]);
      } else {
        history.push(["/client/home"]);
      }
    }
  }, [history]);

  const forgetPassword = (
    <div>
      <Divider>
        <span className="text-muted font-size-base font-weight-normal">or</span>
      </Divider>
      <div className="d-flex justify-content-center">
        <Button
          onClick={() => history.push(`/auth/forgot-password`)}
          className="mr-2 w-100"
          disabled={loading}
        >
          Forget Password
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity: showMessage ? 1 : 0,
          marginBottom: showMessage ? 20 : 0,
        }}
      >
        <Alert type="error" showIcon message={message}></Alert>
      </motion.div>
      <Form layout="vertical" name="login-form" onFinish={onLogin}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input your email",
            },
            {
              type: "email",
              message: "Please enter a validate email!",
            },
          ]}
        >
          <Input prefix={<MailOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="password"
          label={
            <div
              className={`d-flex justify-content-between w-100 align-items-center`}
            >
              <span>Password</span>
            </div>
          }
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loadingLogin}>
            Sign In
          </Button>
        </Form.Item>
        {/* {
					otherSignIn ? renderOtherSignIn : null
				} */}
        {forgetPassword}
        {extra}
      </Form>
    </>
  );
};

LoginForm.propTypes = {
  otherSignIn: PropTypes.bool,
  showForgetPassword: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

LoginForm.defaultProps = {
  otherSignIn: true,
  showForgetPassword: false,
};

const mapStateToProps = ({ auth }) => {
  const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect };
};

const mapDispatchToProps = {
  showAuthMessage,
  showLoading,
  hideAuthMessage,
  authenticated,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
