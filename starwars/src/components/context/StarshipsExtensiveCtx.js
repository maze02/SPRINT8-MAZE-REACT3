import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { StarshipsContext } from "./StarshipsContext";

const StarshipExtensiveProvider = (props) => {
  const [singleShip, setSingleShip] = useState();
  const [pilotUrls, setPilotUrls] = useState([]);
  const [pilotInfo, setPilotInfo] = useState([]);
  const [filmUrls, setFilmUrls] = useState([]);
  const [filmInfo, setFilmInfo] = useState([]);
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
      await setSingleShip(singleShipObj.data);
      console.log("singleShipObj.name" + singleShipObj.name);
      await setPilotUrls(singleShipObj.data.pilots);
      await setFilmUrls(singleShipObj.data.films);
      console.log("length of pilots arr =" + pilotUrls.length);
      console.log("length of films arr =" + filmUrls.length);
    };
    getSingleShip();

    history.push(`/starship-detail/:${e.target.id}`);
  };

  //Call each of Pilot Apis and add info into an arr for child to map through
  useEffect(() => {
    let pilotInfoNew = [];
    if (pilotUrls.length > 0) {
      for (let i = 0; i < pilotUrls.length; i++) {
        //let pilotObj = "";
        const getPilot = async () => {
          const pilotObj = await axios.get(pilotUrls[i]);
          console.log("printing" + i + " " + pilotObj.data.name);
          pilotInfoNew.push(pilotObj.data);
        };
        getPilot();

        console.log("Pilot" + i);
      }
    }
    console.log("pilotInfoNew length:" + pilotInfoNew.length);
    setPilotInfo(pilotInfoNew);
  }, [pilotUrls]);

  useEffect(() => {
    let filmInfoNew = [];
    if (filmUrls.length > 0) {
      for (let i = 0; i < filmUrls.length; i++) {
        //let pilotObj = "";
        const getFilm = async () => {
          const filmObj = await axios.get(filmUrls[i]);
          console.log("printing" + i + " " + filmObj.data.title);
          filmInfoNew.push(filmObj.data);
        };
        getFilm();

        console.log("Film" + i);
      }
    }
    setFilmInfo(filmInfoNew);
  }, [filmUrls]);

  return (
    <StarshipExtensiveCtx.Provider
      value={{
        singleShip: singleShip,
        handleClickShip: handleClickShip,
        pilotInfo: pilotInfo,
        filmInfo: filmInfo,
      }}
    >
      {props.children}
    </StarshipExtensiveCtx.Provider>
  );
};

export default StarshipExtensiveProvider;
export const StarshipExtensiveCtx = createContext();

/*
    if (pilotUrls.length > 0) {
      const getPilotObj = async (urlPilot) => {
        const pilotObj = await axios.get(urlPilot.data);
        await setPilotInfo([...pilotInfo, pilotObj]);
      };
      for (let i = 0; i < pilotUrls.length; i++) {
        getPilotObj(pilotUrls[i]);
      }
      console.log("pilotInfo.length" + pilotInfo.length);
    }
*/
