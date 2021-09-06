
import { useContext, useState, Fragment } from "react";
import PilotItem from "./PilotItem";
import { StarshipExtensiveCtx } from "../context/StarshipsExtensiveCtx";
import HorizontalCardList from "../UI/HorizontalCardList";

const PilotList = ({ loadPilots, pilotListArr, pilotImgInfo }) => {
  let pilotListContent = [];
  const [pilotErrCount, setPilotErrCount] = useState(0);
  // const ctx = useContext(StarshipExtensiveCtx); //C-removed

  let shipName = "";
  console.log(
    "9999999-loadPilots-pilotListArrlength" +
      loadPilots +
      " " +
      pilotListArr.length
  );
  if (!loadPilots) {
    let pilotsListLocal = localStorage.getItem("pilots");
    let pilotsListImgs = localStorage.getItem("pilotImgs");
    shipName = JSON.parse(localStorage.getItem("singleShipName"));

    if (pilotsListLocal) {
      pilotListArr = JSON.parse(pilotsListLocal);
      let pilotImgArr = JSON.parse(pilotsListImgs);
      //retrieving correct input when loading complete
      /* pilotListArr = pilotsListLocal
        ? JSON.parse(pilotsListLocal)
        : pilotListArr;
       // changed
      */
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

      //if (pilotListArr.length !== 0) { -removed

      pilotListContent = pilotListArr.map((e) => {
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
    }
  }

  return (
    <Fragment>
      {loadPilots && <p className="textcenter">Pilots loading...</p>}
      {!loadPilots && pilotListArr.length === 0 && pilotErrCount === 0 && (
        <HorizontalCardList>
          <p className="spacerList">
            No record of any pilots ever flying the "{shipName}" starship.
          </p>
        </HorizontalCardList>
      )}
      {!loadPilots && pilotListArr.length !== 0 && (
        <HorizontalCardList>
          <div className="pilotListWrapper">{[...pilotListContent]}</div>
        </HorizontalCardList>
      )}
    </Fragment>
  );
};

export default PilotList;

/*removed
{pilotErrCount === 1 && (
              <p>One pilot could not be loaded. Please try again later.</p>
            )}
            {pilotErrCount > 1 && (
              <p>
                {pilotErrCount} pilots could not be loaded. Please try again
                later.
              </p>
            )}
*/

/*
let pilotListContent = [];
  const [pilotErrCount, setPilotErrCount] = useState(0);
  const ctx = useContext(StarshipExtensiveCtx);

  let shipName = "";
  console.log(
    "9999999-loadPilots-pilotListArrlength" +
      loadPilots +
      " " +
      pilotListArr.length
  );
  if (!loadPilots) {
    let pilotsListLocal = localStorage.getItem("pilots");
    let pilotsListImgs = localStorage.getItem("pilotImgs");
    shipName = JSON.parse(localStorage.getItem("singleShipName"));

    if (pilotsListLocal) {
      //retrieving correct input when loading complete
      pilotListArr = pilotsListLocal
        ? JSON.parse(pilotsListLocal)
        : pilotListArr;
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
    if (pilotListArr.length !== 0) {
      pilotListContent = pilotListArr.map((e) => {
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
    }
  }

  return (
    <Fragment>
      {loadPilots && <p className="textcenter">Pilots loading...</p>}
      {!loadPilots && pilotListArr.length === 0 && (
        <HorizontalCardList>
          <p className="spacerList">
            No record of any pilots ever flying the "{shipName}" starship.
          </p>
        </HorizontalCardList>
      )}
      {!loadPilots && pilotListArr.length !== 0 && (
        <HorizontalCardList>
          <div className="pilotListWrapper">
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
        </HorizontalCardList>
      )}
    </Fragment>
  );

*/

