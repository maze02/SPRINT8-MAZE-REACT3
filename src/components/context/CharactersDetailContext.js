import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { CharactersContext } from "./CharactersContext";

const CharacterDetailProvider = (props) => {
  const [singleCharacter, setSingleCharacter] = useState();
  const [characterId, setCharacterId] = useState("");
  const [shipUrls, setShipUrls] = useState([]);
  const [shipInfo, setShipInfo] = useState([]);
  const [filmUrls, setFilmUrls] = useState([]);
  const [filmInfo, setFilmInfo] = useState([]);
  const [loadCharacter, setloadCharacter] = useState(false);
  const [loadShips, setloadShips] = useState(false);
  const [loadFilms, setloadFilms] = useState(false);
  const [loadShipImgs, setloadShipImgs] = useState(true);
  const [loadFilmImgs, setloadFilmImgs] = useState(true);
  const [loadCharacterImg, setloadCharacterImg] = useState(true);
  const [shipImgInfo, setShipImgInfo] = useState([]);
  const [filmImgInfo, setFilmImgInfo] = useState([]);
  const [characterImgInfo, setCharacterImgInfo] = useState("");
  const ctx = useContext(CharactersContext);
  const history = useHistory();

  //HANDLING CLICK OF INDIVIDUAL SHIP
  const getSingleCharacter = async () => {
    const url = `https://swapi.dev/api/people/${singleCharacter}/`;
    const singleCharacterObj = await axios.get(url);
    await localStorage.setItem(
      "singleCharacterObj",
      JSON.stringify({ ...singleCharacterObj.data, id: singleCharacter })
    );
    await setSingleCharacter(singleCharacterObj.data);
    await console.log(
      "2. singleCharacterObj.name : " + singleCharacterObj.data.name
    );
    await localStorage.setItem(
      "CharacterShipUrls",
      JSON.stringify(singleCharacterObj.data.starships)
    );
    await localStorage.setItem(
      "FilmUrls",
      JSON.stringify(singleCharacterObj.data.films)
    );
    await setShipUrls(singleCharacterObj.data.starships);
    await setFilmUrls(singleCharacterObj.data.films);
    await console.log("length of character ship arr =" + shipUrls.length);
    await console.log("length of films arr =" + filmUrls.length);
    await setloadCharacter(false);
    console.log("LOAD SHIP SET FALSE");
    await console.log(
      "3. singleCharacter info loading COMPLETE and url length of ships is " +
        shipUrls.length
    );
  };

  const handleClickCharacter = (x) => {
    //using communicating child to parent, from card to starshipbrief
    //Clear Previous States
    setShipUrls([]);
    setFilmUrls([]);
    setShipInfo([]);
    setFilmInfo([]);
    setShipImgInfo([]);
    setFilmImgInfo([]);
    setCharacterId("");

    //
    console.log("id of character I clicked on " + x);
    setSingleCharacter(x);
    setCharacterId(x);
    localStorage.setItem("singleCharacterId", JSON.stringify(x));
    console.log("id in state" + singleCharacter);
    console.log("1. singleCharacterInfo loading");
    setloadCharacter(true);
    console.log("LOAD SHIP SET TRUE");
    history.push(`/character-detail/${x}`);
    //for the base case of page refreshed:
  };

  useEffect(() => {
    console.log("LOAD Character USE EFFECT ACTIVATED");
    if (loadCharacter) {
      getSingleCharacter();
    } else {
      console.log(
        "can't call api on a Character when we don't know what Character it is yet mate"
      );
    }
  }, [loadCharacter]);

  const fetchShips = async () => {
    setloadShips(true);
    console.log("LOAD Ships SET TRUE");

    if (shipUrls.length > 0) {
      let shipInfoNew = [];
      for (let i = 0; i < shipUrls.length; i++) {
        let shipObj = await axios.get(shipUrls[i]);
        console.log("printing" + i + " " + shipObj.data.name);
        shipInfoNew.push(shipObj.data);
      }
      await setShipInfo(shipInfoNew);
      await setloadShips(false);
      await console.log("LOADSHIPS SET FALSE");
      await console.log(
        "now the ships are loaded and loadships is" +
          loadShips +
          "and shipInfo length is " +
          shipInfo.length
      );
    }
  };
  
  //Call each of Pilot Apis and add info into an arr for child to map through
  useEffect(() => {
    if (singleCharacter && shipUrls.length !== 0) {
      console.log("SHIP USE EFFECT ACTIVATED");
      fetchShips();
    } else {
      console.log(
        "can't fetch ships when there is no url of ships to fetch from my friend"
      );
    }
  }, [singleCharacter, shipUrls]);

  const fetchShipImgs = () => {
    setloadShipImgs(true);
    console.log("SHIP IMGS SET 2 TRUE");
    let shipImgsNew = [];
    if (shipUrls.length > 0) {
      for (let i = 0; i < shipUrls.length; i++) {
        let shipId = shipUrls[i].substring(32, shipUrls[i].length - 1);
        let shipImgUrl = `https://starwars-visualguide.com/assets/img/starships/${shipId}.jpg`;
        /*fix attempted*/
        shipImgsNew.push(shipImgUrl);
      }
      setShipImgInfo(shipImgsNew);
      setloadShipImgs(false);
    }
  };

  const fetchFilmImgs = () => {
    setloadFilmImgs(true);
    console.log("FILM IMGS SET 2 TRUE");
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

  const fetchCharacterImg = () => {
    setloadCharacterImg(true);
    console.log("SHIP IMG SET 2 TRUE");
    let characterImgUrl = "";
    characterImgUrl = `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`;
    //NOT GOING TO BE THE SAME CHANGE URL
    localStorage.setItem("characterImg", shipImgInfo);
    setCharacterImgInfo(characterImgUrl);
    setloadCharacterImg(false);
  };

  useEffect(() => {
    if (singleCharacter && characterId !== 0) {
      console.log("CHARACTER IMG USE EFFECT ACTIVATED");
      fetchCharacterImg();
    } else {
      console.log(
        "can't fetch character img when there is no url of character, I ain't no wizard Yoko"
      );
    }
  }, [singleCharacter, characterId]);

  useEffect(() => {
    if (singleCharacter && filmUrls.length !== 0) {
      console.log("FILM IMG USE EFFECT ACTIVATED");
      fetchFilmImgs();
    } else {
      console.log(
        "can't fetch film imgs when there is no url of film, I ain't no wizard Yoko"
      );
    }
  }, [singleCharacter, filmUrls]);

  useEffect(() => {
    if (singleCharacter && shipUrls.length !== 0) {
      console.log("SHIP IMG USE EFFECT ACTIVATED");
      fetchShipImgs();
    } else {
      console.log(
        "can't fetch ship imgs when there is no url of ships, I ain't a wizard Columbo"
      );
    }
  }, [singleCharacter, shipUrls]);

  const fetchFilms = async () => {
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
        "and film Info length is " +
        filmInfo.length
    );
  };

  useEffect(() => {
    if (singleCharacter && filmUrls.length !== 0) {
      console.log("FILM USE EFFECT ACTIVATED");
      fetchFilms();
    } else {
      console.log(
        "can't fetch films when there is no url of films to fetch from meine freund"
      );
    }
  }, [singleCharacter, filmUrls]);

  useEffect(() => {
    if (filmInfo) {
      localStorage.setItem("films", JSON.stringify(filmInfo));
    } else {
      console.log("nothing in film info so nothing to set");
    }
  }, [filmInfo]);

  useEffect(() => {
    if (shipInfo) {
      localStorage.setItem("shipsCharacter", JSON.stringify(shipInfo));
    } else {
      console.log("nothing in ship info so nothing to set");
    }
  }, [shipInfo]);

  useEffect(() => {
    if (filmImgInfo) {
      localStorage.setItem("filmImgs", JSON.stringify(filmImgInfo));
    } else {
      console.log("nothing in filmImg info so nothing to set");
    }
  }, [filmImgInfo]);

  useEffect(() => {
    if (shipImgInfo) {
      localStorage.setItem("shipImgs", JSON.stringify(shipImgInfo));
    } else {
      console.log("nothing in shipImg info so nothing to set");
    }
  }, [shipImgInfo]);

  return (
    <CharacterDetailCtx.Provider
      value={{
        singleCharacter: singleCharacter,
        handleClickCharacter: handleClickCharacter,
        shipInfo: shipInfo,
        filmInfo: filmInfo,
        loadShips: loadShips,
        loadFilms: loadFilms,
        loadCharacter: loadCharacter,
        loadCharacterImg: loadCharacterImg,
        shipUrls: shipUrls,
        filmUrls: filmUrls,
        shipImgInfo: shipImgInfo,
        filmImgInfo: filmImgInfo,
        characterImgInfo: characterImgInfo,
      }}
    >
      {props.children}
    </CharacterDetailCtx.Provider>
  );
};

export default CharacterDetailProvider;
export const CharacterDetailCtx = createContext();
