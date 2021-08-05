import { useState } from "react";
import FilmItem from "./FilmItem";
import classes from "./FilmList.module.css";
//only rerenders if state, props changes
const FilmList = ({ loadFilms, generalInfo }) => {
  const [filmErrCount, setFilmErrCount] = useState(0);
  if (loadFilms) {
    return <p>Films loading ...</p>;
  } else {
    if (!loadFilms) {
      console.log("FILM LISTI'm inside films have finished loading");
      let filmListImgs = localStorage.getItem("filmImgs");
      let filmLocal = localStorage.getItem("films");
      let filmListArr = JSON.parse(filmLocal);
      console.log("FILM LIST film length arr" + filmListArr.length);
      if (filmLocal) {
        let filmImgArr = JSON.parse(filmListImgs);
        for (let i = 0; i < filmListArr.length; i++) {
          if (filmListArr[i].title) {
            if (filmListArr[i].img === undefined) {
              filmListArr[i].img = filmImgArr[i];
            }
          } else {
            filmListArr.splice(i, 1);
            setFilmErrCount((prev) => prev + 1);
          }
        }
      }

      if (filmListArr.length === 0 && filmErrCount === 0) {
        return (
          <div className="textcenter">
            {generalInfo.theme === "starship" && (
              <p>
                {" "}
                No record of the {generalInfo.theme} "{generalInfo.name}" ever
                appearing in a film
              </p>
            )}
            {generalInfo.theme === "character" && (
              <p>No record of "{generalInfo.name}" ever appearing in a film</p>
            )}
          </div>
        );
      } else if (filmListArr.length !== 0) {
        let filmListContent = filmListArr.map((e) => {
          return (
            <FilmItem
              key={e.title}
              title={e.title}
              filmImg={e.img}
              release_date={e.release_date}
            />
          );
        });
        return (
          <div
            className={
              filmListArr.length < 5
                ? classes.filmListWrapper
                : classes.filmInfiniteScroll
            }
          >
            {[...filmListContent]}

            {filmErrCount === 1 && (
              <p>One film could not be loaded. Please try again later.</p>
            )}
            {filmErrCount > 1 && (
              <p>
                {filmErrCount} films could not be loaded. Please try again
                later.
              </p>
            )}
          </div>
        );
      } else {
        return (
          <div>
            {filmErrCount === 1 && (
              <p>One film could not be loaded. Please try again later.</p>
            )}
            {filmErrCount > 1 && (
              <p>
                {filmErrCount} films could not be loaded. Please try again
                later.
              </p>
            )}
          </div>
        );
      }
    }
  }
};

export default FilmList;
