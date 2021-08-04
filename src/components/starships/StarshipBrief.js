import CardItem from "../UI/CardItem";
const StarshipBrief = ({ id, name, model, handleClickShip }) => {
  return (
    <CardItem id={id} pressed={handleClickShip}>
      <div>
        <h4>{name.toUpperCase()}</h4>
        <h5>{model}</h5>
      </div>
    </CardItem>
  );
};

export default StarshipBrief;
