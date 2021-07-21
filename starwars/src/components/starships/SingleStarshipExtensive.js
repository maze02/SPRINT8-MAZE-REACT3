import { useContext } from "react";
import { useParams } from "react-router-dom";
import { StarshipsContext } from "../context/StarshipsContext";

const SingleStarshipExtensive = () => {
  const { starships } = useContext(StarshipsContext);

  const params = useParams();
  const id = Number(params.starshipId.substring(1));
  //prints :1 so remove ':' with substring;
  console.log(id);
  console.log(typeof id);
  console.log("starships: " + starships[0].name);
  console.log(typeof starships[0]);

  return (
    <div>
      <h2>Here there'll be an image</h2>
      <h1>{starships[id].name}</h1>
      <ul>
        <li>Model:{starships[id].model}</li>
        <li>Cost in credits:{starships[id].cost_in_credits}</li>
        <li>Manufacturer:{starships[id].manufacturer}</li>
        <li>Length:{starships[id]["length"]}</li>
        <li>Speed:{starships[id].max_atmosphering_speed}</li>
        <li>Hyperdrive Rating:{starships[id].hyperdrive_rating}</li>
        <li>MGLT:{starships[id].MGLT}</li>
        <li>Cargo Capacity:{starships[id].cargo_capacity}</li>
        <li>Crew:{starships[id].crew}</li>
        <li>Passengers:{starships[id].passengers}</li>
      </ul>
    </div>
  );
};

export default SingleStarshipExtensive;

/*        <li>Length:{starships[props.id]["length"]}</li> */

/*
<h1>{starships[id].name}</h1>
      <ul>
        <li>Model:{starships[id].model}</li>
        <li>Cost in credits:{starships[id].cost_in_credits}</li>
        <li>Manufacturer:{starships[id].manufacturer}</li>
        <li>Length:{starships[id]["length"]}</li>
        <li>Speed:{starships[id].max_atmosphering_speed}</li>
        <li>Hyperdrive Rating:{starships[id].hyperdrive_rating}</li>
        <li>MGLT:{starships[id].MGLT}</li>
        <li>Cargo Capacity:{starships[id].cargo_capacity}</li>
        <li>Crew:{starships[id].crew}</li>
        <li>Passengers:{starships[id].passengers}</li>
      </ul>
*/
