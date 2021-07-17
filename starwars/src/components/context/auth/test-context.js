import { createContext, useState } from "react";

const AppContextMyProvider = (props) => {
  const [state, setState] = useState({});
  return (
    <AppContext.Provider value={[state, setState]}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextMyProvider;
export const AppContext = createContext();

//So above it says AppContext before hte Provider because it is exported as AppContext

// I think export default is like saying whatever you import from the file will be what is surrounded by export default and
//export is like - your importing it as a specific name.
