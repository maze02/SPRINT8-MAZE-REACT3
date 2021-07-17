import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  isLoggedIn: {},
  //setUser: (name, surname, email, password, id) => {},
  setUserList: () => {},
  userList: [],
});

const AuthContextMyProvider = (props) => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    id: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState({ status: false, userId: "" });
  const [userList, setUserList] = useState([]);

  const handleSignUp = () => {
    let initialUserList = localStorage.getItem("registeredUsers");
    if (initialUserList) {
      console.log("Hey, I'm adding the the localStorage userlist");
      localStorage.setItem("registeredUsers", JSON.stringify(userList));
    } else {
      //initialise storage row with the label registeredUsers and add an empty array to begin with
      localStorage.setItem("quoteList", JSON.stringify([]));
      //localStorage.setItem("registeredUsers", `[]`);
    }
  };

  //run handleSignUp function, i.e. update userList in localStorage everytime userlist is updated.

  useEffect(() => {
    handleSignUp();
  }, [userList]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        setUserList: setUserList,
        userList: userList,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextMyProvider;

// setUserList: setUserList(),  => THIS CAUSED AN INFINITE LOOP _ ARRRRGHHHHHH -> DO NOT CALL FUNC IN PROPS
