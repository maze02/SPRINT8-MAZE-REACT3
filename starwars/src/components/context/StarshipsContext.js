import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const StarshipsProvider = (props) => {
  const history = useHistory();
  const [starships, setStarships] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const addIdToArr = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === undefined) {
        arr[i].id = arr[i].url.substring(32, arr[i].url.length - 1);
        arr[i].apiPage = currentPage;
      }
    }
    return arr;
  };

  //CALLING API
  //FIRST CALL UPON LOAD
  useEffect(() => {
    let initialStarships = localStorage.getItem("starshipsArr");
    if (initialStarships) {
      let arr = JSON.parse(initialStarships);
      if ((arr[0].apiPage = 1)) {
        setStarships(arr);
      }
      return;
    } else {
      const getStarships = async () => {
        const shipsPerPage = 10;
        const url = `https://swapi.dev/api/starships/?page=${1}`;
        const result = await axios.get(url);
        console.log("result.data.results =" + result.data.results);
        console.log(
          "result.data.results[0].url =" + result.data.results[0].url
        );
        console.log(
          "result.data.results[0].url.substringphrase =" +
            result.data.results[0].url.substring(
              32,
              result.data.results[0].url.length - 1
            )
        );
        //console.log("printing from starship ctx, starships:" + result);
        const resultWithId = addIdToArr(result.data.results);

        setStarships(resultWithId);
        localStorage.setItem("starshipsArr", JSON.stringify(resultWithId));
        const calculateTotalPages = Math.ceil(result.data.count / shipsPerPage);
        console.log("total: " + result.data.count);
        setTotalPages(calculateTotalPages);
      };
      getStarships();
    }
  }, []);

  //HANDLE SECOND CALL TO API
  useEffect(() => {
    const getStarships = async () => {
      const shipsPerPage = 10;
      const url = `https://swapi.dev/api/starships/?page=${currentPage}`;
      const result = await axios.get(url);
      //console.log("printing from starship ctx, starships:" + result);
      const resultWithId = addIdToArr(result.data.results);
      setStarships(resultWithId);
      localStorage.setItem("starshipsArr", JSON.stringify(resultWithId));
      const calculateTotalPages = Math.ceil(result.data.count / shipsPerPage);
      setTotalPages(calculateTotalPages);
    };
    getStarships();
  }, [currentPage]);
  //HANDLE PREVIOUS PAGE
  const previousPage = () => {
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage === 0) return;
    setCurrentPage(newCurrentPage);
    console.log("oi clicking back page");
    console.log("oi new curr page =" + newCurrentPage);
    console.log("currentpage=" + currentPage);
  };
  //HANDLE NEXT PAGE
  const nextPage = () => {
    const newCurrentPage = currentPage + 1;
    if (newCurrentPage > totalPages) return;
    setCurrentPage(newCurrentPage);
    console.log("oi clicking next page");
    console.log("oi new curr page =" + newCurrentPage);
    console.log("currentpage=" + currentPage);
  };

  return (
    <StarshipsContext.Provider
      value={{
        starships: starships,
        setStarships: setStarships,
        currentPage: currentPage,
        setCurrentPage: setCurrentPage,
        totalPages: totalPages,
        setTotalPages: setTotalPages,
        previousPage: previousPage,
        nextPage: nextPage,
        history: history,
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

//forgetting to extra the results as an array from the api results caused function error

https://www.pluralsight.com/guides/typeerror-handling-in-react.js-for-map-function
*/
