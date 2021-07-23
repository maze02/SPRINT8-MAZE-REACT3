import { useContext } from "react";
import { StarshipExtensiveCtx } from "../context/StarshipsExtensiveCtx";
import PilotItem from "./PilotItem";

const PilotList = () => {
  const ctxE = useContext(StarshipExtensiveCtx);
  const pilotListArr = ctxE.pilotInfo;
  if (pilotListArr.length === 0) {
    return <p>No record of pilots flying this starship</p>;
  } else {
    let pilotListContent = pilotListArr.map((e) => {
      return (
        <PilotItem
          pilotName={e.name}
          height={`${Number(e.height) / 100}m`}
          planet={e.homeworld}
        />
      );
    });
    return <div>{[...pilotListContent]}</div>;
  }
};

export default PilotList;

//Recurrent Armani Error
//Keep forgetting to destructure the context I import from the path right at the top
//comes up as undefined

/*
  if (pilotListArr.length === 0) {
    return <p>No record of pilots flying this starship</p>;
  } else {
    let pilotListContent = pilotListArr.map((e) => {
      return (
        <PilotItem
          pilotName={e.name}
          height={`${Number(e.height) / 100}m`}
          planet={e.homeworld}
        />
      );
    });
    return <div>{[...pilotListContent]}</div>;
  }
  */
