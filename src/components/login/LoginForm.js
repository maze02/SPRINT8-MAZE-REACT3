import { useContext, useRef, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../context/auth/auth-context";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../forms/MyTextInput";

/*here is the answer: https://stackoverflow.com/questions/59735137/handlesubmit-and-values-not-recognized-in-formik-form*/
const Login = () => {
  const ctx = useContext(AuthContext);
  const history = useHistory();

  const validator2 = (userLogger) => {
    //helper function
    const notRegisteredHandler = () => {
      ctx.setFailedLoginMsg({
        status: true,
        msg: "You're not registered. Please sign up!",
      });
      setTimeout(() => {
        ctx.setFailedLoginMsg((prev) => {
          return { status: false, msg: "" };
        });
      }, 3000);
    };
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
            ctx.setFailedLoginMsg((prev) => {
              return {
                status: true,
                msg: "Incorrect password.Try again.",
              };
            });
            setTimeout(() => {
              ctx.setFailedLoginMsg((prev) => {
                return { status: false, msg: "" };
              });
            }, 3000);
            return;
          }
        }
      }
      notRegisteredHandler();
    } else {
      notRegisteredHandler();
    }
  };

  const handleSubmit = (values) => {
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
                  placeholder="Your email"
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
