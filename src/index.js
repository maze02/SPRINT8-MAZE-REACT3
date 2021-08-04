import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

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
