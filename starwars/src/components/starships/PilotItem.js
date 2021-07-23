const PilotItem = ({ pilotName, height, planet }) => {
  return (
    <ul>
      <li>{pilotName}</li>
      <li>{height}</li>
    </ul>
  );
};

export default PilotItem;
//<li>{planet}</li>
/* planet is a URL
would have to do an other API call
*/
