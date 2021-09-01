import { useContext, useState } from "react";
import styled from "styled-components";
import PilotItem from "./PilotItem";
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
          <Wrapper>
            <p className="spacer">
              No record of any pilots ever flying the "{shipName}" starship.
            </p>
          </Wrapper>
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
            <Wrapper>
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
            </Wrapper>
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

const Wrapper = styled.div`
  .pilotListWrapper {
    display: inline-flex;
    flex-direction: horizontal;
    justify-content: center !important;
    margin-left: -12%;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    width: 100rem;
  }

  .spacer {
    margin-top: -2rem;
    margin-bottom: 5rem;
    text-align: center;
  }
`;
export default PilotList;
