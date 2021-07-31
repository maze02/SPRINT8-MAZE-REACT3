import { createContext, useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
//import Showstate from "../../login/Showstate";

const AuthContextMyProvider = (props) => {
  const history = useHistory(); //history obj.
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
    console.log(
      "Hey I think I'm trying to make a space to store the initial data beginning of all"
    );
    initialRegisteredUsers = [];
  }

  //CHECKING LOGGED IN STATUS
  const [isLoggedIn, setIsLoggedIn] = useState({ status: false, name: "" });

  useEffect(() => {
    let initialLogin = JSON.parse(localStorage.getItem("isLoggedIn"));
    if (!initialLogin) {
      setIsLoggedIn({ status: false, name: "" });
    } else {
      setIsLoggedIn(initialLogin);
    }
  }, []);

  //const [isLoggedIn, setIsLoggedIn] = useState(initialLogin);
  //REGISTRATION -UPDATING LIST
  const [userList, setUserList] = useState(initialRegisteredUsers);

  useEffect(() => {
    console.log(
      "I'm printing the uptodate userList from auth context:" + userList
    );
    if (initialRegisteredUsers) {
      console.log("Hey, I'm adding to the localStorage userlist");
      localStorage.setItem("userList", JSON.stringify(userList));
      setSuccessReg(true);
      setTimeout(() => {
        setSuccessReg(false);
      }, 2000);
      setTimeout(() => {
        history.replace("/login");
      }, 2000);
    } else {
      localStorage.setItem("userList", JSON.stringify([]));
      console.log(
        "Hey I think I'm making a store space in case one hasn't been made before?"
      );
    }
  }, [userList]);

  //LOGGING IN
  const [failedLoginMsg, setFailedLoginMsg] = useState({
    status: false,
    msg: "",
  });
  //
  useEffect(() => {
    console.log(
      "Hey guys! Printing from ctx userLoginTry'email : " + userLoginTry.email
    );
    //validating login input data against userList data
    if (userList.length) {
      for (let i = 0; i < userList.length; i++) {
        if (userLoginTry.email === userList[i].email) {
          if (userLoginTry.password === userList[i].password) {
            //this is not up to date when it is fed below
            setIsLoggedIn((prev) => {
              return { status: true, name: userList[i].firstName };
            });
            /*
            //if data is valid, setting it into the storage
            localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
            console.log(
              "Hey guys, printing isLoggedIn.status from ctx" +
                isLoggedIn.status
            );
            console.log(`${isLoggedIn.name} logged in succesfully`);
            history.replace("/home");
            //
            */
            return;
          } else {
            setFailedLoginMsg({
              status: true,
              msg: "Incorrect password.Try again.",
            });
            setTimeout(() => {
              setFailedLoginMsg({ status: false, msg: "" });
            }, 3000);
          }
        }
      }
      console.log("you're not registered");
      setFailedLoginMsg({
        status: true,
        msg: "You're not registered. Please sign up!",
      });
      setTimeout(() => {
        setFailedLoginMsg({ status: false, msg: "" });
      }, 3000);
    }
  }, [userLoginTry]);
  //isLoggedIn, userList
  //, [userLoginTry])

  useEffect(() => {
    if (isLoggedIn.status) {
      localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
      console.log(
        "Hey guys, printing isLoggedIn.status from ctx" + isLoggedIn.status
      );
      console.log(`${isLoggedIn.name} logged in succesfully`);
      history.replace("/home");
    }
  }, [isLoggedIn]);

  //LOGOUT
  const handleLogout = useCallback(() => {
    setIsLoggedIn({ status: false, name: "" });
    localStorage.removeItem("isLoggedIn");
    console.log("You logged out");
    history.replace("/");
  }, [history]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
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
// setUserList: setUserList(),  => THIS CAUSED AN INFINITE LOOP _ ARRRRGHHHHHH -> DO NOT CALL FUNC IN PROPS

// //error: let initialUserList = localStorage.getItem("registeredUsers");

//above wasn't working because I hadn't initialised the setUserList with initialRegisteredUsers. What stress! REMEMBER TO DO THAT, as a result was resetting it to an empty array everytime I refreshed the browser.

/*want to refer to it in useEffect but it doesn't work i.e. as handleSignup( ) or handleSignUp
  const handleSignUp = () => {
    if (initialRegisteredUsers) {
      console.log("Hey, I'm adding the the localStorage userlist");
      localStorage.setItem("registeredUsers", JSON.stringify(userList));
    } else {
      localStorage.setItem("registeredUsers", JSON.stringify([]));
    }
  };

    useEffect(() => {
    handleSignUp;
  }, [userList]);
*/
//run handleSignUp function, i.e. update userList in localStorage everytime userlist is updated.

/*{
  isLoggedIn: {},
  //setUser: (name, surname, email, password, id) => {},
  setUserList: () => {},
  userList: [],
} this was creating a problem*/

/*vendors~main.chunk.js:sourcemap:3521 Throttling navigation to prevent the browser from hanging. See https://crbug.com/882238. Command line switch --disable-ipc-flooding-protection can be used to bypass the protection*/
/*
vendors~main.chunk.js:sourcemap:44557 
Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at AuthContextMyProvider (http://localhost:3000/static/js/main.chunk.js:376:86)
    at App
    at Router (http://localhost:3000/static/js/vendors~main.chunk.js:46675:30)
    at BrowserRouter (http://localhost:3000/static/js/vendors~main.chunk.js:46295:35)
console.<computed> @ vendors~main.chunk.js:sourcemap:44557
22vendors~main.chunk.js:sourcemap:

44557 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at AuthContextMyProvider (http://localhost:3000/static/js/main.chunk.js:376:86)
    at App
    at Router (http://localhost:3000/static/js/vendors~main.chunk.js:46675:30)
    at BrowserRouter (http://localhost:3000/static/js/vendors~main.chunk.js:46295:35)

*/

/*
[DOM] Input elements should have autocomplete attributes (suggested: "new-password"): (More info: https://goo.gl/9p2vKq) 
*/

/*
index.js:1 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    at Formik (http://localhost:3000/static/js/vendors~main.chunk.js:2069:19)
    at div
    at div
    at div
    at Login (http://localhost:3000/static/js/main.chunk.js:1662:69)
console.<computed> @ index.js:1
overrideMethod @ react_devtools_backend.js:2574
printWarning @ react-dom.development.js:67
error @ react-dom.development.js:43
warnAboutUpdateOnUnmountedFiberInDEV @ react-dom.development.js:23914
scheduleUpdateOnFiber @ react-dom.development.js:21840
dispatchAction @ react-dom.development.js:16139
(anonymous) @ Formik.tsx:726
(anonymous) @ LoginForm.js:34
setTimeout (async)
onSubmit @ LoginForm.js:32
(anonymous) @ Formik.tsx:849
(anonymous) @ Formik.tsx:1200
(anonymous) @ Formik.tsx:756
Promise.then (async)
(anonymous) @ Formik.tsx:731
(anonymous) @ Formik.tsx:1200
(anonymous) @ Formik.tsx:823
(anonymous) @ Formik.tsx:1200
callCallback @ react-dom.development.js:3945
invokeGuardedCallbackDev @ react-dom.development.js:3994
invokeGuardedCallback @ react-dom.development.js:4056
invokeGuardedCallbackAndCatchFirstError @ react-dom.development.js:4070
executeDispatch @ react-dom.development.js:8243
processDispatchQueueItemsInOrder @ react-dom.development.js:8275
processDispatchQueue @ react-dom.development.js:8288
dispatchEventsForPlugins @ react-dom.development.js:8299
(anonymous) @ react-dom.development.js:8508
batchedEventUpdates$1 @ react-dom.development.js:22396
batchedEventUpdates @ react-dom.development.js:3745
dispatchEventForPluginEventSystem @ react-dom.development.js:8507
attemptToDispatchEvent @ react-dom.development.js:6005
dispatchEvent @ react-dom.development.js:5924
unstable_runWithPriority @ scheduler.development.js:468
runWithPriority$1 @ react-dom.development.js:11276
discreteUpdates$1 @ react-dom.development.js:22413
discreteUpdates @ react-dom.development.js:3756
dispatchDiscreteEvent @ react-dom.development.js:5889
20index.js:1 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at AuthContextMyProvider (http://localhost:3000/static/js/main.chunk.js:376:86)
    at App
    at Router (http://localhost:3000/static/js/vendors~main.chunk.js:46675:30)
    at BrowserRouter (http://localhost:3000/static/js/vendors~main.chunk.js:46295:35)



     useEffect(() => {
    console.log("Printing from ctx userLoginTry'email : " + userLoginTry.email);
    if (userList.length) {
      for (let i = 0; i < userList.length; i++) {
        if (userLoginTry.email === userList[i].email) {
          if (userLoginTry.password === userList[i].password) {
            setIsLoggedIn({ status: true, name: userList[i].firstName });
            localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
            console.log(`${isLoggedIn.name} logged in succesfully`);
            history.replace("/home");
            return;
          } else {
            console.log("incorrect password");
          }
        }
      }
      console.log("you're not registered");
    }
  }, [userLoginTry, isLoggedIn, userList]);
*/

/*index.js:1 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    at Formik (http://localhost:3000/static/js/vendors~main.chunk.js:2069:19)
    at div
    at div
    at Registration (http://localhost:3000/static/js/main.chunk.js:3079:63)

*/
