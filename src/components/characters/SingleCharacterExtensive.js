
import styled from "styled-components";
import { Fragment, useContext, useState, useEffect } from "react";

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

          <WrapperMain>
            <div className="cardMain">
              {!error && (
                <img
                  className="imgMain"

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

              <ul className="info">

                <li>Name: {singleCharacter.name}</li>
                <li>Height: {Number(singleCharacter.height) / 100} m</li>
                <li>Eye color: {singleCharacter.eye_color}</li>
              </ul>
            </div>

          </WrapperMain>

        </Fragment>
      )}
    </div>
  );
};


const WrapperMain = styled.div`
  display: flex;
  flex-direction: horizontal;
  justify-content: center;

  .cardMain {
    border-radius: 2px;
    background-color: #222222;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.8);
    justify-content: center !important;
    width: 60rem;
    height: 40rem;
    display: grid;
    grid-template-columns: 1fr 3fr;
    margin-bottom: 2rem;
    border-radius: 0.7rem;
  }

  .imgMain {
    border-radius: 0.7rem 0rem 0rem 0.7rem;
    border-right: 0.3rem solid #3273c5;
    width: auto;
    height: 40rem;
    margin-right: 2rem;
    object-fit: cover;
  }

  .info {
    padding-left: 3rem;
    display: flex;
    flex-direction: column;
    color: #dadada;
    line-height: 3rem;
    justify-content: center;
  }
`;
export default SingleCharacterExtensive;

