import { useContext } from "react";
import { CharacterDetailCtx } from "../context/CharactersDetailContext";
import SingleCharacterExtensive from "../characters/SingleCharacterExtensive";
import FilmList from "../starships/FilmList";
import ShipList from "../characters/ShipList";

const CharacterDetailPage = () => {
  const ctxE = useContext(CharacterDetailCtx);
  return (
    <div>
      <SingleCharacterExtensive />
      <h2>Starships</h2>
      <ShipList
        shipListArr={ctxE.shipInfo}
        loadShips={ctxE.loadShips}
        shipImgInfo={ctxE.shipImgInfo}
        characterName={ctxE.singleCharacter.name}
      />
      <h2>Films</h2>
      <FilmList
        filmListArr={ctxE.filmInfo}
        loadFilms={ctxE.loadFilms}
        filmImgInfo={ctxE.filmImgInfo}
        generalInfo={{ theme: "character", name: ctxE.singleCharacter.name }}
      />
    </div>
  );
};

export default CharacterDetailPage;
