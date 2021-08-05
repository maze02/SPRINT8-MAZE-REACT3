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
                    setError((prev) => true);
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
