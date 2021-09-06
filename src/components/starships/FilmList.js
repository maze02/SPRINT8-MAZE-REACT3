
import styled from "styled-components";
import { useState } from "react";
import FilmItem from "./FilmItem";

//only rerenders if state, props changes
const FilmList = ({ loadFilms, generalInfo, filmListArr, filmImgInfo }) => {
  let filmListContent = [];
  const [filmErrCount, setFilmErrCount] = useState(0);

  if (!loadFilms) {
    let filmLocal = localStorage.getItem("films");
    let filmListImgs = localStorage.getItem("filmImgs");

    if (filmLocal) {
      filmListArr = JSON.parse(filmLocal);
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

      filmListContent = filmListArr.map((e) => {
        return (
          <FilmItem
            key={e.title}
            title={e.title}
            filmImg={e.img}
            release_date={e.release_date}
          />
        );
      });
    }
  }
  return (
    <div>
      {loadFilms && <p>Films loading ...</p>}
      {!loadFilms && filmListArr.length === 0 && filmErrCount === 0 && (
        <div className="textcenter">
          {generalInfo.theme === "starship" && (
            <p>
              No record of the {generalInfo.theme} "{generalInfo.name}" ever
              appearing in a film
            </p>
          )}
          {generalInfo.theme === "character" && (
            <p>No record of "{generalInfo.name}" ever appearing in a film</p>
          )}
        </div>
      )}
      {!loadFilms && filmListArr.length !== 0 && (
        <Wrapper>
          <div
            className={
              filmListArr.length < 5 ? "filmListWrapper" : "filmInfiniteScroll"
            }
          >
            {[...filmListContent]}
          </div>
        </Wrapper>
      )}
    </div>
  );
};

const Wrapper = styled.div`
  .filmListWrapper {
    display: flex;
    flex-direction: horizontal;
    justify-content: center;
  }

  .filmInfiniteScroll {
    display: flex;
    flex-direction: horizontal;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

export default FilmList;
