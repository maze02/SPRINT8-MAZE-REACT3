import PilotItem from "./PilotItem";

const PilotList = ({ pilotListArr, loadPilots }) => {
  //const ctxE = useContext(StarshipExtensiveCtx);
  //const pilotListArr = ctxE.pilotInfo;
  let pilotListContent = <p>Yep still loading in PilotList</p>;
  if (loadPilots) {
    console.log("mate, pilotList is still loading");
  } else {
    pilotListContent = pilotListArr.map((e) => {
      return (
        <PilotItem
          key={e.name}
          pilotName={e.name}
          height={`${Number(e.height) / 100}m`}
          planet={e.homeworld}
        />
      );
    });
    console.log(
      "6. From pilotList Component is the list of pilots: " +
        [...pilotListContent].toString()
    );
  }
  return (
    <div>
      <p>This is the Pilot List component that won't render</p>
      {[...pilotListContent]}
    </div>
  );
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
