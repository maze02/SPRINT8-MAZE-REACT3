import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { StarshipsContext } from "../context/StarshipsContext";

const StarshipExtensiveProvider = (props) => {
  const [singleShip, setSingleShip] = useState();
  const [pilots, setPilots] = useState([]);
  const [films, setFilms] = useState([]);
  const ctx = useContext(StarshipsContext);
  const history = useHistory();

  //HANDLING CLICK OF INDIVIDUAL SHIP
  const handleClickShip = (e) => {
    console.log("id of ship I licked on " + e.target.id);
    setSingleShip(e.target.id);
    console.log("id in state" + singleShip);

    const getSingleShip = async () => {
      const url = `https://swapi.dev/api/starships/${e.target.id}/`;
      const singleShipObj = await axios.get(url);
      setSingleShip(singleShipObj.data);
      console.log("singleShipObj.name" + singleShipObj.name);
    };
    getSingleShip();
    //history.replace("/home");
    history.push(`/starship-detail/:${e.target.id}`);
  };

  return (
    <StarshipExtensiveCtx.Provider
      value={{
        singleShip: singleShip,
        handleClickShip: handleClickShip,
      }}
    >
      {props.children}
    </StarshipExtensiveCtx.Provider>
  );
};

export default StarshipExtensiveProvider;
export const StarshipExtensiveCtx = createContext();
