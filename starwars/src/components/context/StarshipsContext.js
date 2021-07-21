import { createContext, useState, useEffect } from "react";
import axios from "axios";

const StarshipsProvider = (props) => {
  const [starships, setStarships] = useState(true);

  useEffect(() => {
    const getStarships = async () => {
      const url = "https://swapi.dev/api/starships";
      const result = await axios.get(url);
      //console.log("printing from starship ctx, starships:" + result);
      setStarships(result.data.results);
    };
    getStarships();
  }, []);

  return (
    <StarshipsContext.Provider value={{ starships: starships }}>
      {props.children}
    </StarshipsContext.Provider>
  );
};

export default StarshipsProvider;
export const StarshipsContext = createContext();

//MAria's most stupid errors!!!!:
/*
FORGETTING TO ADD A '.' between context and provider-> FOR GOODNESS SAKE!!!!

*/
