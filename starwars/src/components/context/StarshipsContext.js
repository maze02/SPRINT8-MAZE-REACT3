import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StarshipsContext = createContext();

const StarshipsProvider = (props) => {
  const [starships, setStarships] = useState([]);
  /*
  useEffect(() => {
    const getStarships = async () => {
      const url = "https://swapi.dev/api/starships";

      // const starships = await axios.get(url);

      //console.log(starships.results);
      // setStarships(starships);
    };
    getStarships();
  }, []);
*/
  return (
    <StarshipsProvider>
      value=
      {{
        starships,
      }}
      {props.children}
    </StarshipsProvider>
  );
};

export default StarshipsProvider;
