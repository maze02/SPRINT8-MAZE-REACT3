//https://www.youtube.com/watch?v=GVDiw3lAyp0
import { useContext, useState, useRef, useCallback } from "react";

import { StarshipsContext } from "../context/StarshipsContext";
import { StarshipExtensiveCtx } from "../context/StarshipsExtensiveCtx";
import StarshipList from "../starships/StarshipList";

//import useInfiniteScroll from "react-infinite-scroll-hook";

const AllStarshipsPage = () => {
  const ctx = useContext(StarshipsContext);
  const shipCtx = useContext(StarshipExtensiveCtx);
  const starshipsArr = ctx.starships;
  //const lastStarshipRef = useRef();

  return (
    <div>
      <h1>Here's a list of starships</h1>
      <StarshipList
        starshipsArr={starshipsArr}
        handleClickShip={shipCtx.handleClickShip}
      />
      <div>
        <h1>hello</h1>
        {ctx.currentPage === 1 ? null : (
          <button type="button" onClick={ctx.previousPage}>
            &#9204; Previous
          </button>
        )}
        {ctx.currentPage === ctx.totalPages ? null : (
          <button type="button" onClick={ctx.nextPage}>
            Next &#9205;
          </button>
        )}
      </div>
    </div>
  );
};

export default AllStarshipsPage;
//     {[...starshipList]}
//Maria's most Balenciaga errors:
/*
1. FORGETTING TO ADD {} when IMPORTING THE CONTExT ARRRRRGH!

2. Forgot to add () to wrap the generated list of elements after return in the list =  arr.map(e=>return(<penguin name=balba>))
*/
