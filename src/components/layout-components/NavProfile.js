import React, {useState,useEffect} from "react";
import { Menu, Dropdown, Avatar, Modal } from "antd";
import { connect } from 'react-redux'
import { 
  EditOutlined,
  UserOutlined,
  LogoutOutlined 
} from '@ant-design/icons';
import Icon from 'components/util-components/Icon';
import { signOut } from 'redux/actions/Auth';
import { useHistory } from "react-router-dom";

const menuItem = [
	{
		title: "Edit Profile",
		icon: EditOutlined ,
		path: "/"
  }
]

export const NavProfile = () => {
  let history = useHistory();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    setName(localStorage.getItem('name'));
    setEmail(localStorage.getItem('email'));
  }, [])

	const editProfile = () => {
    const role = localStorage.getItem('role');

    if(role && +role===0) 
      history.push(`/admin/profile`);
    else 
      history.push(`/client/profile`);
	}

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    history.push(`/auth/login`);
  }

  const handleChange = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      setVisible(false)
    }, 1000);
  }

  const profileImg = "/img/avatars/thumb-1.jpg";
  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex">
          <Avatar size={45} src={profileImg} />
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
          <Menu.Item key={menuItem.length + 1} onClick={() => setVisible(true)}>
              <span>
                <UserOutlined className="mr-3"/>
                <span className="font-weight-normal">Change Avatar</span>
              </span>
          </Menu.Item>
          <Menu.Item key={menuItem.length + 2} onClick={e => signOut()}>
              <span>
                <LogoutOutlined className="mr-3"/>
                <span className="font-weight-normal">Sign Out</span>
              </span>
          </Menu.Item>
        </Menu>

        <Modal
          title="Change Avatar"
          visible={visible}
          onOk={() => handleChange()}
          confirmLoading={confirmLoading}
          onCancel={() => setVisible(false)}
        >
          Hello
        </Modal>
      </div>
    </div>
  );
  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
      <Menu className="d-flex align-item-center" mode="horizontal">
        <Menu.Item key="profile">
          <Avatar src={profileImg} />
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
}

export default connect(null, {signOut})(NavProfile)
