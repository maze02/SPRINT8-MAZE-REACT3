import { Fragment, useState } from "react";
import classes from "../UI/SubItemHorizontal.module.css";
const ShipItem = ({ shipName, shipImg, crew, passengers, speed }) => {
  const [error, setError] = useState(false);
  return (
    <div className={classes.cardSubHor}>
      {!error && (
        <img
          className={classes.imgSubHor}
          type="url"
          src={shipImg}
          alt={shipName}
          onError={() => {
            setError(true);
          }}
        />
      )}
      {error && (
        <div className={classes.imgErrSubHor}>
          <p>Image of {shipName} unavailable</p>
        </div>
      )}
      <ul className={classes.infoSubHor}>
        <li>{shipName.toUpperCase()}</li>
        <li>Crew: {crew} people</li>
        <li>Passengers: {passengers} people</li>
        <li>Speed: {speed}</li>
      </ul>
    </div>
  );
};

export default ShipItem;
//<li>{planet}</li>
/* planet is a URL
would have to do an other API call
*/
