/*Maria's Dolce Gabbanna Errors
1. key is not accessable as a prop
2. Use a different prop name to access id , i.e. id, even if it's
included in key

//Recurrent Armani Error
//Keep forgetting to destructure the context I import from the path right at the top
//comes up as undefined

// setUserList: setUserList(),  => THIS CAUSED AN INFINITE LOOP _ ARRRRGHHHHHH -> DO NOT CALL FUNC IN PROPS

// //error: let initialUserList = localStorage.getItem("registeredUsers");

//above wasn't working because I hadn't initialised the setUserList with initialRegisteredUsers. What stress! REMEMBER TO DO THAT, as a result was resetting it to an empty array everytime I refreshed the browser.


//Maria's Chanel errors!!!!:
/*
FORGETTING TO ADD A '.' between context and provider-> FOR GOODNESS SAKE!!!!

//forgetting to extra the results as an array from the api results caused function error

https://www.pluralsight.com/guides/typeerror-handling-in-react.js-for-map-function


Maria's Burkin Bag Error of the century
-----------------------------------------------
If you don't want to get state.map is not a function error
DON'T SET THE INITIAL STATE AS BOOLEAN!!!! Like truly wtf were you thinking
  const [actors, setActors] = useState(false); NOOOO
    const [actors, setActors] = useState([]); YESS
*/

//Recurrent Armani Error
//Keep forgetting to destructure the context I import from the path right at the top
//comes up as undefined

/*Maria's Dolce Gabbanna Errors
1. key is not accessable as a prop
2. Use a different prop name to access id , i.e. id, even if it's
included in key
*/

//===============================================================
//-----------------------------------
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
