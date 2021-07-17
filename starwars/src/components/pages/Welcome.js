import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";

import MyCheckbox from "../forms/MyCheckbox";
import MyTextInput from "../forms/MyTextInput";

const Welcome = () => {
  return (
    <div>
      <h1>Welcome to StarWars Encyclopedia!</h1>
      <p>Sign up to view intriguing facts on Starwars movies.</p>
      <h2>Formik Test</h2>
      <div className="form-user">
        <div className="container-form shadow-dark">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              acceptedTerms: false, // added for our checkbox
            }}
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
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                //alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
              console.log(JSON.stringify(values));
              localStorage.setItem("users", JSON.stringify(values));
            }}
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
              <div className="field-form">
                <MyTextInput
                  label="Repeat Password"
                  name="passwordConfirmation"
                  type="password"
                  placeholder="Your password"
                />
              </div>
              <MyCheckbox name="acceptedTerms">
                I accept the terms and conditions
              </MyCheckbox>
              <div className="field-form">
                <button className="btn btn-primary btn-block" type="submit">
                  Submit
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
