import CardItem from "../UI/CardItem";
const CharacterBrief = ({ id, name, birthyear, handleClickCharacter }) => {
  return (
    <CardItem id={id} pressed={handleClickCharacter}>
      <h4>{name.toUpperCase()}</h4>
      <h5>Date of Birth: {birthyear}</h5>
    </CardItem>
  );
};

export default CharacterBrief;

//onClick={handleClickShip}
/*Maria's Dolce Gabbanna Errors
1. key is not accessable as a prop
2. Use a different prop name to access id , i.e. id, even if it's
included in key
*/
