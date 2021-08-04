import classes from "./Card.module.css";

const CardItem = ({ children, id, pressed }) => {
  const clickItem = () => {
    pressed(id);
  };
  return (
    <div className={classes.card} onClick={clickItem}>
      {children}
    </div>
  );
};

export default CardItem;

