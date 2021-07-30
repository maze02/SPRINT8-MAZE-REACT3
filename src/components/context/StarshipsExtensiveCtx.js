//https://blog.logrocket.com/guide-to-react-usereducer-hook/
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { StarshipsContext } from "./StarshipsContext";

const StarshipExtensiveProvider = (props) => {
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
  //const location = useLocation();

  //const dataPilotReducer = (state, action) => {};

  //HANDLING CLICK OF INDIVIDUAL SHIP
  const getSingleShip = async () => {
    const url = `https://swapi.dev/api/starships/${singleShip}/`;
    const singleShipObj = await axios.get(url);
    await localStorage.setItem(
      "singleShipObj",
      JSON.stringify({ ...singleShipObj.data, id: singleShip })
    );
    await setSingleShip(singleShipObj.data);
    await console.log("2. singleShipObj.name : " + singleShipObj.data.name);
    await localStorage.setItem(
      "PilotUrls",
      JSON.stringify(singleShipObj.data.pilots)
    );
    await localStorage.setItem(
      "FilmUrls",
      JSON.stringify(singleShipObj.data.films)
    );
    await setPilotUrls(singleShipObj.data.pilots);
    await setFilmUrls(singleShipObj.data.films);
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
    setPilotUrls([]);
    setFilmUrls([]);
    setPilotInfo([]);
    setFilmInfo([]);
    setPilotImgInfo([]);
    setFilmImgInfo([]);
    setShipId("");

    //
    console.log("id of ship I clicked on " + x);
    setSingleShip(x);
    setShipId(x);
    localStorage.setItem("singleShipId", JSON.stringify(x));
    console.log("id in state" + singleShip);
    console.log("1. singleStarshipInfo loading");
    setloadShip(true);
    console.log("LOAD SHIP SET TRUE");
    history.push(`/starship-detail/${x}`);
    //for the base case of page refreshed:
  };

  useEffect(() => {
    console.log("LOAD SHIP USE EFFECT ACTIVATED");
    if (loadShip) {
      getSingleShip();
      /*
      console.log(
        "here's what's the location object" +
          JSON.stringify(location.pathname.substring(17))
      );*/
    } else {
      console.log(
        "can't call api on a ship when we don't know what ship it is yet mate"
      );
    }
  }, [loadShip]);

  const fetchPilots = async () => {
    setloadPilots(true);
    console.log("LOAD PILOTS SET TRUE");

    if (pilotUrls.length > 0) {
      let pilotInfoNew = [];
      for (let i = 0; i < pilotUrls.length; i++) {
        let pilotObj = await axios.get(pilotUrls[i]);
        console.log("printing" + i + " " + pilotObj.data.name);
        pilotInfoNew.push(pilotObj.data);
      }
      await setPilotInfo(pilotInfoNew);
      await setloadPilots(false);
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
        "can't fetch pilots when there is no url of pilots to fetch from my friend"
      );
    }
  }, [singleShip, pilotUrls]);

  const fetchPilotImgs = () => {
    setloadPilotImgs(true);
    console.log("PILOT IMGS SET 2 TRUE");
    let pilotImgsNew = [];
    if (pilotUrls.length > 0) {
      for (let i = 0; i < pilotUrls.length; i++) {
        let pilotId = pilotUrls[i].substring(29, pilotUrls[i].length - 1);
        let pilotImgUrl = `https://starwars-visualguide.com/assets/img/characters/${pilotId}.jpg`;

        pilotImgsNew.push(pilotImgUrl);
      }
      setPilotImgInfo(pilotImgsNew);
      setloadPilotImgs(false);
    }
  };

  const fetchFilmImgs = () => {
    setloadFilmImgs(true);
    console.log("PILOT IMGS SET 2 TRUE");
    let filmImgsNew = [];
    if (filmUrls.length > 0) {
      for (let i = 0; i < filmUrls.length; i++) {
        let filmId = filmUrls[i].substring(28, filmUrls[i].length - 1);
        let filmImgUrl = `https://starwars-visualguide.com/assets/img/films/${filmId}.jpg`;

        filmImgsNew.push(filmImgUrl);
      }
      setFilmImgInfo(filmImgsNew);
      setloadFilmImgs(false);
    }
  };

  const fetchShipImg = () => {
    setloadShipImg(true);
    console.log("SHIP IMG SET 2 TRUE");
    let shipImgUrl = "";
    shipImgUrl = `https://starwars-visualguide.com/assets/img/starships/${shipId}.jpg`;
    localStorage.setItem("starshipImg", shipImgInfo);
    setShipImgInfo(shipImgUrl);
    setloadShipImg(false);
  };

  useEffect(() => {
    if (singleShip && shipId !== 0) {
      console.log("FILM IMG USE EFFECT ACTIVATED");
      fetchShipImg();
    } else {
      console.log(
        "can't fetch film imgs when there is no url of film, I ain't no wizard Yoko"
      );
    }
  }, [singleShip, shipId]);

  useEffect(() => {
    if (singleShip && filmUrls.length !== 0) {
      console.log("FILM IMG USE EFFECT ACTIVATED");
      fetchFilmImgs();
    } else {
      console.log(
        "can't fetch film imgs when there is no url of film, I ain't no wizard Yoko"
      );
    }
  }, [singleShip, filmUrls]);

  useEffect(() => {
    if (singleShip && pilotUrls.length !== 0) {
      console.log("PILOT IMG USE EFFECT ACTIVATED");
      fetchPilotImgs();
    } else {
      console.log(
        "can't fetch pilot imgs when there is no url of pilots, I ain't a wizard Columbo"
      );
    }
  }, [singleShip, pilotUrls]);

  /*
  const filmFetchReducer = (state, action) => {
    switch (action.type){
      case "FETCH_INIT":
        return {...state,
        filmLoad: true};
      case "FETCH_SUCCESS":
         return {...state,
        filmLoad: false};
      default:
        throw new Error();
    }
  }
*/ const fetchFilms = async () => {
    setloadFilms(true);
    console.log("LOAD FILMS SET TRUE");
    let filmInfoNew = [];
    if (filmUrls.length > 0) {
      for (let i = 0; i < filmUrls.length; i++) {
        let filmObj = await axios.get(filmUrls[i]);
        console.log("printing" + i + " " + filmObj.data.name);
        filmInfoNew.push(filmObj.data);
      }
    }
    await setFilmInfo(filmInfoNew);
    await setloadFilms(false);
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
    if (filmInfo) {
      localStorage.setItem("films", JSON.stringify(filmInfo));
    } else {
      console.log("nothing in film info so nothing to set");
    }
  }, [filmInfo]);

  useEffect(() => {
    if (pilotInfo) {
      localStorage.setItem("pilots", JSON.stringify(pilotInfo));
    } else {
      console.log("nothing in film info so nothing to set");
    }
  }, [pilotInfo]);

  /*
  useEffect(() => {
    if (shipImgInfo) {
      localStorage.setItem("starshipImg", shipImgInfo);
    } else {
      console.log("nothing in starshipImg info so nothing to set");
    }
  }, [shipImgInfo]);
*/
  useEffect(() => {
    if (filmImgInfo) {
      localStorage.setItem("filmImgs", JSON.stringify(filmImgInfo));
    } else {
      console.log("nothing in filmImg info so nothing to set");
    }
  }, [filmImgInfo]);

  useEffect(() => {
    if (pilotImgInfo) {
      localStorage.setItem("pilotImgs", JSON.stringify(pilotImgInfo));
    } else {
      console.log("nothing in pilotImg info so nothing to set");
    }
  }, [pilotImgInfo]);

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
        loadShipImg: loadShipImg,
        pilotUrls: pilotUrls,
        filmUrls: filmUrls,
        pilotImgInfo: pilotImgInfo,
        filmImgInfo: filmImgInfo,
        shipImgInfo: shipImgInfo,
      }}
    >
      {props.children}
    </StarshipExtensiveCtx.Provider>
  );
};

export default StarshipExtensiveProvider;
export const StarshipExtensiveCtx = createContext();

/*
    //await setloadPilots(true);
    //await setloadFilms(true);
*/
//str.substring(29, str.length - 1);
