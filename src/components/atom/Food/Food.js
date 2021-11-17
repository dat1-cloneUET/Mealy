import React, { useEffect, useState } from "react";
import styles from "./Food.module.scss";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import HistoryButton from "../HistoryButton/HistoryButton";
import { getComment, sendComment, getAllFood } from "../../../GraphQL/query";
import { useAuth } from "../../context/AuthProvider";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useLoader } from "../../context/LoaderProvider";
import { useBooking }  from '../../context/BookingProvider'
function Food({ type, name, price, id }) {
  const { addItem }= useBooking();
  const [open, setOpen] = React.useState(false);
  const [comments, setComments] = useState([]);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  // const addItem = () => {
  //   addItem(id);
  // };
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
    default:
      header = styles.header_chicken;
      break;
  }
  useEffect(() => {
    getComment(id).then((res) => {
      const { data, message } = res.data.comment;
      if (message === "success") setComments(data);

    });
  }, []);
  return (
    <div className={styles.mainComponent}>
      <div className={header}>
        <img
          src={`image/svg/foodIcon/${type}-active.svg`}
          alt=""
          className={styles.img}
        />
        <p className={styles.name}>{name}</p>
        <p className={styles.price}>{`${new Intl.NumberFormat().format(price)}đ`}</p>
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
      <CommentDialog
        open={open}
        handleClose={handleClose}
        data={comments}
        id={id}
        setData={setComments}
      />
    </div>
  );
}

export default Food;

function CommentDialog(props) {
  const { handleClose, open, data, id, setData } = props;
  const [write, setWrite] = useState("");
  const { currentUser } = useAuth();
  const history = useHistory();
  const { turnOnLoader, turnOffLoader } = useLoader();
  const handleSend = () => {
    if (!currentUser) history.push("/login");
    else {
      turnOnLoader();
      sendComment(id, write, currentUser)
        .then((res) => {
          if (res.data.addComment.message === "success"){
            // console.log([res.data.addComment.data[0],...data])
          setData([res.data.addComment.data[0],...data]);
          }
          
        })
        .finally(() => turnOffLoader());
    }
  };
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      className={styles.componentDialog}
    >
      <DialogTitle className={styles.dialogTitle}>Comment</DialogTitle>
      <div className={styles.comment}>
        <textarea
          placeholder={"Add your comment here"}
          value={write}
          onChange={(e) => setWrite(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
        <div className={styles.listComment}>
          {data.map((item, key) => (
            <Comment
              key={item.id}
              username={item.username}
              content={item.content}
              time={item.time}
            />
          ))}
        </div>
      </div>
    </Dialog>
  );
}
function Comment({ username, content, time }) {
  return (
    <div className={styles.singleComment}>
      <div>
        <p className={styles.name1}>{username}</p>
        <p className={styles.time}>
          {moment(parseInt(time)).format("LT DD-MM-YYYY")}
        </p>
      </div>
      <p className={styles.com}>{content}</p>
    </div>
  );
}
