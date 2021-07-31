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

function App() {
  return (
    <Fragment>
      <AuthContextMyProvider>
        <StarshipsProvider>
          <StarshipExtensiveProvider>
            <CharactersProvider>
              <CharacterDetailProvider>
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

                    <Route path="/characters">
                      <AllCharactersPage />
                    </Route>
                    <Route path="/character-detail/:charactersId">
                      <CharacterDetailPage />
                    </Route>
                  </Switch>
                </Layout>
              </CharacterDetailProvider>
            </CharactersProvider>
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
