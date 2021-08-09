import { Fragment, useContext, useState, useEffect } from "react";
import classes from "./SingleStarshipExtensive.module.css";
import { StarshipExtensiveCtx } from "../context/StarshipsExtensiveCtx";
/*starwars official site:https://www.starwars.com/databank/droid-gunship*/
const SingleStarshipExtensive = ({ loadShip }) => {
  const ctx = useContext(StarshipExtensiveCtx);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("ship img error");
  }, [error]);
  let refreshFlag = ctx.refreshFlag;
  let singleShip = ctx.singleShip;
  let shipUrl = ctx.shipImgInfo;

  if (refreshFlag) {
    singleShip = JSON.parse(localStorage.getItem("singleShipObj"));
    shipUrl = localStorage.getItem("starshipImg");
  }

  return (
    <div>
      {loadShip && <p className="textcenter">Starship Loading....</p>}
      {!loadShip && singleShip && (
        <Fragment>
          <h1>{singleShip.name}</h1>
          <div className={classes.wrapperMain}>
            <div className={classes.cardMain}>
              {!error && (
                <img
                  className={classes.imgMain}
                  type="url"
                  alt={"starship" + singleShip.name}
                  src={shipUrl}
                  onError={() => {
                    setError((prev) => true);
                  }}
                ></img>
              )}
              {error && (
                <p className={classes.imgErrMain}>
                  Image of {singleShip.name} starship is not available at this
                  moment
                </p>
              )}
              <ul className={classes.info}>
                <li>Model:{singleShip.model}</li>
                <li>Cost in credits:{singleShip.cost_in_credits}</li>
                <li>Manufacturer:{singleShip.manufacturer}</li>
                <li>Length:{singleShip["length"]}</li>
                <li>Speed:{singleShip.max_atmosphering_speed}</li>
                <li>Hyperdrive Rating:{singleShip.hyperdrive_rating}</li>
                <li>MGLT:{singleShip.MGLT}</li>
                <li>Cargo Capacity:{singleShip.cargo_capacity}</li>
                <li>Crew:{singleShip.crew}</li>
                <li>Passengers:{singleShip.passengers}</li>
              </ul>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};
export default SingleStarshipExtensive;

/*doesnt work:
  let singleShip = refreshFlag
    ? JSON.parse(localStorage.getItem("singleShipObj"))
    : ctx.singleShip;
  */

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
