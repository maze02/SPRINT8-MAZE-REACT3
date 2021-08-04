import FilmItem from "./FilmItem";
import classes from "./FilmList.module.css";
//only rerenders if state, props changes
const FilmList = ({ filmListArr, loadFilms, filmImgInfo, generalInfo }) => {
  if (loadFilms) {
    return <p>Films loading ...</p>;
  } else {
    if (!loadFilms) {
      let filmListLocal = localStorage.getItem("films");
      let filmListImgs = localStorage.getItem("filmImgs");
      if (filmListLocal) {
        filmListArr = JSON.parse(filmListLocal);
        let filmImgArr = JSON.parse(filmListImgs);
        for (let i = 0; i < filmListArr.length; i++) {
          if (filmListArr[i].img === undefined) {
            filmListArr[i].img = filmImgArr[i];
          }
        }
      }

      if (filmListArr.length === 0) {
        return <p>No record of this {generalInfo.theme} appearing in a film</p>;
      } else {
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
          </div>
        );
      }
    }
  }
};

export default FilmList;

