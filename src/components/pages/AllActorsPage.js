import { useContext } from "react";

import { ActorsContext } from "../context/ActorsContext";
import ActorsList from "../actors/ActorsList";

const AllActorsPage = () => {
  const ctx = useContext(ActorsContext);
  const actorsArr = ctx.actors;

  return (
    <div className="container-wrapper">
      <h1>Here's a list of actors</h1>
      {!actorsArr && <p>Loading actors</p>}
      {actorsArr.length !== 0 && <ActorsList actorsArr={actorsArr} />}
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

export default AllActorsPage;
