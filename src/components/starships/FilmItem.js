const FilmItem = ({ title, release_date }) => {
  return (
    <ul>
      <li>{title}</li>
      <li>{release_date}</li>
    </ul>
  );
};

export default FilmItem;
//<li>{planet}</li>
/* planet is a URL
would have to do an other API call
*/
