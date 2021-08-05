import { useContext, useState } from "react";
import PilotItem from "./PilotItem";
import classes from "./PilotList.module.css";
import { StarshipExtensiveCtx } from "../context/StarshipsExtensiveCtx";

const PilotList = ({ loadPilots }) => {
  const ctx = useContext(StarshipExtensiveCtx);

  let pilotListArr = ctx.pilotInfo;

  let pilotImgInfo = ctx.pilotImgInfo;

  const [pilotErrCount, setPilotErrCount] = useState(0);

  if (loadPilots) {
    return <p className="textcenter">Pilots loading...</p>;
  } else {
    if (!loadPilots) {
      let pilotsListLocal = localStorage.getItem("pilots");
      let pilotsListImgs = localStorage.getItem("pilotImgs");
      let shipName = JSON.parse(localStorage.getItem("singleShipName"));

      if (pilotsListLocal) {
        pilotListArr = JSON.parse(pilotsListLocal);
        let pilotImgArr = JSON.parse(pilotsListImgs);
        for (let i = 0; i < pilotListArr.length; i++) {
          if (pilotListArr[i].name) {
            if (pilotListArr[i].img === undefined) {
              pilotListArr[i].img = pilotImgArr[i];
            }
          } else {
            pilotListArr.splice(i, 1);
            setPilotErrCount((prev) => prev + 1);
          }
        }
      }
      if (pilotListArr.length === 0 && pilotErrCount === 0) {
        return (
          <p className={classes.spacer}>
            No record of any pilots ever flying the "{shipName}" starship.
          </p>
        );
      } else {
        if (pilotListArr.length !== 0) {
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
              {pilotErrCount === 1 && (
                <p>One pilot could not be loaded. Please try again later.</p>
              )}
              {pilotErrCount > 1 && (
                <p>
                  {pilotErrCount} pilots could not be loaded. Please try again
                  later.
                </p>
              )}
            </div>
          );
        } else {
          return (
            <div>
              {pilotErrCount === 1 && (
                <p>One pilot could not be loaded. Please try again later.</p>
              )}
              {pilotErrCount > 1 && (
                <p>
                  {pilotErrCount} pilots could not be loaded. Please try again
                  later.
                </p>
              )}
            </div>
          );
        }
      }
    }
  }
};

export default PilotList;
