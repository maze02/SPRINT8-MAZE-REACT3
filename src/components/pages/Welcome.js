import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";

import MyCheckbox from "../forms/MyCheckbox";
import MyTextInput from "../forms/MyTextInput";

const Welcome = () => {
  return (
    <div>
      <h1>Welcome to StarWars Fun Facts!</h1>
      <p className="textcenter">
        Sign up to view intriguing facts on Starwars movies.<br></br> Save your
        favourite starships and characters.
      </p>
    </div>
  );
};

export default Welcome;
