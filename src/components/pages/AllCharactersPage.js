import { useContext } from "react";

import { CharactersContext } from "../context/CharactersContext";
import { CharacterDetailCtx } from "../context/CharactersDetailContext";
import CharactersList from "../characters/CharactersList";

const AllCharactersPage = () => {
  const ctx = useContext(CharactersContext);
  const actorsArr = ctx.actors;
  const cCtx = useContext(CharacterDetailCtx);

  return (
    <div className="container-wrapper">
      <h1>Click on a character for more information</h1>
      {!actorsArr && <p>Loading actors</p>}
      {actorsArr.length !== 0 && (
        <CharactersList
          actorsArr={actorsArr}
          handleClickCharacter={cCtx.handleClickCharacter}
        />
      )}
      <div>
        {ctx.currentAPage === 1 ? null : (
          <button
            type="button"
            className="btn btn-secondary btn-page btn-gap"
            onClick={ctx.previousAPage}
          >
            &#9204; Previous
          </button>
        )}
        {ctx.currentAPage === ctx.totalAPages ? null : (
          <button
            type="button"
            className="btn btn-secondary btn-page btn-gap"
            onClick={ctx.nextAPage}
          >
            Next &#9205;
          </button>
        )}
      </div>
    </div>
  );
};

//        handleClickShip={actorsCtx.handleClickActor}

export default AllCharactersPage;
