import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Row, Form, Input, Checkbox, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { RiVirusLine } from 'react-icons/ri';
import { addUser } from '../../redux/usersSlice';
import './Register.css';

function Register() {
  const [warningMessage, setWarningMessage] = useState('');
  const [form] = Form.useForm();
  const { Text, Title } = Typography;
  const dispatch = useDispatch();
  const history = useHistory();
  const usersList = useSelector(state => state.users);

  const handleSubmitRegistration = (values) => {
    const filteredUsers = usersList.filter(user => user.id === values.username);
    if (filteredUsers.length > 0) {
      setWarningMessage('Username already exists!');
    } else {
      dispatch(addUser(values));
      history.push('/login');
    }
  };

  const handleClearWarning = () => {
    setWarningMessage('');
  };

  return (
    <div className='register'>
      <div className="virus-logo">
        <RiVirusLine />
      </div>
      <Title>Create your account</Title>
      <div className="register-form">
        <Form
          wrapperCol={{ span: 24, offset: 0 }}
          form={form}
          name="register"
          onFinish={handleSubmitRegistration}
          scrollToFirstError
          requiredMark={true}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              }
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="username" onChange={handleClearWarning} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="password" onChange={handleClearWarning} />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords that you entered do not match!');
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="confirm password" onChange={handleClearWarning} />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject('Should accept agreement'),
              },
            ]}
            wrapperCol={{ span: 20, offset: 2 }}
          >
            <Checkbox>
              I have read the agreement.
          </Checkbox>
          </Form.Item>
          {warningMessage !== '' ? <Row justify="center"><Text type="danger">{warningMessage}</Text></Row> : null}
          <Form.Item wrapperCol={{ span: 20, offset: 2 }}>
            <Button type="primary" htmlType="submit">
              Register
        </Button>
          </Form.Item>
        </Form>
        <Row justify="center"><Text>Already have an account? <Link to="/login">Login</Link></Text></Row>
      </div>
    </div >
  );
};

export default Register;