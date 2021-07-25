//https://blog.logrocket.com/guide-to-react-usereducer-hook/
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { StarshipsContext } from "./StarshipsContext";

const StarshipExtensiveProvider = (props) => {
  const [singleShip, setSingleShip] = useState();
  const [pilotUrls, setPilotUrls] = useState([]);
  const [pilotInfo, setPilotInfo] = useState([]);
  const [filmUrls, setFilmUrls] = useState([]);
  const [filmInfo, setFilmInfo] = useState([]);
  const [loadShip, setloadShip] = useState(false);
  const [loadPilots, setloadPilots] = useState(false);
  const [loadFilms, setloadFilms] = useState(false);
  const ctx = useContext(StarshipsContext);
  const history = useHistory();

  //HANDLING CLICK OF INDIVIDUAL SHIP

  const getSingleShip = async () => {
    const url = `https://swapi.dev/api/starships/${singleShip}/`;
    //const url = `https://swapi.dev/api/starships/${e.target.id}/`;
    const singleShipObj = await axios.get(url);
    await setSingleShip(singleShipObj.data);
    await console.log("2. singleShipObj.name" + singleShipObj.data.name);
    await setPilotUrls(singleShipObj.data.pilots);
    await setFilmUrls(singleShipObj.data.films);
    await console.log("length of pilots arr =" + pilotUrls.length);
    await console.log("length of films arr =" + filmUrls.length);
    await setloadShip(false);
    //await setloadPilots(true);
    //await setloadFilms(true);
    await console.log(
      "3. singleStarship info loading COMPLETE and url length of pilots is " +
        pilotUrls.length
    );
  };

  const handleClickShip = (e) => {
    console.log("id of ship I licked on " + e.target.id);
    setSingleShip(e.target.id);
    console.log("id in state" + singleShip);
    console.log("1. singleStarshipInfo loading");
    setloadShip(true);
    history.push(`/starship-detail/:${e.target.id}`);
  };

  useEffect(() => {
    console.log("context is a type:" + typeof { ctx });
    getSingleShip();
  }, [loadShip]);

  //Call each of Pilot Apis and add info into an arr for child to map through
  useEffect(() => {
    if (!loadShip) {
      setloadPilots(true);
      let pilotInfoNew = [];
      if (pilotUrls.length > 0) {
        for (let i = 0; i < pilotUrls.length; i++) {
          const getPilot = async () => {
            const pilotObj = await axios.get(pilotUrls[i]);
            console.log("printing" + i + " " + pilotObj.data.name);
            pilotInfoNew.push(pilotObj.data);
          };
          getPilot();
        }
        setPilotInfo(pilotInfoNew);
        localStorage.setItem("pilots", JSON.stringify(pilotInfo));
        setloadPilots(false);
        console.log(
          "now the pilots are loaded and loadPilots is" +
            loadPilots +
            "and pilot Info length is " +
            pilotInfo.length
        );
      }
    }
  }, [loadShip, pilotUrls]);

  useEffect(() => {
    if (!loadShip) {
      setloadFilms(true);
      let filmInfoNew = [];
      if (filmUrls.length > 0) {
        for (let i = 0; i < filmUrls.length; i++) {
          const getFilm = async () => {
            const filmObj = await axios.get(filmUrls[i]);
            console.log("printing" + i + " " + filmObj.data.title);
            filmInfoNew.push(filmObj.data);
          };
          getFilm();
        }
        setFilmInfo(filmInfoNew);
        localStorage.setItem("films", JSON.stringify(filmInfo));
        setloadFilms(false);
        console.log(
          "now the films are loaded and loadFilms is" +
            loadFilms +
            "and film Info length is " +
            filmInfo.length
        );
      }
    }
  }, [loadShip, filmUrls]);

  return (
    <StarshipExtensiveCtx.Provider
      value={{
        singleShip: singleShip,
        handleClickShip: handleClickShip,
        pilotInfo: pilotInfo,
        filmInfo: filmInfo,
        loadPilots: loadPilots,
        loadFilms: loadFilms,
        loadShip: loadShip,
      }}
    >
      {props.children}
    </StarshipExtensiveCtx.Provider>
  );
};

export default StarshipExtensiveProvider;
export const StarshipExtensiveCtx = createContext();

/*
const getPilotList = async () => {
      let pilotInfoNew = [];
      if (pilotUrls.length > 0) {
        for (let i = 0; i < pilotUrls.length; i++) {
          //let pilotObj = "";
          const getPilot = async () => {
            const pilotObj = await axios.get(pilotUrls[i]);
            console.log("printing pilot" + i + " " + pilotObj.data.name);
            pilotInfoNew.push(pilotObj.data);
          };
          getPilot();

          console.log("Pilot" + i);
        }
      }
      //let pilotInfoArr = fillPilotInfoNew();
      console.log("pilotInfoNew length:" + pilotInfoNew.length);
      await setPilotInfo(pilotInfoNew);
    };

    getPilotList();

*/

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
/*
 useEffect(() => {
    console.log("Hey something activated pilotUrls");
    let pilotInfoNew = [];
    if (pilotUrls.length > 0) {
      for (let i = 0; i < pilotUrls.length; i++) {
        const getPilot = async () => {
          const pilotObj = await axios.get(pilotUrls[i]);
          console.log("printing" + i + " " + pilotObj.data.name);
          pilotInfoNew.push(pilotObj.data);
        };
        getPilot();

        console.log("Pilot" + i);
      }
    }

    setPilotInfo(pilotInfoNew);
    setloadPilots(false);
  }, [pilotUrls, loadShip]);




  const uploadPilots = () => {
    console.log("Hey something activated pilotUrls");
    let pilotInfoNew = [];
    if (pilotUrls.length > 0) {
      for (let i = 0; i < pilotUrls.length; i++) {
        const getPilot = async () => {
          const pilotObj = await axios.get(pilotUrls[i]);
          console.log("printing" + i + " " + pilotObj.data.name);
          pilotInfoNew.push(pilotObj.data);
        };
        getPilot();

        console.log("Pilot" + i);
      }
    }

    setPilotInfo(pilotInfoNew);
    setloadPilots(false);
  };
  */
