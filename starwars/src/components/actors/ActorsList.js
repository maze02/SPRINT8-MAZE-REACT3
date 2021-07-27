import { Fragment } from "react";
import ActorBrief from "../actors/ActorBrief";

const ActorsList = ({ actorsArr }) => {
  const list = actorsArr.map((element) => {
    return (
      <ActorBrief
        key={element.id}
        id={element.id}
        name={element.name}
        birthyear={element.birth_year}
      />
    );
  });
  return <div>{[...list]}</div>;
};

export default ActorsList;
//        handleClickActor={handleClickActor}
