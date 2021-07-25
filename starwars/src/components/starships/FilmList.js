import { useContext } from "react";
import { StarshipExtensiveCtx } from "../context/StarshipsExtensiveCtx";
import FilmItem from "./FilmItem";

const FilmList = ({ filmListArr, loadFilms }) => {
  if (loadFilms) {
    return <p>Films loading ...</p>;
  } else {
    //let filmListLocal = localStorage.getItem("films");
    //filmListArr = JSON.parse(filmListLocal);
    if (filmListArr.length === 0) {
      return <p>No record of this starship appearing in a film</p>;
    } else {
      let filmListContent = filmListArr.map((e) => {
        return (
          <FilmItem
            key={e.title}
            title={e.title}
            release_date={e.release_date}
          />
        );
      });
      return <div>{[...filmListContent]}</div>;
    }
  }
};

export default FilmList;

/*
`${e.release_date.substring(
            8,
            9
          )}-${e.release_date.substring(5, 7)}-${e.release_date.substring(
            0,
            4
          )}`
*/
