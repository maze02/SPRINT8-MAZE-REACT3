import CardItem from "../UI/CardItem";
const ActorBrief = ({ id, name, birthyear }) => {
  return (
    <CardItem id={id}>
      <h4>{name.toUpperCase()}</h4>
      <h5>Date of Birth: {birthyear}</h5>
    </CardItem>
  );
};

export default ActorBrief;

//onClick={handleClickShip}
/*Maria's Dolce Gabbanna Errors
1. key is not accessable as a prop
2. Use a different prop name to access id , i.e. id, even if it's
included in key
*/
