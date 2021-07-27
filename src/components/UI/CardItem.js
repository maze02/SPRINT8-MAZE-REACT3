import classes from "./Card.module.css";

const CardItem = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default CardItem;
