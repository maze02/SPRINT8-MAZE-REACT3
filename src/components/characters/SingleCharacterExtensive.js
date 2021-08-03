import { Fragment, useContext, useState, useEffect } from "react";
import classes from "./SingleCharacterExtensive.module.css";
import { CharacterDetailCtx } from "../context/CharactersDetailContext";
/*starwars official site:https://www.starwars.com/databank/droid-gunship*/
const SingleCharacterExtensive = () => {
  const ctx = useContext(CharacterDetailCtx);
  const [error, setError] = useState(false);
  let characterUrl = ctx.characterImgInfo;
  useEffect(() => {
    console.log("ERROR: unable to load image for the film");
  }, [error]);
  return (
    <div>
      {ctx.loadCharacter && <p>Character Loading....</p>}
      {!ctx.loadCharacter && ctx.singleCharacter && (
        <Fragment>
          <h1>CHARACTER FACT SHEET</h1>
          <div className={classes.wrapperMain}>
            <div className={classes.cardMain}>
              {!error && (
                <img
                  className={classes.imgMain}
                  type="url"
                  alt={"starship" + ctx.singleCharacter.name}
                  src={characterUrl}
                  onError={() => {
                    setError(true);
                  }}
                ></img>
              )}
              {error && (
                <p>
                  Image of {ctx.singleCharacter.name} is not available at this
                  moment
                </p>
              )}
              <ul className={classes.info}>
                <li>Name: {ctx.singleCharacter.name.toUpperCase()}</li>
                <li>Height: {Number(ctx.singleCharacter.height) / 100} m</li>
                <li>Eye color: {ctx.singleCharacter.eye_color}</li>
              </ul>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};
export default SingleCharacterExtensive;

/*        <li>Length:{starships[props.id]["length"]}</li> */

/*
<const SingleStarshipExtensive = () => {
  const { starships } = useContext(StarshipsContext);

  const params = useParams();
  const id = Number(params.starshipId.substring(1));
  //prints :1 so remove ':' with substring;
  console.log(id);
  console.log(typeof id);
  console.log("starships: " + starships[0].name);
  console.log(typeof starships[0]);

  return (
    <div>
      <h2>Here there'll be an image</h2>
      <h1>{starships[id].name}</h1>
      <ul>
        <li>Model:{starships[id].model}</li>
        <li>Cost in credits:{starships[id].cost_in_credits}</li>
        <li>Manufacturer:{starships[id].manufacturer}</li>
        <li>Length:{starships[id]["length"]}</li>
        <li>Speed:{starships[id].max_atmosphering_speed}</li>
        <li>Hyperdrive Rating:{starships[id].hyperdrive_rating}</li>
        <li>MGLT:{starships[id].MGLT}</li>
        <li>Cargo Capacity:{starships[id].cargo_capacity}</li>
        <li>Crew:{starships[id].crew}</li>
        <li>Passengers:{starships[id].passengers}</li>
      </ul>
    </div>
  );
};

export default SingleStarshipExtensive;
*/

/*
  //const params = useParams();
  //const id = Number(params.starshipId.substring(1));
  //prints :1 so remove ':' with substring;
  // console.log(id);
  //console.log(typeof id);
  // console.log("starships: " + starships[0].name);
  //console.log(typeof starships[0]);
  */
