import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import "./starsbackground.css"; //doesn't allow scrolling
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContextMyProvider from "./components/context/auth/auth-context.js";
import "./index.css";

ReactDOM.render(
  <Router>
    <AuthContextMyProvider>
      <App />
    </AuthContextMyProvider>
  </Router>,
  document.getElementById("root")
);

/*

    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>
*/
