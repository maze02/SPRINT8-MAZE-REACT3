import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const StarshipsProvider = (props) => {
  const history = useHistory();
  const [starships, setStarships] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageLoad, setPageLoad] = useState(false);

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
    if (!initialStarships) {
      initialStarships = [];
    }
    if (initialStarships && initialStarships.length) {
      let arr = [...JSON.parse(initialStarships)];
      console.log(arr);
      if (arr[0].apiPage === 1) {
        setStarships(arr);
      }
      return;
    } else {
      const getStarships = async () => {
        setPageLoad(true);

        const shipsPerPage = 10;
        const url = `https://swapi.dev/api/starships/?page=1`;
        const result = await axios.get(url);
        const resultWithId = await addIdToArr(result.data.results);

        setStarships(resultWithId);
        localStorage.setItem("starshipsArr", JSON.stringify(resultWithId));

        const calculateTotalPages = Math.ceil(result.data.count / shipsPerPage);
        console.log("total: " + result.data.count);
        setTotalPages(calculateTotalPages);
        setPageLoad(false);
      };
      getStarships();
    }
  }, []);

  //HANDLE SECOND CALL TO API
  useEffect(() => {
    const getStarships = async () => {
      setPageLoad(true);
      const shipsPerPage = 10;
      const url = `https://swapi.dev/api/starships/?page=${currentPage}`;
      const result = await axios.get(url);
      const resultWithId = addIdToArr(result.data.results);
      setStarships(resultWithId);
      localStorage.setItem("starshipsArr", JSON.stringify(resultWithId));
      const calculateTotalPages = Math.ceil(result.data.count / shipsPerPage);
      setTotalPages(calculateTotalPages);
      setPageLoad(false);
    };

    getStarships();
  }, [currentPage]);

  //HANDLE PREVIOUS PAGE
  const previousPage = () => {
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage === 0) return;
    setCurrentPage(newCurrentPage);
    console.log("hey clicking back page");
    console.log("hey new curr page =" + newCurrentPage);
    console.log("currentpage=" + currentPage);
  };
  //HANDLE NEXT PAGE
  const nextPage = () => {
    const newCurrentPage = currentPage + 1;
    if (newCurrentPage > totalPages) return;
    setCurrentPage(newCurrentPage);
    console.log("hey clicking next page");
    console.log("hey new curr page =" + newCurrentPage);
    console.log("currentpage=" + currentPage);
  };

  return (
    <StarshipsContext.Provider
      value={{
        starships: starships,
        pageLoad: pageLoad,
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
