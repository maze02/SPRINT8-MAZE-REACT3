import classes from "./FilmItem.module.css";
const FilmItem = ({ title, release_date, filmImg }) => {
  return (
    <div className={classes.cardFilm}>
      <img className={classes.imgFilm} type="url" src={filmImg} alt={title} />
      <ul className={classes.info}>
        <li>"{title.toUpperCase()}"</li>
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


