import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";

import MyCheckbox from "../forms/MyCheckbox";
import MyTextInput from "../forms/MyTextInput";

const Welcome = () => {
  return (
    <div>
      <h1>Welcome to StarWars Encyclopedia!</h1>
      <p className="textcenter">
        Sign up to view intriguing facts on Starwars movies.
      </p>
    </div>
  );
};

export default Welcome;
