import { ContextReplacementPlugin } from "webpack";
import PilotItem from "./PilotItem";

const PilotList = () => {
  let ctx = {};
  let pilotArr = [];
  let pilotListContent = pilotArr.map((element) => {
    return (
      <PilotItem
        pilotName={ctx.name}
        height={Number(ctx.height) / 100}
        planet={ctx.homeworld}
      />
    );
  });
  return <div>{[...pilotListContent]}</div>;
};

export default PilotList;
