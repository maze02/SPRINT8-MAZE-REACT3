import { useContext, useRef } from "react";
import { AppContext } from "../context/auth/test-context";

const Login = () => {
  let nameRef = useRef(null);
  const [state, setState] = useContext(AppContext);

  return (
    <div>
      <h1>Hey this is the test Login Form</h1>
      <p>We're going to test if the state is being set to the global context</p>
      <label htmlFor="loginName">Type your name</label>
      <input
        id="loginName"
        type="text"
        ref={nameRef}
        onChange={() => {
          setState({ name: nameRef.current.value });
        }}
      />
    </div>
  );
};

export default Login;
//here the name is being set in the state as an object

/*
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const NormalLoginForm = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};

ReactDOM.render(<NormalLoginForm />, mountNode);
*/
