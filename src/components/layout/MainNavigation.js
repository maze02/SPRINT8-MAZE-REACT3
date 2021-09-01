import styled from "styled-components";
import { useContext } from "react";
import { AuthContext } from "../context/auth/auth-context";
import { NavLink } from "react-router-dom";
import whiteLogo from "../images/whitelogo.png";
const MainNavigation = () => {
  const ctx = useContext(AuthContext);
  return (
    <Header>
      <nav className="nav">
        <ul className="row1">
          <div className="col1"></div>
          <div className="col2">
            <img className="logo" src={whiteLogo} alt="starwars logo" />
          </div>
          <div className="col3">
            {!ctx.isLoggedIn.status && (
              <li>
                <NavLink to="/login" activeClassName="active">
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
              <li className="signup">
                <NavLink to="/registration" activeClassName="active">
                  SIGN UP
                </NavLink>
              </li>
            )}
          </div>
        </ul>
        <ul className="row2">
          {!ctx.isLoggedIn.status && (
            <li>
              <NavLink to="/" activeClassName="active">
                WELCOME
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/home" activeClassName="active">
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/starships" activeClassName="active">
              STARSHIPS
            </NavLink>
          </li>
          <li>
            <NavLink to="/characters" activeClassName="active">
              CHARACTERS
            </NavLink>
          </li>
        </ul>
      </nav>
    </Header>
  );
};

const Header = styled.header`
  width: 100%;
  height: 20rem;

  .nav {
    display: grid;
    width: 100%;
    height: 20rem;
    grid-template-rows: 70% 25%;
  }

  .row2 {
    border-top: 1px seashell solid;
    border-bottom: 1px seashell solid;
    display: flex;
    justify-content: center;
  }
  .logo {
    font-size: 2rem;
    color: white;
  }

  .row1 {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
  }

  .row2 {
    display: flex;
    align-items: center;
  }

  .col2 {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .col3 {
    display: flex;
    justify-items: center;
    justify-content: flex-end;
    align-items: center;
  }
  .nav ul {
    list-style: none;
  }

  .nav li {
    margin-left: 5rem;
    font-size: 1.8rem;
  }

  .signup {
    margin-left: 3rem !important;
    margin-right: 5rem !important;
    align-self: center;
  }
  .nav a {
    text-decoration: none;
    color: #daa520;
  }

  .nav a:hover,
  .nav a:active,
  .nav a.active {
    color: #e6fcfc;
  }

  .logo {
    height: 17rem;
    width: 17rem;
    margin: -5rem;
  }
`;
export default MainNavigation;
