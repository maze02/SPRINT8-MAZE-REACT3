import { useContext } from "react";
import { AuthContext } from "../context/auth/auth-context";

const Home = () => {
  const ctx = useContext(AuthContext);
  return (
    <h1>Hello {ctx.isLoggedIn.name}! What would you like to checkout today?</h1>
  );
};

export default Home;
