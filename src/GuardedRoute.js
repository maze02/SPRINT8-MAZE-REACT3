import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({ component: Component, ...rest }) => {
  //have to retrieve directly from localStorage to get the latest version
  const isAuthStr = localStorage.getItem("isLoggedIn");
  const isAuthObj = !isAuthStr
    ? { status: false, name: "" }
    : JSON.parse(isAuthStr);
  const isAuth = isAuthObj.status;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth === true ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default GuardedRoute;
