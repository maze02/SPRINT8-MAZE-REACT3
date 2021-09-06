//https://www.youtube.com/watch?v=NZKUirTtxcg
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StarshipsContext } from "../components/context/StarshipsContext";

//UPDATING STARSHIPSCONTEXT IN RELATION TO SCROLL
const useInfiniteScrollApi = (pageNumber, url) => {
  const ctx = useContext(StarshipsContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    //let cancel;
    const getMoreStarships = async () => {
      const resultNew = await axios({
        method: "GET",
        url: url,
        params: { page: pageNumber },
        //cancelToken: new axios.CancelToken((c) => (cancel = c)),
      });
      const resultWithId = ctx.addIdToArr(resultNew.data.results);
      ctx.setStarships((prevStarships) => {
        return [...prevStarships, ...resultWithId];
      }); //unsure whether res.data.results needs destructuring
      localStorage.set("starshipsArr", JSON.stringify(resultWithId));
      setHasMore(Number(resultNew.data.count) > 0);
      setLoading(false);
      console.log("hey test printing from hook new result" + resultWithId);
      console.log(ctx.starships);
    };
  }, [pageNumber, url]);

  return { loading, error, hasMore };
};

export default useInfiniteScrollApi;


