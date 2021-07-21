import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const StarshipsProvider = (props) => {
  const history = useHistory();
  const [starships, setStarships] = useState(true);
  const [singleShip, setSingleShip] = useState();

  //CALLING API

  const addIdToArr = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === undefined) {
        arr[i].id = i;
      }
    }
    return arr;
  };

  useEffect(() => {
    let initialStarships = localStorage.getItem("starshipsArr");
    if (!initialStarships) {
      const getStarships = async () => {
        const url = "https://swapi.dev/api/starships";
        const result = await axios.get(url);
        //console.log("printing from starship ctx, starships:" + result);
        const resultWithId = addIdToArr(result.data.results);
        setStarships(resultWithId);
        localStorage.setItem("starshipsArr", JSON.stringify(resultWithId));
      };
      getStarships();
    } else {
      setStarships(JSON.parse(initialStarships));
    }
  }, []);

  //HANDLING CLICK OF INDIVIDUAL SHIP
  const handleClickShip = (e) => {
    console.log(e.target.id);
    setSingleShip(e.target.id);
    //history.replace("/home");
    history.push(`/starship-detail/:${e.target.id}`);
  };

  return (
    <StarshipsContext.Provider
      value={{
        starships: starships,
        handleClickShip: handleClickShip,
      }}
    >
      {props.children}
    </StarshipsContext.Provider>
  );
};

export default StarshipsProvider;
export const StarshipsContext = createContext();

//Maria's Chanel errors!!!!:
/*
FORGETTING TO ADD A '.' between context and provider-> FOR GOODNESS SAKE!!!!

*/
