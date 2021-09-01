import styled from "styled-components";
import { Fragment } from "react";
import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <Main>
        {props.children}
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="stars"></div>
        <div className="twinkling"></div>
      </Main>
    </Fragment>
  );
};
const Main = styled.main`
  margin: 3rem auto;
  width: 90%;
  max-width: 80rem;
`;

export default Layout;
