import { useContext } from "react";
import PilotItem from "./PilotItem";
import classes from "./PilotList.module.css";
import { StarshipExtensiveCtx } from "../context/StarshipsExtensiveCtx";

const PilotList = ({ pilotListArr, loadPilots, pilotImgInfo }) => {
  const ctx = useContext(StarshipExtensiveCtx);
  if (loadPilots) {
    return <p className="textcenter">Pilots loading...</p>;
  } else {
    if (!loadPilots) {
      let pilotsListLocal = localStorage.getItem("pilots");
      let pilotsListImgs = localStorage.getItem("pilotImgs");
      if (pilotsListLocal) {
        pilotListArr = JSON.parse(pilotsListLocal);
        let pilotImgArr = JSON.parse(pilotsListImgs);
        for (let i = 0; i < pilotListArr.length; i++) {
          if (pilotListArr[i].img === undefined) {
            pilotListArr[i].img = pilotImgArr[i];
          }
        }
      }
      if (pilotListArr.length === 0) {
        return (
          <p className={classes.spacer}>
            No record of any pilots ever flying the "{ctx.singleShip.name}"
            starship.
          </p>
        );
      } else {
        let pilotListContent = pilotListArr.map((e) => {
          return (
            <PilotItem
              key={e.name}
              pilotName={e.name}
              pilotImg={e.img}
              height={`${Number(e.height) / 100}m`}
              planet={e.homeworld}
            />
          );
        });
        return (
          <div className={classes.pilotListWrapper}>
            {[...pilotListContent]}
          </div>
        );
      }
    }
  }
};

export default PilotList;
