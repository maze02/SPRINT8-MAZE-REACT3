const PilotItem = ({ pilotName, height, planet }) => {
  return (
    <div>
      <h4>Penguin Pogi {pilotName}</h4>
      <p>10m tall {height}</p>
      <p>Planet Nori {planet}</p>
    </div>
  );
};

export default PilotItem;
