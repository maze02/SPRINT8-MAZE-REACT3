import CardItem from "../UI/CardItem";
const StarshipBrief = ({ id, name, model, handleClickShip }) => {
  return (
    <CardItem id={id} handleClickShip={handleClickShip}>
      <div>
        <h4>{name.toUpperCase()}</h4>
        <h5>{model}</h5>
      </div>
    </CardItem>
  );
};

export default StarshipBrief;

/*Maria's Dolce Gabbanna Errors
1. key is not accessable as a prop
2. Use a different prop name to access id , i.e. id, even if it's
included in key
*/
