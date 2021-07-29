import { Fragment } from "react";
import classes from "./PilotItem.module.css";
const PilotItem = ({ pilotName, height, planet, pilotImg, key }) => {
  return (
    <div className={classes.cardPilot}>
      <img
        className={classes.imgPilot}
        type="url"
        src={pilotImg}
        alt={pilotName}
      />
      <ul>
        <li>{pilotName}</li>
        <li>{height}</li>
      </ul>
    </div>
  );
};

export default PilotItem;
//<li>{planet}</li>
/* planet is a URL
would have to do an other API call
*/
