import { Route, Switch } from "react-router";
import { Fragment } from "react";

//CONTEXT IMPORTS
//import Welcome from "./components/pages/Welcome";
//import MainHeader from "./components/layout/MainHeader";
import AuthContextMyProvider from "./components/context/auth/auth-context.js";
import AppContextMyProvider from "./components/context/auth/test-context";
import StarshipsProvider from "./components/context/StarshipsContext";

import StarshipExtensiveProvider from "./components/context/StarshipsExtensiveCtx.js";
//import Home from "./components/";
//import ShowState from "./components/login/Showstate";

//PAGE & COMPONENTS IMPORTS
import Layout from "./components/layout/Layout";
import MainNavigation from "./components/layout/MainNavigation";
import Registration from "./components/registration/Registration";
import Login from "./components/login/LoginForm";
import Welcome from "./components/pages/Welcome";
import Home from "./components/pages/Home";
import AllStarshipsPage from "./components/pages/AllStarshipsPage";
import Actors from "./components/pages/AllActors";
import StarshipDetailPage from "./components/pages/StarshipDetailPage";
import ActorDetail from "./components/pages/ActorDetail";

function App() {
  return (
    <Fragment>
      <AuthContextMyProvider>
        <StarshipsProvider>
          <StarshipExtensiveProvider>
            <Layout>
              <Switch>
                <Route path="/" exact>
                  <Welcome />
                </Route>
                <Route path="/home">
                  <Home />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/registration">
                  <Registration />
                </Route>
                <Route path="/starships">
                  <AllStarshipsPage />
                </Route>
                <Route path="/starship-detail/:starshipId">
                  <StarshipDetailPage />
                </Route>
                <Route path="/actors">
                  <Actors />
                </Route>
                <Route path="/actors-detail/:actorsId">
                  <ActorDetail />
                </Route>
              </Switch>
            </Layout>
          </StarshipExtensiveProvider>
        </StarshipsProvider>
      </AuthContextMyProvider>
    </Fragment>
  );
}

export default App;

/*
          {!loginStatus && <Welcome />}
          {loginStatus && <Home />}
*/
