//https://blog.logrocket.com/guide-to-react-usereducer-hook/
import { createContext, useContext, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { StarshipsContext } from "./StarshipsContext";

const StarshipExtensiveProvider = (props) => {
  const [refreshFlag, setRefreshFlag] = useState(true);
  const [singleShip, setSingleShip] = useState();
  const [shipId, setShipId] = useState("");
  const [pilotUrls, setPilotUrls] = useState([]);
  const [pilotInfo, setPilotInfo] = useState([]);
  const [filmUrls, setFilmUrls] = useState([]);
  const [filmInfo, setFilmInfo] = useState([]);
  const [loadShip, setloadShip] = useState(false);
  const [loadPilots, setloadPilots] = useState(false);
  const [loadFilms, setloadFilms] = useState(false);
  const [loadPilotImgs, setloadPilotImgs] = useState(true);
  const [loadFilmImgs, setloadFilmImgs] = useState(true);
  const [loadShipImg, setloadShipImg] = useState(true);
  const [pilotImgInfo, setPilotImgInfo] = useState([]);
  const [filmImgInfo, setFilmImgInfo] = useState([]);
  const [shipImgInfo, setShipImgInfo] = useState("");

  const ctx = useContext(StarshipsContext);
  const history = useHistory();
  const location = useLocation();

  //handling refreshing browser

  let shipIdLocal = JSON.parse(localStorage.getItem("singleShipId"));
  let browserShipId = location.pathname.substring(17);
  //handling refreshing browser

  /*
    console.log("shipIdLocal = " + shipIdLocal);
    console.log("browserShipId = " + browserShipId);
    console.log(`shipIdLocal == browserShipId ${shipIdLocal == browserShipId}`);
    */
  /*
  if (shipIdLocal == browserShipId) {
    setloadShip((prev) => true);
    setloadFilms((prev) => true);
    setloadPilots((prev) => true);
    let singleShipL = JSON.parse(localStorage.getItem("singleShipObj"));
    let pilotInfoL = JSON.parse(localStorage.getItem("pilots"));
    let filmInfoL = JSON.parse(localStorage.getItem("films"));
    let pilotImgInfoL = JSON.parse(localStorage.getItem("pilotImgs"));
    let filmImgInfoL = JSON.parse(localStorage.getItem("filmImgs"));
    let starshipImgL = JSON.parse(localStorage.getItem("starshipImg"));

  

    setSingleShip((prev) => singleShipL);
    setPilotInfo((prev) => pilotInfoL);
    setFilmInfo((prev) => filmInfoL);
    setPilotImgInfo((prev) => pilotImgInfoL);
    setFilmImgInfo((prev) => filmImgInfoL);
    setShipImgInfo((prev) => starshipImgL);
    setloadShip((prev) => false);
    setloadFilms((prev) => false);
    setloadPilots((prev) => false);

  }
*/
  //HANDLING CLICK OF INDIVIDUAL SHIP
  const getSingleShip = async () => {
    const url = `https://swapi.dev/api/starships/${singleShip}/`;
    const singleShipObj = await axios.get(url);
    await localStorage.setItem(
      "singleShipObj",
      JSON.stringify({ ...singleShipObj.data, id: singleShip })
    );
    await localStorage.setItem(
      "singleShipName",
      JSON.stringify(singleShipObj.data.name)
    );
    await setSingleShip((prev) => singleShipObj.data);
    await console.log("2. singleShipObj.name : " + singleShipObj.data.name);
    await localStorage.setItem(
      "PilotUrls",
      JSON.stringify(singleShipObj.data.pilots)
    );
    await localStorage.setItem(
      "FilmUrls",
      JSON.stringify(singleShipObj.data.films)
    );
    await setPilotUrls((prev) => singleShipObj.data.pilots);
    await setFilmUrls((prev) => singleShipObj.data.films);
    await console.log("length of pilots arr =" + pilotUrls.length);
    await console.log("length of films arr =" + filmUrls.length);
    await setloadShip(false);
    console.log("LOAD SHIP SET FALSE");
    await console.log(
      "3. singleStarship info loading COMPLETE and url length of pilots is " +
        pilotUrls.length
    );
  };

  const handleClickShip = (x) => {
    //using communicating child to parent, from card to starshipbrief
    //Clear Previous States
    setRefreshFlag((prev) => false);
    setPilotUrls([]);
    setFilmUrls([]);
    setPilotInfo([]);
    setFilmInfo([]);
    setPilotImgInfo([]);
    setFilmImgInfo([]);
    setShipId("");

    //
    console.log("id of ship I clicked on " + x);
    setSingleShip((prev) => x);
    setShipId((prev) => x);
    localStorage.setItem("singleShipId", JSON.stringify(x));
    console.log("id in state" + singleShip);
    console.log("1. singleStarshipInfo loading");
    setloadShip((prev) => true);
    console.log("LOAD SHIP SET TRUE");
    history.push(`/starship-detail/${x}`);
    //for the base case of page refreshed:
  };

  useEffect(() => {
    console.log("LOAD SHIP USE EFFECT ACTIVATED");
    if (loadShip) {
      getSingleShip();
    } else {
      console.log(
        "can't call api on a ship when we don't know what ship it is yet"
      );
    }
  }, [loadShip]);

  const fetchPilots = async () => {
    setloadPilots((prev) => true);
    console.log("LOAD PILOTS SET TRUE");

    if (pilotUrls.length > 0) {
      let pilotInfoNew = [];
      for (let i = 0; i < pilotUrls.length; i++) {
        try {
          let pilotObj = await axios.get(pilotUrls[i]);
          console.log("printing" + i + " " + pilotObj.data.name);
          pilotInfoNew.push(pilotObj.data);
        } catch (error) {
          pilotInfoNew.push({
            name: false,
            error: { message: error.message, response: error.response },
          });
          console.log(error.message);
          console.log(error.response);
        }
      }
      await setPilotInfo((prev) => pilotInfoNew);
      await setloadPilots((prev) => false);
      await console.log("LOADPILOTS SET FALSE");
      await console.log(
        "now the pilots are loaded and loadPilots is" +
          loadPilots +
          "and pilot Info length is " +
          pilotInfo.length
      );
    }
  };
  //Call each of Pilot Apis and add info into an arr for child to map through
  useEffect(() => {
    if (singleShip && pilotUrls.length !== 0) {
      console.log("PILOT USE EFFECT ACTIVATED");
      fetchPilots();
    } else {
      console.log(
        "can't fetch pilots when there is no url of pilots to fetch from "
      );
    }
  }, [singleShip, pilotUrls]);

  const fetchPilotImgs = () => {
    setloadPilotImgs((prev) => true);
    console.log("PILOT IMGS SET 2 TRUE");
    let pilotImgsNew = [];
    if (pilotUrls.length > 0) {
      for (let i = 0; i < pilotUrls.length; i++) {
        let pilotId = pilotUrls[i].substring(29, pilotUrls[i].length - 1);
        let pilotImgUrl = `https://starwars-visualguide.com/assets/img/characters/${pilotId}.jpg`;

        pilotImgsNew.push(pilotImgUrl);
      }
      setPilotImgInfo((prev) => pilotImgsNew);
      setloadPilotImgs((prev) => false);
    }
  };

  const fetchFilmImgs = () => {
    setloadFilmImgs((prev) => true);
    console.log("PILOT IMGS SET 2 TRUE");
    let filmImgsNew = [];
    if (filmUrls.length > 0) {
      for (let i = 0; i < filmUrls.length; i++) {
        let filmId = filmUrls[i].substring(28, filmUrls[i].length - 1);
        let filmImgUrl = `https://starwars-visualguide.com/assets/img/films/${filmId}.jpg`;
        filmImgsNew.push(filmImgUrl);
      }
      setFilmImgInfo((prev) => filmImgsNew);
      setloadFilmImgs((prev) => false);
    }
  };

  const fetchShipImg = () => {
    setloadShipImg((prev) => true);
    console.log("SHIP IMG SET 2 TRUE");
    let shipImgUrl = "";
    shipImgUrl = `https://starwars-visualguide.com/assets/img/starships/${shipId}.jpg`;
    localStorage.setItem("starshipImg", shipImgInfo);
    setShipImgInfo((prev) => shipImgUrl);
    setloadShipImg((prev) => false);
  };

  useEffect(() => {
    if (singleShip && shipId !== 0) {
      console.log("FILM IMG USE EFFECT ACTIVATED");
      fetchShipImg();
    } else {
      console.log("can't fetch film imgs when there is no url of film");
    }
  }, [singleShip, shipId]);

  useEffect(() => {
    if (singleShip && filmUrls.length !== 0) {
      console.log("FILM IMG USE EFFECT ACTIVATED");
      fetchFilmImgs();
    } else {
      console.log("can't fetch film imgs when there is no url of film");
    }
  }, [singleShip, filmUrls]);

  useEffect(() => {
    if (singleShip && pilotUrls.length !== 0) {
      console.log("PILOT IMG USE EFFECT ACTIVATED");
      fetchPilotImgs();
    } else {
      console.log("can't fetch pilot imgs when there is no url of pilots");
    }
  }, [singleShip, pilotUrls]);

  const fetchFilms = async () => {
    setloadFilms((prev) => true);
    console.log("LOAD FILMS SET TRUE");
    let filmInfoNew = [];
    if (filmUrls.length > 0) {
      for (let i = 0; i < filmUrls.length; i++) {
        try {
          let filmObj = await axios.get(filmUrls[i]);
          console.log("printing" + i + " " + filmObj.data.name);
          filmInfoNew.push(filmObj.data);
        } catch (error) {
          filmInfoNew.push({
            title: false,
            error: { message: error.message, response: error.response },
          });
        }
      }
    }
    await setFilmInfo((prev) => filmInfoNew);
    //await localStorage.setItem("shipFilmInfo", JSON.stringify(filmInfoNew));
    await setloadFilms((prev) => false);
    await console.log("LOADFILMS SET FALSE");
    await console.log(
      "now the films are loaded and loadFilms is" +
        loadFilms +
        "and pilot Info length is " +
        filmInfo.length
    );
  };

  useEffect(() => {
    if (singleShip && filmUrls.length !== 0) {
      console.log("FILM USE EFFECT ACTIVATED");
      fetchFilms();
    } else {
      console.log(
        "can't fetch films when there is no url of films to fetch from meine freund"
      );
    }
  }, [singleShip, filmUrls]);

  useEffect(() => {
    if (filmInfo && refreshFlag === false) {
      console.log("CTX: MODIFYING FILM LOCAL STORAGE");
      console.log("CTX: MODIFYING FILM LOCAL STORAGE");
      console.log("CTX: MODIFYING FILM LOCAL STORAGE");
      console.log("REFRESH FLAG SHOULD BE FALSE" + refreshFlag);
      localStorage.setItem("films", JSON.stringify(filmInfo));
    } else {
      console.log("nothing in film info so nothing to set");
    }
  }, [filmInfo, refreshFlag]);

  useEffect(() => {
    if (pilotInfo && refreshFlag === false) {
      localStorage.setItem("pilots", JSON.stringify(pilotInfo));
    } else {
      console.log("nothing in film info so nothing to set");
    }
  }, [pilotInfo, refreshFlag]);

  useEffect(() => {
    if (filmImgInfo && refreshFlag === false) {
      localStorage.setItem("filmImgs", JSON.stringify(filmImgInfo));
    } else {
      console.log("nothing in filmImg info so nothing to set");
    }
  }, [filmImgInfo, refreshFlag]);

  useEffect(() => {
    if (pilotImgInfo && refreshFlag === false) {
      localStorage.setItem("pilotImgs", JSON.stringify(pilotImgInfo));
    } else {
      console.log("nothing in pilotImg info so nothing to set");
    }
  }, [pilotImgInfo, refreshFlag]);

  return (
    <StarshipExtensiveCtx.Provider
      value={{
        refreshFlag: refreshFlag,
        singleShip: singleShip,
        handleClickShip: handleClickShip,
        pilotInfo: pilotInfo,
        filmInfo: filmInfo,
        loadPilots: loadPilots,
        loadFilms: loadFilms,
        loadShip: loadShip,
        loadShipImg: loadShipImg,
        pilotUrls: pilotUrls,
        filmUrls: filmUrls,
        pilotImgInfo: pilotImgInfo,
        filmImgInfo: filmImgInfo,
        shipImgInfo: shipImgInfo,
        setloadFilms: setloadFilms,
        setloadPilots: setloadPilots,
        setloadShip: setloadShip,
      }}
    >
      {props.children}
    </StarshipExtensiveCtx.Provider>
  );
};

export default StarshipExtensiveProvider;
export const StarshipExtensiveCtx = createContext();
