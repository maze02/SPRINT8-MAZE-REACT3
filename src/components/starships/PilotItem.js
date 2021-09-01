import HorizontalCardItem from "../UI/HorizontalCardItem";
const PilotItem = ({ pilotName, pilotImg, height, planet }) => {
  return (
    <HorizontalCardItem>
      <div className="cardSubHor">
        <img className="imgSubHor" type="url" src={pilotImg} alt={pilotName} />
        <ul className="infoSubHor">
          <li>{pilotName.toUpperCase()}</li>
          <li>{height}</li>
        </ul>
      </div>
    </HorizontalCardItem>
  );
};

export default PilotItem;
//<li>{planet}</li>
/* planet is a URL
would have to do an other API call
*/
