const StarshipBrief = ({ id, name, model, handleClickShip }) => {
  return (
    <div id={id} onClick={handleClickShip}>
      <p>{id}</p>
      <h4>{name}</h4>
      <h5>{model}</h5>
    </div>
  );
};

export default StarshipBrief;

/*Maria's Dolce Gabbanna Errors
1. key is not accessable as a prop
2. Use a different prop name to access id , i.e. id, even if it's
included in key
*/
