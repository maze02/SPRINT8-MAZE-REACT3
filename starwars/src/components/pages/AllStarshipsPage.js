import { useContext } from "react";
import StarshipBrief from "../starships/StarshipBrief";
import { StarshipsContext } from "../context/StarshipsContext";

const AllStarshipsPage = () => {
  const ctx = useContext(StarshipsContext);
  const starshipsArr = ctx.starships;
  console.log(starshipsArr);
  const starshipList = starshipsArr.map((element) => {
    return (
      <StarshipBrief
        key={element.id}
        id={element.id}
        name={element.name}
        model={element.model}
        handleClickShip={ctx.handleClickShip}
      />
    );
  });

  return (
    <div>
      <h1>Here's a list of starships</h1>
      {[...starshipList]}
    </div>
  );
};

export default AllStarshipsPage;

//MAria's most stupid errors!!!!:
/*
1. FORGETTING TO ADD {} when IMPORTING THE CONTExT ARRRRRGH!

2. Forgot to add () to wrap the generated list of elements after return in the list =  arr.map(e=>return(<penguin name=balba>))
*/
