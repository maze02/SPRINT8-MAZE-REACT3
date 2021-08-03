import { useContext, useRef, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../context/auth/auth-context";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../forms/MyTextInput";

/*here is the answer: https://stackoverflow.com/questions/59735137/handlesubmit-and-values-not-recognized-in-formik-form*/
const Login = () => {
  const [loginFailed, setLoginFailed] = useState(false);
  let nameRef = useRef(null);
  let loginPasswordRef = useRef(null);

  const ctx = useContext(AuthContext);
  const history = useHistory();
  //useeffect hook activating helper function, so that status is the latest. Explore in another branch how to use useReduce instead
  //helper validator of existing userlist:
  const validator2 = (userLogger) => {
    //validating login input data against userList data
    if (ctx.userList.length) {
      for (let i = 0; i < ctx.userList.length; i++) {
        if (userLogger.email === ctx.userList[i].email) {
          if (userLogger.password === ctx.userList[i].password) {
            //this is not up to date when it is fed below
            ctx.setIsLoggedIn((prev) => {
              return { status: true, name: ctx.userList[i].firstName };
            });
            localStorage.setItem(
              "isLoggedIn",
              JSON.stringify({ status: true, name: ctx.userList[i].firstName })
            );
            history.replace("/home");
            return;
          } else {
            ctx.setFailedLoginMsg({
              status: true,
              msg: "Incorrect password.Try again.",
            });
            setTimeout(() => {
              ctx.setFailedLoginMsg({ status: false, msg: "" });
            }, 3000);
          }
        }
      }
      ctx.setFailedLoginMsg({
        status: true,
        msg: "You're not registered. Please sign up!",
      });
      setTimeout(() => {
        ctx.setFailedLoginMsg({ status: false, msg: "" });
      }, 3000);
    }
  };
  /*
  useEffect(() => {
    if (ctx.isLoggedIn.status) {
      console.log("INSIDE LOGIN FORM COMPONENENT -> USEFECT ACTIVATED");
      localStorage.setItem("isLoggedIn", JSON.stringify(ctx.isLoggedIn));
      /* console.log(
        "Hey guys, printing isLoggedIn.status from ctx" + ctx.isLoggedIn.status
      );
      console.log(`${ctx.isLoggedIn.name} logged in succesfully`);
      
      history.replace("/home");
      //}
    }
  }, [ctx.isLoggedIn.status]);
*/
  const handleSubmit = (values) => {
    /* setTimeout(() => {
      //alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);*/
    let userLogger = values;
    validator2(values);
  };

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
            onSubmit={handleSubmit}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              password: Yup.string().required("Password is required"),
            })}
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
   useEffect(() => {
     if (isLoggedIn.status) {
       localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
       console.log(
         "Hey guys, printing isLoggedIn.status from ctx" + isLoggedIn.status
       );
       console.log(`${isLoggedIn.name} logged in succesfully`);
       history.replace("/home");
     }
   }, [isLoggedIn]);
   */

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

//const validateLogin = () => {};
//const [state, setState] = useContext(AppContext);

//handle submit taken out of formik
/*
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
              redirectUser();
              //ctx.handleLogin();
              //setLoginFailed(false);
              //resetForm({ values: "" });
            }}
*/
