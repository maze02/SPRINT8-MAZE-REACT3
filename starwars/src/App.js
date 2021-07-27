import { Route, Switch } from "react-router";
import { Fragment } from "react";

/*tutorial
import styled from "styled-components";
const StyledDiv = styled.div`
  width: 90%;
  max-width: 40rem;
  border: 1px solid #ccc;
  padding: 1rem;
`;
*/
//CONTEXT IMPORTS
import AuthContextMyProvider from "./components/context/auth/auth-context.js";
import ActorsProvider from "./components/context/actors-context.js";
import StarshipsProvider from "./components/context/StarshipsContext";
import StarshipExtensiveProvider from "./components/context/StarshipsExtensiveCtx.js";

//PAGE & COMPONENTS IMPORTS
import Layout from "./components/layout/Layout";
import MainNavigation from "./components/layout/MainNavigation";
import Registration from "./components/registration/Registration";
import Login from "./components/login/LoginForm";
import Welcome from "./components/pages/Welcome";
import Home from "./components/pages/Home";
import AllStarshipsPage from "./components/pages/AllStarshipsPage";
import Actors from "./components/pages/AllActorsPage";
import StarshipDetailPage from "./components/pages/StarshipDetailPage";
import ActorDetailPage from "./components/pages/ActorDetailPage";
import AllActorsPage from "./components/pages/AllActorsPage";

function App() {
  return (
    <Fragment>
      <AuthContextMyProvider>
        <StarshipsProvider>
          <StarshipExtensiveProvider>
            <ActorsProvider>
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
                    <AllActorsPage />
                  </Route>
                  <Route path="/actors-detail/:actorsId">
                    <ActorDetailPage />
                  </Route>
                </Switch>
              </Layout>
            </ActorsProvider>
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
