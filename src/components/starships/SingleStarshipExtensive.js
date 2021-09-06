
import styled from "styled-components";
import { Fragment, useContext, useState, useEffect } from "react";

import { StarshipExtensiveCtx } from "../context/StarshipsExtensiveCtx";

const SingleStarshipExtensive = ({ loadShip }) => {
  const ctx = useContext(StarshipExtensiveCtx);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("ship img error");
  }, [error]);
  let refreshFlag = ctx.refreshFlag;
  let singleShip = ctx.singleShip;
  let shipUrl = ctx.shipImgInfo;

  if (refreshFlag) {
    singleShip = JSON.parse(localStorage.getItem("singleShipObj"));
    shipUrl = localStorage.getItem("starshipImg");
  }

  return (
    <div>
      {loadShip && <p className="textcenter">Starship Loading....</p>}
      {!loadShip && singleShip && (
        <Fragment>
          <h1>{singleShip.name}</h1>

          <Wrapper>
            <div className="cardMain">
              {!error && (
                <img
                  className="imgMain"

                  type="url"
                  alt={"starship" + singleShip.name}
                  src={shipUrl}
                  onError={() => {
                    setError((prev) => true);
                  }}
                ></img>
              )}
              {error && (

                <p className="imgErrMain">

                  Image of {singleShip.name} starship is not available at this
                  moment
                </p>
              )}

              <ul className="info">

                <li>Model:{singleShip.model}</li>
                <li>Cost in credits:{singleShip.cost_in_credits}</li>
                <li>Manufacturer:{singleShip.manufacturer}</li>
                <li>Length:{singleShip["length"]}</li>
                <li>Speed:{singleShip.max_atmosphering_speed}</li>
                <li>Hyperdrive Rating:{singleShip.hyperdrive_rating}</li>
                <li>MGLT:{singleShip.MGLT}</li>
                <li>Cargo Capacity:{singleShip.cargo_capacity}</li>
                <li>Crew:{singleShip.crew}</li>
                <li>Passengers:{singleShip.passengers}</li>
              </ul>
            </div>

          </Wrapper>

        </Fragment>
      )}
    </div>
  );
};


const Wrapper = styled.div`
  display: flex;
  flex-direction: horizontal;
  justify-content: center;

  .cardMain {
    border-radius: 2px;
    background-color: #222222;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.8);
    width: 140rem !important;
    height: 40rem;
    display: grid;
    grid-template-columns: 5fr 3fr;
    margin-bottom: 2rem;
    border-radius: 0.7rem;
  }

  .imgErrMain {
    display: flex;
    text-align: center;
    margin-left: 25%;
    justify-content: center;
    align-items: center;
    width: 50%;
    align-self: center;
  }
  .imgMain {
    border-radius: 0.7rem 0rem 0rem 0.7rem;
    border-right: 0.3rem solid #3273c5;
    width: 50rem;
    height: 40rem;
    margin-right: 2rem;
    object-fit: cover;
  }

  .info {
    padding: auto 5rem auto 5rem;
    display: flex;
    flex-direction: column;
    color: #dadada;
    line-height: 3rem;
    justify-content: center;
  }
`;

export default SingleStarshipExtensive;
