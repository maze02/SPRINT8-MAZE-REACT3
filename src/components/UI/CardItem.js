import classes from "./Card.module.css";

const CardItem = ({ children, id, handleClickShip }) => {
  const clickShip = () => {
    handleClickShip(id);
  };
  return (
    <div className={classes.card} onClick={clickShip}>
      {children}
    </div>
  );
};

export default CardItem;

/*Initial version
const CardItem = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default CardItem;

Trial&Error2:
const CardItem = ({ children, id }) => {
  return (
    <div className={classes.card} onClick={() => alert(id)}>
      {children}
    </div>
  );
};


Trial&Error3:
<div className={classes.card} onClick={handleClickShip(id)}>
      {children}
    </div>


Trial&Error4:

const CardItem = ({ children, id, penguin }) => {
  const alerto = () => {
    alert(id);
    console.log(id);
  };

  const owl = () => {
    penguin(id);
  };
  return (
    <div className={classes.card} onClick={owl}>
      {children}
    </div>
  );
};
*/
