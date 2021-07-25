import PilotItem from "./PilotItem";

const PilotList = ({ pilotListArr, loadPilots }) => {
  if (loadPilots) {
    return <p>Pilots loading...</p>;
  } else {
    if (!loadPilots) {
      let pilotsListLocal = localStorage.getItem("pilots");
      if (pilotsListLocal) {
        pilotListArr = JSON.parse(pilotsListLocal);
      }
      if (pilotListArr.length === 0) {
        return <p>No record of pilots flying this starship</p>;
      } else {
        let pilotListContent = pilotListArr.map((e) => {
          return (
            <PilotItem
              key={e.id}
              pilotName={e.name}
              height={`${Number(e.height) / 100}m`}
              planet={e.homeworld}
            />
          );
        });
        return <div>{[...pilotListContent]}</div>;
      }
    }
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
