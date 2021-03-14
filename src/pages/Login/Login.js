import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { Row, Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { RiVirusLine } from 'react-icons/ri';
import { toggleGlobalLoading } from '../../redux/appSlice';
import CryptoJS from 'crypto-js';
import './Login.css';

function Login() {
  const [, forceUpdate] = useState();
  const [warningMessage, setWarningMessage] = useState('');

  const isLoading = useSelector(state => state.app.isLoading);
  const usersList = useSelector(state => state.users);

  const dispatch = useDispatch();
  const history = useHistory();
  const { Text, Title } = Typography;
  const [form] = Form.useForm();
  const key = 'updatable';

  useEffect(() => {
    forceUpdate({});
  }, []);

  const handleClearWarning = () => {
    setWarningMessage('');
  };

  const openMessage = () => {
    message.loading({ content: 'Logging in...', key });
    dispatch(toggleGlobalLoading());
    setTimeout(() => {
      message.success({ content: 'Welcome back!', key, duration: 2 });
      dispatch(toggleGlobalLoading());
      history.push('/');
    }, 1500);
  };

  const handleSubmitLogin = (credentials) => {
    const filteredUsersById = usersList.filter(user => user.id === credentials.id);
    if (filteredUsersById.length > 0) {
      if (filteredUsersById[0].password === credentials.password) {
        const token = CryptoJS.AES.encrypt(JSON.stringify(filteredUsersById[0]), 'SonNT72').toString();
        localStorage.setItem('userToken', token);
        openMessage();
      } else setWarningMessage('Password incorrect!');
    } else setWarningMessage('Username does not exist!');
  };

  return (
    <div className={isLoading ? 'login disabled-login' : 'login'}>
      <div className="virus-logo">
        <RiVirusLine />
      </div>
      <Title>Sign in</Title>
      <div className="login-form">
        <Form form={form} name="horizontal_login" layout="vertical" onFinish={handleSubmitLogin} size="large">
          <Form.Item
            name="id"
            rules={[
              {
                required: true,
                message: 'Please input your username!'
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              onChange={handleClearWarning} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={handleClearWarning}
            />
          </Form.Item>
          {warningMessage !== '' ? <Row justify="center"><Text type="danger">{warningMessage}</Text></Row> : null}
          <Form.Item shouldUpdate={true}>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  form.getFieldsError().filter(({ errors }) => errors.length).length
                }
              >
                Log in
              </Button>
            )}
          </Form.Item>
        </Form>
        <Row justify="center"><Text>Don't have an account? <Link to="/register">Sign up</Link></Text></Row>
      </div>
    </div>
  );
}

export default Login;
