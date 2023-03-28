import { Button, Checkbox, Form, Input } from 'antd';
import { loginStyles } from './Login.styles';
import { Navigate, redirect, useNavigation, useRouteLoaderData, useSubmit } from 'react-router-dom';
import { apiLogin } from '../../servers/user';
import { LoginParams } from '../../types/userTypes';
import { ActionFunction } from 'react-router-dom';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = {
    username: formData.get('username'),
    password: formData.get('password'),
  };

  const response = await apiLogin(data as LoginParams);
  if (!response.status) {
    return response;
  }

  localStorage.setItem('token', response.result.token);
  return redirect('/');
};

const Login = () => {
  const navigation = useNavigation();
  const submit = useSubmit();
  const token = useRouteLoaderData('Root');
  const isSubmitting = navigation.state === 'submitting';

  if (token) {
    return <Navigate to="/" replace={true} />;
  }

  const onFinish = async ({ username, password }: LoginParams) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    submit(formData, { method: 'post' });
  };

  return (
    <div css={loginStyles}>
      <Form className="login-form" onFinish={onFinish}>
        <h2>REACT ANTD ADMIN</h2>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'username',
            },
          ]}
        >
          <Input placeholder="username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'enterPasswordMessage',
            },
          ]}
        >
          <Input type="password" placeholder="password" />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>rememberUser</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={isSubmitting} className="login-form-button">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
