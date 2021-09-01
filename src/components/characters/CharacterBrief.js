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
