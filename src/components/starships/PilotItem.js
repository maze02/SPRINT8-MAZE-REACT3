import classes from "../UI/SubItemHorizontal.module.css";
const PilotItem = ({ pilotName, pilotImg, height, planet }) => {
  return (
    <div className={classes.cardSubHor}>
      <img
        className={classes.imgSubHor}
        type="url"
        src={pilotImg}
        alt={pilotName}
      />
      <ul className={classes.infoSubHor}>
        <li>{pilotName.toUpperCase()}</li>
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
