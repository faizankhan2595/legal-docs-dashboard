import React, { useEffect } from "react";
import { connect } from "react-redux";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Alert, Divider, message as Toast } from "antd";
import {
  showAuthMessage,
  showLoading,
  hideAuthMessage,
  authenticated,
} from "redux/actions/Auth";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../../../constants/ApiConstant";
import axios from "axios";

const rules = {
  email: [
    {
      required: true,
      message: "Please input your email address",
    },
    {
      type: "email",
      message: "Please enter a validate email!",
    },
  ],
  password: [
    {
      required: true,
      message: "Please input your password",
    },
  ],
  confirm: [
    {
      required: true,
      message: "Please confirm your password!",
    },
    ({ getFieldValue }) => ({
      validator(rule, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject("Passwords do not match!");
      },
    }),
  ],
};

export const RegisterForm = (props) => {
  const {
    token,
    loading,
    redirect,
    message,
    showMessage,
    hideAuthMessage,
    allowRedirect,
  } = props;
  const [form] = Form.useForm();
  let history = useHistory();

  const pushToAdminHome = () => {
    history.push("/admin/home");
    window.location.reload();
  };

  const pushToClientHome = () => {
    history.push("/client/home");
    window.location.reload();
  };

  const onSignUp = () => {
    form
      .validateFields()
      .then((values) => {
        if (values.name === "") {
          Toast.error(`Please enter your name!`);
          return false;
        }

        if (values.email === "") {
          Toast.error(`Please enter your email!`);
          return false;
        }

        if (values.password === "") {
          Toast.error(`Please enter your password!`);
          return false;
        }

        var url = API_BASE_URL + `register`;

        var data = {
          name: values.name,
          email: values.email,
          username: values.email.substring(0, values.email.lastIndexOf("@")),
          password: values.password,
        };

        axios
          .post(url, data, {})
          .then((response) => {
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + response.data.token.token;

            Toast.success(`Account Created Successfully!`);
            localStorage.setItem("token", response.data.token.token);
            localStorage.setItem("id", response.data.user.id);
            localStorage.setItem("email", response.data.user.email);
            localStorage.setItem("name", response.data.user.name);
            localStorage.setItem("role", response.data.user.role);
            localStorage.setItem("status", response.data.user.status);

            if (+response.data.user.role === 0) {
              pushToAdminHome();
            } else {
              pushToClientHome();
            }
          })
          .catch((error) => {
            console.log(error.response);
            if (error.response) {
              if (
                error.response.data.email ===
                "The email must be a valid email address."
              ) {
                Toast.error(`Invalid Email Address!`);
              } else if (
                error.response.data.email ===
                "The email has already been taken."
              ) {
                Toast.error(`Email Address Already Taken!`);
              } else if (error.response.data.username) {
                Toast.error(`Username Already Taken!`);
              } else if (error.response.data.password) {
                Toast.error(`Please use strong password!`);
              }
            }
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
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
      <Form
        form={form}
        layout="vertical"
        name="register-form"
        onFinish={onSignUp}
      >
        <Form.Item name="name" label="Name">
          <Input prefix={<UserOutlined className="text-primary" />} />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={rules.email} hasFeedback>
          <Input prefix={<MailOutlined className="text-primary" />} />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={rules.password}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Sign Up
          </Button>
        </Form.Item>

        <Divider>
          <span className="text-muted font-size-base font-weight-normal">
            or
          </span>
        </Divider>
        <div className="d-flex justify-content-center">
          <Button
            onClick={() => history.push(`/auth/login`)}
            className="mr-2 w-100"
            disabled={loading}
          >
            Login
          </Button>
        </div>
      </Form>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect };
};

const mapDispatchToProps = {
  showAuthMessage,
  hideAuthMessage,
  showLoading,
  authenticated,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
