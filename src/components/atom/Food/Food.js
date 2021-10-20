import React from "react";
import styles from "./Food.module.scss";
// import { useBooking } from '../../context/BookingProvider';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import HistoryButton from "../HistoryButton/HistoryButton";
function Food({ type, name, price, id }) {
  // const { addItem }= useBooking();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const addItem = () => {};
  var header;
  switch (type) {
    case "pizza":
      header = styles.header_pizza;
      break;
    case "burger":
      header = styles.header_burger;
      break;
    case "sandwitch":
      header = styles.header_sandwitch;
      break;
    case "pasta":
      header = styles.header_noodle;
      break;
    case "desert":
      header = styles.header_fries;
      break;
    case "chicken":
      header = styles.header_chicken;
      break;
  }
  return (
    <div className={styles.mainComponent}>
      <div className={header}>
        <img
          src={`image/svg/foodIcon/${type}-active.svg`}
          alt=""
          className={styles.img}
        />
        <p className={styles.name}>{name}</p>
        <p className={styles.price}>{`$${price}`}</p>
      </div>
      <div className={styles.footer}>
        <img
          src={"image/svg/add.svg"}
          alt=""
          className={styles.icon}
          onClick={() => addItem(id)}
        />
        <img
          src={"image/svg/comment.svg"}
          alt=""
          className={styles.icon}
          onClick={handleOpen}
        />
      </div>
      <CommentDialog open={open} handleClose={handleClose} />
    </div>
  );
}

export default Food;

function CommentDialog(props) {
  const { handleClose, open } = props;

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      className={styles.componentDialog}
    >
      <DialogTitle className={styles.dialogTitle}>Comment</DialogTitle>
      <div className={styles.comment}>
        <textarea placeholder={"Add your comment here"} />
        <button>Send</button>
        <div className={styles.listComment}>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
      </div>
    </Dialog>
  );
}
function Comment(props) {
  return (
    <div className={styles.singleComment}>
      <div>
        <p className={styles.name1}>Name</p>
        <p className={styles.time}>2PM 20-10-2021</p>
      </div>
      <p className={styles.com}>Comment</p>
    </div>
  );
}
