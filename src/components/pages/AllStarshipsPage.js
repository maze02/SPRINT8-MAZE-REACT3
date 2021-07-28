//https://www.youtube.com/watch?v=GVDiw3lAyp0
import { useContext } from "react";

import { StarshipsContext } from "../context/StarshipsContext";
import { StarshipExtensiveCtx } from "../context/StarshipsExtensiveCtx";
import StarshipList from "../starships/StarshipList";

//import useInfiniteScroll from "react-infinite-scroll-hook";

const AllStarshipsPage = () => {
  const ctx = useContext(StarshipsContext);
  const shipCtx = useContext(StarshipExtensiveCtx);
  const starshipsArr = ctx.starships;

  return (
    <div className="container-wrapper">
      <h1>Here's a list of starships</h1>
      {ctx.pageLoad && <p>Loading starships...</p>}
      {!ctx.pageLoad && starshipsArr.length !== 0 && (
        <StarshipList
          starshipsArr={starshipsArr}
          handleClickShip={shipCtx.handleClickShip}
        />
      )}
      <div>
        {ctx.currentPage === 1 ? null : (
          <button
            className="btn btn-secondary btn-page btn-gap"
            type="button"
            onClick={ctx.previousPage}
          >
            &#9204; Previous
          </button>
        )}
        {ctx.currentPage === ctx.totalPages ? null : (
          <button
            type="button"
            className="btn btn-secondary btn-page"
            onClick={ctx.nextPage}
          >
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
