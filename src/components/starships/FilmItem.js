import classes from "./FilmItem.module.css";
const FilmItem = ({ title, release_date, filmImg }) => {
  return (
    <div className={classes.cardFilm}>
      <img className={classes.imgFilm} type="url" src={filmImg} alt={title} />
      <ul>
        <li>{title}</li>
        <li>{release_date}</li>
      </ul>
    </div>
  );
};

export default FilmItem;
//<li>{planet}</li>
/* planet is a URL
would have to do an other API call
*/

/*

const FilmItem = ({ title, release_date, filmImg }) => {
  return (
    <div className={classes.cardFilm}>
      <img
        className={classes.imgFilm}
        type="url"
        src={filmImg}
        alt={"film poster of the film: " + title}
      />
      <ul>
        <li>{title}</li>
        <li>{release_date}</li>
      </ul>
    </div>
  );
};
*/
/*"film poster of the film: " +*/
