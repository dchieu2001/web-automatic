import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../config/supabase';
import './index.less';
import { Form, Button, Checkbox, Input } from 'antd';

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const handleSubmit = async e => {
    setLoading(true);
    // e.preventDefault();

    // const email = e.target[0].value;
    // const password = e.target[1].value;
    // const confirmPassword = e.target[2].value;
    const email = e.username;

    const password = e.password;
    const confirmPassword = e.confirm;
 

  if (err) {
    console.log("updload image failed", err);
  }

    try {
      const { error } = await signUp({ email, password });

      console.log(email, password);
      setLoading(false);
      if (confirmPassword !== password) {
        setErr(true);

        throw error;

        return;
      }
      if (error) throw error;
      toast.success('Account created!\nCheck your email for the login link.', {
        duration: 5000,
      });
      const currentUser = useContext(AuthContext);
      const useID = currentUser?.currentUser?.id;
      const { err } = await supabase
      .from("profile")
      .insert({ image_url: '1', uid: useID });
    } catch (error) {
      toast.error('Some thing went wrong !', {
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="form-container">
        <div className="login-page">
          <div className="form-wrapper">
            <span className="logo">INSTAGRADE 5</span>
            <span className="title" style={{ fontSize: '25px',fontWeight:'bold',paddingBottom:'20px' }}>
              Register
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
              autoComplete="off"
              style={{ color: '#000 !important'}}
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
                  offset: 2,
                  span: 22,
                }}
              >
                <Input placeholder="Email"  style={{ color: '#000 !important' }}/>
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Password can't be empty!",
                  },
                  {
                    message: `Password invalid. \n Ex: Abcd@123!`,
                    pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*\\.\\_\\-])(?=.{5,30})'),
                  },
                ]}
                wrapperCol={{
                  offset: 2,
                  span: 21,
                }}
                // hasFeedback
              >
                <Input.Password
                  placeholder="Password"
                  style={{ border: 'none', color: '#000 !important' }}
                />
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
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                  }),
                ]}
                wrapperCol={{
                  offset: 2,
                  span: 21,
                }}
              >
                <Input.Password
                  placeholder="Confirm Password"
                  style={{ border: 'none', color: '#000 !important' }}
                />
              </Form.Item>
{/* 
              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 2,
                  span: 16,
                }}
              >
                <Checkbox style={{ fontSize: '12px' }}>Remember me</Checkbox>
              </Form.Item> */}

              <Form.Item
                wrapperCol={{
                  offset: 2,
                  span: 22,
                }}
              >
                <div>
                  <button style={{ justifyContent: 'center', width: '250px' }}>Sign up</button>
                </div>
              </Form.Item>
            </Form>
            <p style={{ fontSize: '15px' }}>
              You do have an account? <Link to="/login"><u style={{fontWeight:'bold'}}>Login</u></Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
