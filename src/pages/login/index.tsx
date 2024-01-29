import { FC, useState } from 'react';
// import { Button, Checkbox, Form, Input } from 'antd';
import './index.less';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { supabase } from './../../config/supabase';
import { Form, Button, Checkbox, Input } from 'antd';

const LoginForm: FC = () => {
  const [CheckEmail, setCheckEmail] = useState('');

  const [form] = Form.useForm();
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

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
      const { error } = await signIn({ email, password });
      const { data, err } = await supabase.from('auth.users').select('*');

      console.log(data);

      if (error) throw error;
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
    <>
      <div className="form-container">
        <div className="login-page">
          <div className="form-wrapper">
            <span className="logo">INSTAGRADE 5</span>
            <span className="title" style={{ fontSize: '25px', fontWeight: 'bold', paddingBottom: '20px' }}>
              Login
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
                    message: 'Email format is incorrect',
                  },
                  { required: true, message: "Email can't be empty!" },
                ]}
                wrapperCol={{
                  // offset: 1,
                  span: 22,
                }}
              >
                <Input
                  placeholder="Email"
                  style={{
                    width: 250,
                    height: 50,
                  }}
                />
              </Form.Item>

              <Form.Item
                name="password"
                style={{
                  // width: 250,
                  // height: 50,
                  border: 'none',
                }}
                rules={[
                  {
                    required: true,
                    message: "Password can't be empty!",
                  },
                  // {
                  //   message: `Password invalid. \n Ex: Abcd@123!`,
                  //   pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*\\.\\_\\-])(?=.{5,30})')
                  // }
                ]}
                wrapperCol={{
                  // offset: 1,
                  span: 21,
                }}
              >
                <Input.Password
                  placeholder="Password"
                  style={{
                    width: 250,
                    height: 50,
                    border: 'none',
                  }}
                />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  // offset: 0,
                  span: 16,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  // offset: 2,
                  span: 22,
                }}
              >
                <div>
                  {/* type="primary" htmlType="submit" style={{alignItems:'center',textAlign:'center',justifyContent:'center'}} */}
                  <button style={{ justifyContent: 'center', width: '250px' }}>Sign in</button>
                </div>
              </Form.Item>
            </Form>
            <p style={{ fontSize: '15px' }}>
              You don't have an account?{' '}
              <Link to="/register">
                <u style={{ fontWeight: 'bold' }}>Register</u>
              </Link>
            </p>
            <p style={{ fontSize: '15px' }}>
              forgot password Click here{' '}
              <Link to="/forgot-password">
                <u style={{ fontWeight: 'bold' }}>Forgot password</u>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
