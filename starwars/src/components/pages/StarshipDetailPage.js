import SingleStarshipExtensive from "../starships/SingleStarshipExtensive";
import PilotList from "../starships/PilotList";
import FilmList from "../starships/FilmList";
const StarshipDetail = () => {
  return (
    <div>
      <h1>Here's the detail of one starship</h1>
      <SingleStarshipExtensive />
      <h2>Pilots</h2>
      <PilotList />
      <h2>Films</h2>
    </div>
  );
};

export default StarshipDetail;
// <FilmList />
