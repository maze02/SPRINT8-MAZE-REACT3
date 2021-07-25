import SingleStarshipExtensive from "../starships/SingleStarshipExtensive";
import PilotList from "../starships/PilotList";
import FilmList from "../starships/FilmList";
import { useContext, useState } from "react";
import { StarshipExtensiveCtx } from "../context/StarshipsExtensiveCtx";

const StarshipDetail = () => {
  const ctxE = useContext(StarshipExtensiveCtx);

  return (
    <div>
      <h1>Here's the detail of one starship</h1>
      <SingleStarshipExtensive />
      <h2>Pilots</h2>
      {ctxE.loadPilots && <h3>loading pilots...</h3>}
      {!ctxE.loadPilots && (
        <PilotList pilotListArr={ctxE.pilotInfo} loadPilots={ctxE.loadPilots} />
      )}

      <h2>Films</h2>
      {ctxE.loadFilms && <h3>loading films...:{ctxE.loadFilms}</h3>}
      {!ctxE.loadFilms && (
        <FilmList filmListArr={ctxE.filmInfo} loadFilms={ctxE.loadFilms} />
      )}
    </div>
  );
};

export default StarshipDetail;
// <FilmList />
/*
const ctxE = useContext(StarshipExtensiveCtx);
  const filmListArr = ctxE.filmInfo;

   {ctxE.loadPilots && <h3>loading pilots...</h3>}
      {!ctxE.loadPilots && <PilotList pilotListArr={ctxE.pilotInfo} />}
*/
