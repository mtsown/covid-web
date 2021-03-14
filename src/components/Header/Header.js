import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import CryptoJS from 'crypto-js';
import './Header.css';

function Header() {
  const token = localStorage.getItem('userToken');
  const bytes = CryptoJS.AES.decrypt(token, 'SonNT72');
  const activeUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  const handleClickLogout = () => {
    localStorage.removeItem('userToken');
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Link onClick={handleClickLogout} to="/login">
          Log out
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="header">
      <Row justify="space-between">
        <Col className="header-logo" span={6}>
          <Link to="/">COVID-19 <span>Tracker</span></Link>
        </Col>
        <Col className="header-nav" span={6}>
          <Dropdown overlay={menu}>
            <span className="ant-dropdown-link">
              {activeUser.id} <DownOutlined />
            </span>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
}

export default Header;