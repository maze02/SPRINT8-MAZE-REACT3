import { AuthContext } from "../context/auth/auth-context";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyCheckbox from "../forms/MyCheckbox";
import MyTextInput from "../forms/MyTextInput";

const Registration = () => {
  const { setUserList, userList, isLoggedIn, setSuccessReg, successReg } =
    useContext(AuthContext);
  const history = useHistory();
  const [regFailedMsg, setFailedRegMsg] = useState({ status: false, msg: "" });

  const validateReg2 = (newUser) => {
    const successHandler = () => {
      setUserList([...userList, newUser]);
      localStorage.setItem("userList", JSON.stringify([...userList, newUser]));
      setSuccessReg((prev) => true);
      setTimeout(() => {
        setSuccessReg(false);
      }, 2000);
      setTimeout(() => {
        console.log("I'M REDIRECTING YOU TO LOGIN");
        history.replace("/login");
      }, 2000);
      return;
    };
    if (userList.length) {
      for (let i = 0; i < userList.length; i++) {
        if (userList[i].email.localeCompare(newUser.email) === 0) {
          setSuccessReg((prev) => false);
          setFailedRegMsg((prev) => {
            return {
              status: true,
              msg: "Registration failed. Please use another email address.",
            };
          });
          setTimeout(() => {
            setFailedRegMsg((prev) => {
              return { status: false, msg: "" };
            });
          }, 3000);
          return;
        }
      }
      successHandler();
    } else {
      successHandler();
    }
  };

  const handleSubmit = (values) => {
    validateReg2(values);
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <h3 className="spacer">
        Sign up to view intriguing facts on Starwars movies.
      </h3>
      <div className="form-user">
        <div className="container-form shadow-dark">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              passwordConfirmation: "",
              acceptedTerms: false, // added for our checkbox
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object({
              firstName: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),
              lastName: Yup.string()
                .max(20, "Must be 20 characters or less")
                .required("Required"),
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              password: Yup.string().required("Password is required"),
              passwordConfirmation: Yup.string().oneOf(
                [Yup.ref("password"), null],
                "Passwords must match"
              ),
              acceptedTerms: Yup.boolean()
                .required("Required")
                .oneOf([true], "You must accept the terms and conditions."),
            })}
          >
            <Form>
              <div className="field-form">
                <MyTextInput
                  label="First Name"
                  name="firstName"
                  type="text"
                  placeholder="Your name"
                />
              </div>
              <div className="field-form">
                <MyTextInput
                  label="Last Name"
                  name="lastName"
                  type="text"
                  placeholder="Your Surname"
                />
              </div>
              <div className="field-form">
                <MyTextInput
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
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
              <div className="field-form">
                <MyTextInput
                  label="Repeat Password"
                  name="passwordConfirmation"
                  type="password"
                  placeholder="Your password"
                />
              </div>
              <MyCheckbox name="acceptedTerms">
                <span className="checkbox-text">
                  I accept the terms and conditions
                </span>
              </MyCheckbox>
              <div className="field-form-btn">
                <button className="btn btn-primary btn-block" type="submit">
                  Submit
                </button>
              </div>
            </Form>
          </Formik>
          {successReg && (
            <p className="text-black">You are now signed up and can login!</p>
          )}
          {regFailedMsg.status && (
            <p className="text-error">{regFailedMsg.msg}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Registration;
