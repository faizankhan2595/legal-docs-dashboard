import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Avatar, message, Upload } from "antd";
import { connect } from "react-redux";
import { EditOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import Icon from "components/util-components/Icon";
import { signOut } from "redux/actions/Auth";
import { useHistory } from "react-router-dom";
import { API_BASE_URL, SERVER_URL } from "../../constants/ApiConstant";
import axios from "axios";

const menuItem = [
  {
    title: "Edit Profile",
    icon: EditOutlined,
    path: "/",
  },
];

export const NavProfile = () => {
  let history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarURL, setAvatarURL] = useState("");

  var avatarEndpoint = `${API_BASE_URL}upload-order-docs-clients`;

  useEffect(() => {
    setName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
    setAvatarURL(localStorage.getItem("avatarURL"));
  }, []);

  const editProfile = () => {
    const role = localStorage.getItem("role");

    if (role && +role === 0) history.push(`/admin/profile`);
    else history.push(`/client/profile`);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("avatarURL");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    history.push(`/auth/login`);
  };

  const saveuser = () => {
    var url = API_BASE_URL + "save-profile-avatar";
    var data = { profile_pic: avatarURL };

    axios.post(url, data, {}).then((response) => {});
  };

  const onUploadAavater = (info) => {
    const key = "updatable";
    if (info.file.status === "uploading") {
      message.loading({ content: "Uploading...", key, duration: 1000 });
      return;
    }
    if (info.file.status === "done") {
      setAvatarURL(info.file.response.url);
      localStorage.setItem("avatarURL", info.file.response.url);
      saveuser();
      message.success({ content: "Uploaded!", key, duration: 1.5 });
    }
  };

  const profileImg = "/img/avatars/thumb-2.jpg";
  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex">
          <Avatar
            size={45}
            src={avatarURL ? SERVER_URL + avatarURL : profileImg}
          />
          <div className="pl-3">
            <h4 className="mb-0">{name}</h4>
            <span className="text-muted">{email}</span>
          </div>
        </div>
      </div>
      <div className="nav-profile-body">
        <Menu>
          {menuItem.map((el, i) => {
            return (
              <Menu.Item key={i} onClick={() => editProfile()}>
                <Icon className="mr-3" type={el.icon} />
                <span className="font-weight-normal">{el.title}</span>
              </Menu.Item>
            );
          })}
          <Menu.Item key={menuItem.length + 1}>
            <Upload
              onChange={onUploadAavater}
              showUploadList={false}
              action={avatarEndpoint}
            >
              <span>
                <UserOutlined className="mr-3" />
                <span className="font-weight-normal">Change Avatar</span>
              </span>
            </Upload>
          </Menu.Item>
          <Menu.Item key={menuItem.length + 2} onClick={(e) => signOut()}>
            <span>
              <LogoutOutlined className="mr-3" />
              <span className="font-weight-normal">Sign Out</span>
            </span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
      <Menu className="d-flex align-item-center" mode="horizontal">
        <Menu.Item key="profile">
          <Avatar src={avatarURL ? SERVER_URL + avatarURL : profileImg} />
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
};

export default connect(null, { signOut })(NavProfile);
