import CharacterBrief from "./CharacterBrief";

const CharactersList = ({ actorsArr, handleClickCharacter }) => {
  const list = actorsArr.map((element) => {
    return (
      <CharacterBrief
        key={element.id}
        id={element.id}
        name={element.name}
        birthyear={element.birth_year}
        handleClickCharacter={handleClickCharacter}
      />
    );
  });
  return <div>{[...list]}</div>;
};

export default CharactersList;
//        handleClickActor={handleClickActor}
