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
  //const [loadPilots, setloadPilots] = useState(false); //*******changed to true */
  const [loadPilots, setloadPilots] = useState(false);
  const [loadFilms, setloadFilms] = useState(false); //*******change */
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
    //HERE set setloadFilms((prev) => true);?
    //await setloadPilots((prev) => false); removed
    //await setloadPilots((prev) => false); removed
    await setloadShip(false);
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
    setSingleShip((prev) => x);
    setShipId((prev) => x);
    localStorage.setItem("singleShipId", JSON.stringify(x));
    setloadShip((prev) => true);
    setloadPilots((prev) => true); //***changed it -added */
    setloadFilms((prev) => true); //***changed it -added*/
    history.push(`/starship-detail/${x}`);
  };

  useEffect(() => {
    if (loadShip) {
      getSingleShip();
    } else {
      console.log(
        "can't call api on a ship when we don't know what ship it is yet"
      );
    }
  }, [loadShip]);

  const fetchPilots = async () => {
    //setloadPilots((prev) => true); //******change
    let pilotInfoNew = [];
    if (pilotUrls.length > 0) {
      for (let i = 0; i < pilotUrls.length; i++) {
        try {
          let pilotObj = await axios.get(pilotUrls[i]);
          pilotInfoNew.push(pilotObj.data);
        } catch (error) {
          pilotInfoNew.push({
            name: false,
            error: { message: error.message, response: error.response },
          });
        }
      }
      setPilotInfo((prev) => pilotInfoNew); //removed await
      setloadPilots((prev) => false);
    } else {
      setPilotInfo((prev) => pilotInfoNew); //removed await
      setloadPilots((prev) => false);
    }
    // await setPilotInfo((prev) => pilotInfoNew); //removed await
    //  await setloadPilots((prev) => false);

    /*
   //} else {
    //  setPilotInfo((prev) => pilotInfoNew); //removed await
    //  console.log("88888-setloadpilots to false -pilotstatus" + loadPilots);
    //  setloadPilots((prev) => false); //removed await
    //  localStorage.setItem("loadPilots", "false");
   // }
  */
  };
  //Call each of Pilot Apis and add info into an arr for child to map through
  useEffect(() => {
    if (singleShip && pilotUrls.length !== 0) {
      fetchPilots();
    } else {
      console.log(
        "can't fetch pilots when there is no url of pilots to fetch from "
      );
    }
    //i;
    if (singleShip && !loadShip && pilotUrls.length === 0) {
      setPilotInfo((prev) => []);
      setloadPilots((prev) => false);

      // localStorage.setItem("loadPilots", "false");
    }
  }, [singleShip, loadShip, pilotUrls]);

  const fetchPilotImgs = () => {
    setloadPilotImgs((prev) => true);
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
    let shipImgUrl = "";
    shipImgUrl = `https://starwars-visualguide.com/assets/img/starships/${shipId}.jpg`;
    localStorage.setItem("starshipImg", shipImgInfo);
    setShipImgInfo((prev) => shipImgUrl);
    setloadShipImg((prev) => false);
  };

  useEffect(() => {
    if (singleShip && shipId !== 0) {
      fetchShipImg();
    } else {
      console.log("can't fetch film imgs when there is no url of film");
    }
  }, [singleShip, shipId]);

  useEffect(() => {
    if (singleShip && filmUrls.length !== 0) {
      fetchFilmImgs();
    } else {
      console.log("can't fetch film imgs when there is no url of film");
    }
  }, [singleShip, filmUrls]);

  useEffect(() => {
    if (singleShip && pilotUrls.length !== 0) {
      fetchPilotImgs();
    } else {
      console.log("can't fetch pilot imgs when there is no url of pilots");
    }
  }, [singleShip, pilotUrls]);

  const fetchFilms = async () => {
    //setloadFilms((prev) => true); //*****removed
    let filmInfoNew = [];
    if (filmUrls.length > 0) {
      for (let i = 0; i < filmUrls.length; i++) {
        try {
          let filmObj = await axios.get(filmUrls[i]);
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
    await setloadFilms((prev) => false); //changez
  };

  useEffect(() => {
    if (singleShip && filmUrls.length !== 0) {
      fetchFilms();
    } else {
      console.log(
        "can't fetch films when there is no url of films to fetch from"
      );
    }
  }, [singleShip, filmUrls]);

  useEffect(() => {
    if (filmInfo && refreshFlag === false) {
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
