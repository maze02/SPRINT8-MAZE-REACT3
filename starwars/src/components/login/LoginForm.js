import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/auth/auth-context";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../forms/MyTextInput";

const Login = () => {
  const [loginFailed, setLoginFailed] = useState(false);
  let nameRef = useRef(null);
  let loginPasswordRef = useRef(null);
  //const [state, setState] = useContext(AppContext);
  const ctx = useContext(AuthContext);
  const validateLogin = () => {};
  return (
    <div>
      <h1>Login</h1>
      <div className="form-user">
        <div className="container-form shadow-dark">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              password: Yup.string().required("Password is required"),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setTimeout(() => {
                //alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
              let userLogger = values;
              console.log("userLogger email= " + userLogger.email);
              ctx.setUserLoginTry((prevState) => {
                return userLogger;
              });
              console.log(
                "printing from llogin page : ctx.userLoginTry email:  " +
                  ctx.userLoginTry.email
              );
              //ctx.handleLogin();
              //setLoginFailed(false);
              //resetForm({ values: "" });
            }}
          >
            <Form>
              <div className="field-form">
                <MyTextInput
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="jonah@formik.com"
                />
              </div>
              <div className="field-form">
                <MyTextInput
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Your password"
                />
              </div>

              <div className="field-form-btn">
                <button className="btn btn-primary btn-block" type="submit">
                  Submit
                </button>
              </div>
              {ctx.failedLoginMsg.status && (
                <p className="text-error">{ctx.failedLoginMsg.msg}</p>
              )}
            </Form>
          </Formik>
        </div>
      </div>
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

/*
index.js:1 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at AuthContextMyProvider (http://localhost:3000/static/js/main.chunk.js:374:81)
    at App
    at Router (http://localhost:3000/static/js/vendors~main.chunk.js:46675:30)
    at BrowserRouter (http://localhost:3000/static/js/vendors~main.chunk.js:46295:35)



    onSubmit={(values, { setSubmitting, resetForm }) => {
              setTimeout(() => {
                //alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
              let userLogger = values;
              console.log(userLogger);
              ctx.setUserLoginTry(values);
              if (ctx.isLoggedIn.status) {
                resetForm({ values: "" });
              }
            }}
          >
*/
