import SingleStarshipExtensive from "../starships/SingleStarshipExtensive";
import PilotList from "../starships/PilotList";
import FilmList from "../starships/FilmList";
import { useHistory, useLocation } from "react-router";
import { useContext } from "react";
import { StarshipExtensiveCtx } from "../context/StarshipsExtensiveCtx";

const StarshipDetail = () => {
  const ctxE = useContext(StarshipExtensiveCtx);
  const history = useHistory();
  const location = useLocation();

  //handling refreshing browser
  let shipIdLocal = JSON.parse(localStorage.getItem("singleShipId"));
  let browserShipId = location.pathname.substring(17);

  console.log("shipIdLocal = " + shipIdLocal);
  console.log("browserShipId = " + browserShipId);
  console.log(`shipIdLocal == browserShipId ${shipIdLocal == browserShipId}`);

  let loadFilms;
  let loadPilots;
  let loadShip;
  let shipName = JSON.parse(localStorage.getItem("singleShipName"));

  if (shipIdLocal == browserShipId) {
    loadFilms = false;
    loadPilots = false;
    loadShip = false;
  } else {
    loadFilms = ctxE.loadFilms;
    loadPilots = ctxE.loadPilots;
    loadShip = ctxE.loadShip;
  }

  return (
    <div>
      <SingleStarshipExtensive loadShip={loadShip} />
      <h2>Pilots</h2>
      <PilotList loadPilots={loadPilots} />
      <h2>Films</h2>
      <FilmList
        loadFilms={loadFilms}
        generalInfo={{ theme: "starship", name: shipName }}
      />
    </div>
  );
};

export default StarshipDetail;
// <FilmList />
/*
    {ctxE.loadPilots && ctxE.loadShip && <h3>loading pilots...</h3>}
      {!ctxE.loadPilots && !ctxE.loadShip && (
        <PilotList pilotListArr={ctxE.pilotInfo} loadPilots={ctxE.loadPilots} />
      )}
*/
/*
  {ctxE.loadFilms && ctxE.loadShip && (
        <h3>loading films...:{ctxE.loadFilms}</h3>
      )}
      {!ctxE.loadFilms && !ctxE.loadShip && (
        <FilmList filmListArr={ctxE.filmInfo} loadFilms={ctxE.loadFilms} />
      )}
*/

/*
const ctxE = useContext(StarshipExtensiveCtx);
  const filmListArr = ctxE.filmInfo;

   {ctxE.loadPilots && <h3>loading pilots...</h3>}
      {!ctxE.loadPilots && <PilotList pilotListArr={ctxE.pilotInfo} />}
      ////////////
       return (
    <div>
      <SingleStarshipExtensive />
      <h2>Pilots</h2>
      <PilotList
        pilotListArr={ctxE.pilotInfo}
        loadPilots={ctxE.loadPilots}
        pilotImgInfo={ctxE.pilotImgInfo}
      />
      <h2>Films</h2>
      <FilmList
        filmListArr={ctxE.filmInfo}
        loadFilms={ctxE.loadFilms}
        filmImgInfo={ctxE.filmImgInfo}
        generalInfo={{ theme: "starship", name: ctxE.singleShip.name }}
      />
    </div>
  );
};

export default StarshipDetail;
*/
