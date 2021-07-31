import { useContext } from "react";
import { AuthContext } from "../context/auth/auth-context";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import whiteLogo from "../images/whitelogo.png";
const MainNavigation = () => {
  const ctx = useContext(AuthContext);
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul className={classes.row1}>
          <div className={classes.col1}></div>
          <div className={classes.col2}>
            <img className={classes.logo} src={whiteLogo} alt="starwars logo" />
          </div>
          <div className={classes.col3}>
            {!ctx.isLoggedIn.status && (
              <li>
                <NavLink to="/login" activeClassName={classes.active}>
                  LOGIN
                </NavLink>
              </li>
            )}
            {ctx.isLoggedIn.status && (
              <li>
                <button
                  className="btn btn-secondary btn-logout"
                  onClick={ctx.onLogout}
                  type="button"
                >
                  LOGOUT
                </button>
              </li>
            )}
            {!ctx.isLoggedIn.status && (
              <li className={classes.signup}>
                <NavLink to="/registration" activeClassName={classes.active}>
                  SIGN UP
                </NavLink>
              </li>
            )}
          </div>
        </ul>
        <ul className={classes.row2}>
          <li>
            <NavLink to="/" activeClassName={classes.active}>
              WELCOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/home" activeClassName={classes.active}>
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/starships" activeClassName={classes.active}>
              STARSHIPS
            </NavLink>
          </li>
          <li>
            <NavLink to="/characters" activeClassName={classes.active}>
              CHARACTERS
            </NavLink>
          </li>
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
