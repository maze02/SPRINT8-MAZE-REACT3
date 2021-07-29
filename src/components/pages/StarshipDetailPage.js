import SingleStarshipExtensive from "../starships/SingleStarshipExtensive";
import PilotList from "../starships/PilotList";
import FilmList from "../starships/FilmList";
import { useContext } from "react";
import { StarshipExtensiveCtx } from "../context/StarshipsExtensiveCtx";

const StarshipDetail = () => {
  const ctxE = useContext(StarshipExtensiveCtx);

  return (
    <div>
      <h1>Here's the detail of one starship</h1>
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
*/
