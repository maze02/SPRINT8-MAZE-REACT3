import { Fragment } from "react";
import classes from "../UI/SubItemHorizontal.module.css";
const ShipItem = ({ shipName, shipImg, crew, passengers, speed }) => {
  return (
    <div className={classes.cardSubHor}>
      <img
        className={classes.imgSubHor}
        type="url"
        src={shipImg}
        alt={shipName}
      />
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
