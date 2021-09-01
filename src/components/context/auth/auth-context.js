import { createContext, useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

const AuthContextMyProvider = (props) => {
  const history = useHistory();
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    id: "",
  });

  const [userLoginTry, setUserLoginTry] = useState({
    email: "",
    password: "",
  });

  //REGISTERING
  const [successReg, setSuccessReg] = useState(false);

  let initialRegisteredUsers = JSON.parse(localStorage.getItem("userList"));
  if (!initialRegisteredUsers) {
    //initialise storage row with the label registeredUsers and add an empty array to begin with
      initialRegisteredUsers = [];
  }

  //CHECKING LOGGED IN STATUS
  const [isLoggedIn, setIsLoggedIn] = useState({ status: false, name: "" });

  useEffect(() => {
    let initialLogin = JSON.parse(localStorage.getItem("isLoggedIn"));
    setIsAuthLoading(true);
    if (!initialLogin) {
      setIsLoggedIn((prev) => {
        return { status: false, name: "" };
      });
      setIsAuthLoading(false);
      console.log("FROM ctx isLoggedIn " + isLoggedIn.status);
    } else {
      setIsLoggedIn((prev) => initialLogin);
      setIsAuthLoading(false);
      console.log("FROM ctx isLoggedIn " + isLoggedIn.status);
    }
  }, []);

  //REGISTRATION -UPDATING LIST
  const [userList, setUserList] = useState(initialRegisteredUsers);

  //LOGGING IN
  const [failedLoginMsg, setFailedLoginMsg] = useState({
    status: false,
    msg: "",
  });
  //

  //LOGOUT
  const handleLogout = useCallback(() => {
    setIsLoggedIn({ status: false, name: "" });
    localStorage.removeItem("isLoggedIn");
    console.log("You logged out");
    history.replace("/");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        isAuthLoading: isAuthLoading,
        setUserList: setUserList,
        userList: userList,
        userLoginTry: userLoginTry,
        setUserLoginTry: setUserLoginTry,
        onLogout: handleLogout,
        successReg: successReg,
        setSuccessReg: setSuccessReg,
        failedLoginMsg: failedLoginMsg,
        setFailedLoginMsg: setFailedLoginMsg,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextMyProvider;
export const AuthContext = createContext();
