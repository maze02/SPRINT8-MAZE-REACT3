import { Route, Switch } from "react-router";
import { Fragment, useContext } from "react";

//CONTEXT IMPORTS
/*import AuthContextMyProvider from "./components/context/auth/auth-context.js"; */
import CharactersProvider from "./components/context/CharactersContext.js";
import StarshipsProvider from "./components/context/StarshipsContext";
import StarshipExtensiveProvider from "./components/context/StarshipsExtensiveCtx.js";
import CharacterDetailProvider from "./components/context/CharactersDetailContext";

//PAGE & COMPONENTS IMPORTS
import Layout from "./components/layout/Layout";
import MainNavigation from "./components/layout/MainNavigation";
import Registration from "./components/registration/Registration";
import Login from "./components/login/LoginForm";
import Welcome from "./components/pages/Welcome";
import Home from "./components/pages/Home";
import AllStarshipsPage from "./components/pages/AllStarshipsPage";
import Characters from "./components/pages/AllCharactersPage";
import StarshipDetailPage from "./components/pages/StarshipDetailPage";
import CharacterDetailPage from "./components/pages/CharacterDetailPage";
import AllCharactersPage from "./components/pages/AllCharactersPage";
import GuardedRoute from "./GuardedRoute.js";
import { AuthContext } from "./components/context/auth/auth-context";

function App() {
  const ctx = useContext(AuthContext);
  let loginStatus = ctx.isLoggedIn.status;
  console.log("loginStatus from app.js" + typeof loginStatus);
  console.log("loginStatus from app.js is  " + loginStatus);
  return (
    <Fragment>
      <StarshipsProvider>
        <StarshipExtensiveProvider>
          <CharactersProvider>
            <CharacterDetailProvider>
              <Layout>
                <Switch>
                  <Route path="/" component={Welcome} exact></Route>
                  <GuardedRoute
                    path="/home"
                    component={Home}
                    auth={loginStatus}
                  ></GuardedRoute>

                  <Route path="/login" component={Login}></Route>
                  <Route path="/registration" component={Registration}></Route>

                  <GuardedRoute
                    path="/starships"
                    component={AllStarshipsPage}
                    auth={loginStatus}
                  ></GuardedRoute>

                  <GuardedRoute
                    path="/starship-detail/:starshipId"
                    component={StarshipDetailPage}
                    auth={loginStatus}
                  ></GuardedRoute>
                  <GuardedRoute
                    path="/characters"
                    component={AllCharactersPage}
                    auth={loginStatus}
                  ></GuardedRoute>
                  <GuardedRoute
                    path="/character-detail/:charactersId"
                    component={CharacterDetailPage}
                    auth={loginStatus}
                  ></GuardedRoute>
                </Switch>
              </Layout>
            </CharacterDetailProvider>
          </CharactersProvider>
        </StarshipExtensiveProvider>
      </StarshipsProvider>
    </Fragment>
  );
}

export default App;

/*
          {!loginStatus && <Welcome />}
          {loginStatus && <Home />}
tutorial
import styled from "styled-components";
const StyledDiv = styled.div`
  width: 90%;
  max-width: 40rem;
  border: 1px solid #ccc;
  padding: 1rem;
`;

               <GuardedRoute
                      path="/home"
                      component={Home}
                      auth={loginStatus}
                    ></GuardedRoute>


                     <Route path="/home" component={Home}></Route>
*/
