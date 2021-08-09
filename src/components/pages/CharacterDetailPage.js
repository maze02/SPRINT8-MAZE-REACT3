import { useContext } from "react";
import { useHistory, useLocation } from "react-router";
import { CharacterDetailCtx } from "../context/CharactersDetailContext";
import SingleCharacterExtensive from "../characters/SingleCharacterExtensive";
import FilmList from "../starships/FilmList";
import ShipList from "../characters/ShipList";

const CharacterDetailPage = () => {
  const ctxE = useContext(CharacterDetailCtx);
  const history = useHistory();
  const location = useLocation();

  //handling refreshing browser
  let cIdLocal = JSON.parse(localStorage.getItem("singleCharacterId"));
  let browserCId = location.pathname.substring(18);
  console.log(`cIDLoval == browsercId ${cIdLocal == browserCId}`);

  let loadFilms;
  let loadShips;
  let loadCharacter;
  let characterName = JSON.parse(localStorage.getItem("singleCharacterName"));

  if (cIdLocal == browserCId) {
    loadFilms = false;
    loadShips = false;
    loadCharacter = false;
  } else {
    loadFilms = ctxE.loadFilms;
    loadShips = ctxE.loadShips;
    loadCharacter = ctxE.Character;
  }
  return (
    <div>
      <SingleCharacterExtensive loadCharacter={loadCharacter} />
      <h2>Starships</h2>
      <ShipList
        shipListArr={ctxE.shipInfo}
        loadShips={ctxE.loadShips}
        shipImgInfo={ctxE.shipImgInfo}
        characterName={characterName}
      />
      <h2>Films</h2>
      <FilmList
        filmListArr={ctxE.filmInfo}
        loadFilms={ctxE.loadFilms}
        filmImgInfo={ctxE.filmImgInfo}
        generalInfo={{ theme: "character", name: characterName }}
      />
    </div>
  );
};

export default CharacterDetailPage;
