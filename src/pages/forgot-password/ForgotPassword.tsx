import {
  Form,
  Input
} from 'antd';
import React from 'react';
import './style.less';
import { FC, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';


const ForgotPassword: FC = () => {
  const [CheckEmail, setCheckEmail] = useState('');

  const [form] = Form.useForm();
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  // const { signIn } = useAuth();

  const onFinish = values => {
    console.log('Success:', values);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const handleSubmit = async e => {
    const email = e.username;

    const password = e.password;

    try {
      toast.success('Login success.', {
        duration: 5000,
      });
      navigate('/');
    } catch (error) {
      toast.error('Email or password incorrect!', {
        duration: 5000,
      });
    }
  };

  return (
      <div className="form-container">
        <div className="login-page">
          <div className="form-wrapper">
            <span className="logo"></span>
            <span className="title" style={{ fontSize: '25px', fontWeight: 'bold', paddingBottom: '20px',color:'white' }}>
            Enter your registered email to reset your password
            </span>
            <Form
              name="basic"
              wrapperCol={{
                span: 20,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={handleSubmit}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
              style={{ color: '#000' }}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    type: 'email',
                    message: 'Định dạng email không chính xác',
                  },
                  { required: true, message: "Email không được để trống" },
                ]}
                wrapperCol={{
                  span: 22,
                }}
              >
                <Input
                  placeholder="Email"
                  style={{
                    width: 500,
                    height: 50,
                  }}
                />
              </Form.Item>
              <div>
                  {/* type="primary" htmlType="submit" style={{alignItems:'center',textAlign:'center',justifyContent:'center'}} */}
                  <button style={{ justifyContent: 'center', width: '500px' }}>Reset Password</button>
                </div>
            </Form>
            <p style={{ fontSize: '15px', color:'#000' }}>
              New here?. 
              <Link to="/register">
                <u style={{ fontWeight: 'bold',color:'red' }}> Sign Up</u>
              </Link>
            </p>
            <p style={{ fontSize: '15px',color:'#000' }}>
            Already have an account? 
              <Link to="/forgot-password">
                <u style={{ fontWeight: 'bold',color:'red' }}> Sign In.</u>
              </Link>
            </p>
          </div>
        </div>
      </div>
  )
}

export default ForgotPassword