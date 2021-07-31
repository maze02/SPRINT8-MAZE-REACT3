import { Fragment } from "react";
import classes from "./ShipItem.module.css";
const ShipItem = ({ shipName, shipImg, crew, passengers, speed }) => {
  return (
    <div className={classes.cardShip}>
      <img
        className={classes.imgShip}
        type="url"
        src={shipImg}
        alt={shipName}
      />
      <ul className={classes.info}>
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
