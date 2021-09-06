import { Fragment, useState } from "react";
import HorizontalCardItem from "../UI/HorizontalCardItem";
const ShipItem = ({ shipName, shipImg, crew, passengers, speed }) => {
  const [error, setError] = useState(false);
  return (
    <HorizontalCardItem>
      <div className="cardSubHor">
        {!error && (
          <img
            className="imgSubHor"
            type="url"
            src={shipImg}
            alt={shipName}
            onError={() => {
              setError(true);
            }}
          />
        )}
        {error && (
          <div className="imgErrSubHor">
            <p>Image of {shipName} unavailable</p>
          </div>
        )}
        <ul className="infoSubHor">
          <li className="infoName">{shipName.toUpperCase()}</li>
          <li>Crew: {crew} people</li>
          <li>Passengers: {passengers} people</li>
          <li>Speed: {speed}</li>
        </ul>
      </div>
    </HorizontalCardItem>
  );
};

export default ShipItem;
