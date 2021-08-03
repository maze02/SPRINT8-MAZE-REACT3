import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./components/context/auth/auth-context";

const GuardedRoute = ({ component: Component, auth, ...rest }) => {
  const ctx = useContext(AuthContext);
  let loginStatus = ctx.isLoggedIn.status;
  let loading = ctx.isAuthLoading;

  const isAuthStr = localStorage.getItem("isLoggedIn");
  const isAuthObj = !isAuthStr
    ? { status: false, name: "" }
    : JSON.parse(isAuthStr);

  const isAuth = isAuthObj.status;
  console.log("LOGINSTATUS FROM GUARDED ROUTE TYPE" + loginStatus);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth === true ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default GuardedRoute;
