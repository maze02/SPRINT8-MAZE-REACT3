import { Fragment } from "react";
import StarshipBrief from "../starships/StarshipBrief";

const StarshipList = ({ starshipsArr, handleClickShip }) => {
  const list = starshipsArr.map((element) => {
    return (
      <StarshipBrief
        key={element.id}
        id={element.id}
        name={element.name}
        model={element.model}
        handleClickShip={handleClickShip}
      />
    );
  });
  return <div>{[...list]}</div>;
};

export default StarshipList;
