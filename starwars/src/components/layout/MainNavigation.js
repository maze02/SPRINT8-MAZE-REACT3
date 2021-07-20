import { useContext } from "react";
import { AuthContext } from "../context/auth/auth-context";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
const MainNavigation = () => {
  const ctx = useContext(AuthContext);
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Starwars Logo</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/" activeClassName={classes.active}>
              Welcome
            </NavLink>
          </li>
          <li>
            <NavLink to="/home" activeClassName={classes.active}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/starships" activeClassName={classes.active}>
              Starships
            </NavLink>
          </li>
          <li>
            <NavLink to="/actors" activeClassName={classes.active}>
              Actors
            </NavLink>
          </li>
          {!ctx.isLoggedIn.status && (
            <li>
              <NavLink to="/registration" activeClassName={classes.active}>
                Register
              </NavLink>
            </li>
          )}
          {!ctx.isLoggedIn.status && (
            <li>
              <NavLink to="/login" activeClassName={classes.active}>
                Login
              </NavLink>
            </li>
          )}
          {ctx.isLoggedIn.status && (
            <li>
              <button onClick={ctx.onLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

/*
  {!ctx.isLoggedIn.status && (
            <li>
              <NavLink to="/login" activeClassName={classes.active}>
                Login
              </NavLink>
            </li>
          )}
          {ctx.isLoggedIn.status && (
            <li>
              <button onClick={ctx.onLogout}>Logout</button>
            </li>
          )}
*/
