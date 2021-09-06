import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { CharactersContext } from "./CharactersContext";

const CharacterDetailProvider = (props) => {
  const [refreshFlag, setRefreshFlag] = useState(true);
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
    localStorage.setItem(
      "singleCharacterName",
      JSON.stringify(singleCharacterObj.data.name)
    );
    await setSingleCharacter((prev) => singleCharacterObj.data);
    await localStorage.setItem(
      "CharacterShipUrls",
      JSON.stringify(singleCharacterObj.data.starships)
    );
    await localStorage.setItem(
      "FilmUrls",
      JSON.stringify(singleCharacterObj.data.films)
    );
    await setShipUrls((prev) => singleCharacterObj.data.starships);
    await setFilmUrls((prev) => singleCharacterObj.data.films);
    await setloadCharacter((prev) => false);
  };

  const handleClickCharacter = (x) => {
    //communicating child to parent, from card to starshipbrief
    //Clear Previous States
    setRefreshFlag((prev) => false); //not refreshing, clicking
    setShipUrls([]);
    setFilmUrls([]);
    setShipInfo([]);
    setFilmInfo([]);
    setShipImgInfo([]);
    setFilmImgInfo([]);
    setCharacterId("");

    //
    setSingleCharacter((prev) => x);
    setCharacterId((prev) => x);
    localStorage.setItem("singleCharacterId", JSON.stringify(x));
    setloadCharacter((prev) => true);
    setloadFilms((prev) => true);
    setloadShips((prev) => true);
    history.push(`/character-detail/${x}`);
    //for the base case of page refreshed:
  };

  useEffect(() => {
    if (loadCharacter) {
      getSingleCharacter();
    } else {
      console.log(
        "can't call api on a Character when we don't know what Character it is yet"
      );
    }
  }, [loadCharacter]);

  const fetchShips = async () => {
    let shipInfoNew = [];
    if (shipUrls.length > 0) {
      for (let i = 0; i < shipUrls.length; i++) {
        let shipObj = await axios.get(shipUrls[i]);
        shipInfoNew.push(shipObj.data);
      }
      setShipInfo((prev) => shipInfoNew);
      setloadShips((prev) => false);
    } else {
      setShipInfo((prev) => shipInfoNew);
      setloadShips((prev) => false);
    }
  };

  //Call each of Pilot Apis and add info into an arr for child to map through
  useEffect(() => {
    if (singleCharacter && shipUrls.length !== 0) {
      fetchShips();
    } else {
      console.log(
        "can't fetch ships when there is no url of ships to fetch from"
      );
    }
    if (singleCharacter && !loadCharacter && shipUrls.length === 0) {
      setloadShips((prev) => false);
      setShipInfo((prev) => []);
    }
  }, [singleCharacter, loadCharacter, shipUrls]);

  const fetchShipImgs = () => {
    setloadShipImgs((prev) => true);
    let shipImgsNew = [];
    if (shipUrls.length > 0) {
      for (let i = 0; i < shipUrls.length; i++) {
        let shipId = shipUrls[i].substring(32, shipUrls[i].length - 1);
        let shipImgUrl = `https://starwars-visualguide.com/assets/img/starships/${shipId}.jpg`;
        shipImgsNew.push(shipImgUrl);
      }
      setShipImgInfo((prev) => shipImgsNew);
      setloadShipImgs((prev) => false);
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

  const fetchCharacterImg = () => {
    setloadCharacterImg((prev) => true);
    let characterImgUrl = "";
    characterImgUrl = `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`;
    setCharacterImgInfo((prev) => characterImgUrl);
    localStorage.setItem("characterImg", JSON.stringify(characterImgInfo));
    setloadCharacterImg((prev) => false);
  };

  useEffect(() => {
    if (singleCharacter && characterId !== 0) {
      fetchCharacterImg();
    } else {
      console.log(
        "can't fetch character img when there is no url of character"
      );
    }
  }, [singleCharacter, characterId]);

  useEffect(() => {
    if (singleCharacter && filmUrls.length !== 0) {
      fetchFilmImgs();
    } else {
      console.log("can't fetch film imgs when there is no url of film");
    }
  }, [singleCharacter, filmUrls]);

  useEffect(() => {
    if (singleCharacter && shipUrls.length !== 0) {
      fetchShipImgs();
    } else {
      console.log("can't fetch ship imgs when there is no url of ships");
    }
  }, [singleCharacter, shipUrls]);

  const fetchFilms = async () => {
    let filmInfoNew = [];
    if (filmUrls.length > 0) {
      for (let i = 0; i < filmUrls.length; i++) {
        let filmObj = await axios.get(filmUrls[i]);
        filmInfoNew.push(filmObj.data);
      }
    }
    await setFilmInfo((prev) => filmInfoNew);
    await setloadFilms((prev) => false);
  };

  useEffect(() => {
    if (singleCharacter && filmUrls.length !== 0) {
      fetchFilms();
    } else {
      console.log(
        "can't fetch films when there is no url of films to fetch from"
      );
    }
  }, [singleCharacter, filmUrls]);

  useEffect(() => {
    if (filmInfo && refreshFlag === false) {
      localStorage.setItem("films", JSON.stringify(filmInfo));
    } else {
      console.log("nothing in film info so nothing to set");
    }
  }, [filmInfo, refreshFlag]);

  useEffect(() => {
    if (shipInfo && refreshFlag === false) {
      localStorage.setItem("shipsCharacter", JSON.stringify(shipInfo));
    } else {
      console.log("nothing in ship info so nothing to set");
    }
  }, [shipInfo, refreshFlag]);

  useEffect(() => {
    if (filmImgInfo && refreshFlag === false) {
      localStorage.setItem("filmImgs", JSON.stringify(filmImgInfo));
    } else {
      console.log("nothing in filmImg info so nothing to set");
    }
  }, [filmImgInfo, refreshFlag]);

  useEffect(() => {
    if (shipImgInfo && refreshFlag === false) {
      localStorage.setItem("shipImgs", JSON.stringify(shipImgInfo));
    } else {
      console.log("nothing in shipImg info so nothing to set");
    }
  }, [shipImgInfo, refreshFlag]);

  return (
    <CharacterDetailCtx.Provider
      value={{
        refreshFlag: refreshFlag,
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
