import { useContext } from "react";
import { AppContext } from "../context/auth/test-context";

export default () => {
  const [state, setState] = useContext(AppContext);
  return (
    <div>
      <h1>Hey {state.name} this is the ShowState Component</h1>
      <p>{state.name}</p>
    </div>
  );
};
