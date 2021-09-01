import { Fragment, useContext, useState, useEffect } from "react";
import classes from "./SingleStarshipExtensive.module.css";
import { StarshipExtensiveCtx } from "../context/StarshipsExtensiveCtx";

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
