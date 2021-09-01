import { Fragment, useContext, useState, useEffect } from "react";
import classes from "./SingleCharacterExtensive.module.css";
import { CharacterDetailCtx } from "../context/CharactersDetailContext";
/*starwars official site:https://www.starwars.com/databank/droid-gunship*/
const SingleCharacterExtensive = ({ loadCharacter }) => {
  const ctx = useContext(CharacterDetailCtx);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("ERROR: unable to load image for the film");
  }, [error]);

  let refreshFlag = ctx.refreshFlag;
  let singleCharacter = ctx.singleCharacter;
  let characterUrl = ctx.characterImgInfo;

  if (refreshFlag) {
    singleCharacter = JSON.parse(localStorage.getItem("singleCharacterObj"));
    characterUrl = JSON.parse(localStorage.getItem("characterImg"));
  }

  return (
    <div>
      {loadCharacter && <p className="textcenter">Character Loading....</p>}
      {!loadCharacter && singleCharacter && (
        <Fragment>
          <h1>CHARACTER FACT SHEET</h1>
          <div className={classes.wrapperMain}>
            <div className={classes.cardMain}>
              {!error && (
                <img
                  className={classes.imgMain}
                  type="url"
                  alt={"starship" + singleCharacter.name}
                  src={characterUrl}
                  onError={() => {
                    setError((prev) => true);
                  }}
                ></img>
              )}
              {error && (
                <p>
                  Image of {singleCharacter.name} is not available at this
                  moment
                </p>
              )}
              <ul className={classes.info}>
                <li>Name: {singleCharacter.name}</li>
                <li>Height: {Number(singleCharacter.height) / 100} m</li>
                <li>Eye color: {singleCharacter.eye_color}</li>
              </ul>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};
export default SingleCharacterExtensive;


