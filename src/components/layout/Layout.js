import { Fragment } from "react";
import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main className={classes.main}>
        {props.children}
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="stars"></div>
        <div className="twinkling"></div>
      </main>
    </Fragment>
  );
};

export default Layout;
