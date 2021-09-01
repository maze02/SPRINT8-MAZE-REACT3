import ShipItem from "../characters/ShipItem";
import HorizontalCardList from "../UI/HorizontalCardList";

const ShipList = ({ shipListArr, loadShips, characterName }) => {
  if (loadShips) {
    return <p className="textcenter">Starships loading...</p>;
  } else {
    if (!loadShips) {
      let shipsListLocal = localStorage.getItem("shipsCharacter");
      let shipListImgs = localStorage.getItem("shipImgs");
      if (shipsListLocal) {
        shipListArr = JSON.parse(shipsListLocal);
        let shipImgArr = JSON.parse(shipListImgs);
        for (let i = 0; i < shipListArr.length; i++) {
          if (shipListArr[i].img === undefined) {
            shipListArr[i].img = shipImgArr[i];
          }
        }
      }
      if (shipListArr.length === 0) {
        return (
          <p className="textcenter">
            No record of {characterName} ever flying any starships.
          </p>
        );
      } else {
        let shipListContent = shipListArr.map((e) => {
          return (
            <ShipItem
              key={e.name}
              shipName={e.name}
              shipImg={e.img}
              crew={e.crew}
              passengers={e.passengers}
              speed={e.max_atmosphering_speed}
            />
          );
        });
        return (
          <HorizontalCardList>
            <div className="pilotListWrapper">{[...shipListContent]}</div>
          </HorizontalCardList>
        );
      }
    }
  }
};

export default ShipList;
