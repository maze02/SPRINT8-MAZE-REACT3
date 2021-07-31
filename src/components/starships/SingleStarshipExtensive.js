import { Fragment, useContext, useState, useEffect } from "react";
import classes from "./SingleStarshipExtensive.module.css";
import { StarshipExtensiveCtx } from "../context/StarshipsExtensiveCtx";
/*starwars official site:https://www.starwars.com/databank/droid-gunship*/
const SingleStarshipExtensive = () => {
  const ctx = useContext(StarshipExtensiveCtx);
  const [error, setError] = useState(false);
  let shipUrl = ctx.shipImgInfo;
  useEffect(() => {
    shipUrl = "https://starwars-visualguide.com/assets/img/species/4.jpg";
  }, [error]);
  return (
    <div>
      {ctx.loadShip && <p className="textcenter">Starship Loading....</p>}
      {!ctx.loadShip && ctx.singleShip && (
        <Fragment>
          <h1>{ctx.singleShip.name}</h1>
          <div className={classes.wrapperMain}>
            <div className={classes.cardMain}>
              {!error && (
                <img
                  className={classes.imgMain}
                  type="url"
                  alt={"starship" + ctx.singleShip.name}
                  src={shipUrl}
                  onError={() => {
                    setError(true);
                  }}
                ></img>
              )}
              {error && (
                <p className={classes.imgErrMain}>
                  Image of {ctx.singleShip.name} starship is not available at
                  this moment
                </p>
              )}
              <ul className={classes.info}>
                <li>Model:{ctx.singleShip.model}</li>
                <li>Cost in credits:{ctx.singleShip.cost_in_credits}</li>
                <li>Manufacturer:{ctx.singleShip.manufacturer}</li>
                <li>Length:{ctx.singleShip["length"]}</li>
                <li>Speed:{ctx.singleShip.max_atmosphering_speed}</li>
                <li>Hyperdrive Rating:{ctx.singleShip.hyperdrive_rating}</li>
                <li>MGLT:{ctx.singleShip.MGLT}</li>
                <li>Cargo Capacity:{ctx.singleShip.cargo_capacity}</li>
                <li>Crew:{ctx.singleShip.crew}</li>
                <li>Passengers:{ctx.singleShip.passengers}</li>
              </ul>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};
export default SingleStarshipExtensive;

/*        <li>Length:{starships[props.id]["length"]}</li> */

/*
<const SingleStarshipExtensive = () => {
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
*/

/*
  //const params = useParams();
  //const id = Number(params.starshipId.substring(1));
  //prints :1 so remove ':' with substring;
  // console.log(id);
  //console.log(typeof id);
  // console.log("starships: " + starships[0].name);
  //console.log(typeof starships[0]);
  */
