import React, { useEffect, useLayoutEffect, useState } from "react";
import styles from "../PaymentScreen/PaymentScreen.module.scss";
import HistoryButton from "../../atom/HistoryButton/HistoryButton";
import InfoPair from "../../atom/InfoPair/InfoPair";
import Receipt from "../../atom/Receipt/Receipt";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useLoader } from "../../context/LoaderProvider";
import { getAllFood } from "../../../GraphQL/query";
import url from "../../../BE.config";
import axios from "axios";
import moment from "moment";
import _ from "lodash";
function HistoryScreen() {
  const history = useHistory();
  const [switchScreen, setSwitchScreen] = useState(false);
  const [info, setInfo] = useState("flex");
  const [his, setHis] = useState("flex");
  const [listHistory, setListHistory] = useState([]);
  const [currentHistory, setCurrentHistory] = useState();
  const [list, setList] = useState([]);
  const { currentUser } = useAuth();
  const [total, setTotal] = useState(0);
  const { turnOnLoader, turnOffLoader } = useLoader();
  useEffect(() => {
    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      // console.log(width);
      if (width > 1024) {
        setHis("flex");
        setInfo("flex");
      } else {
        setHis("block");
        setInfo("none");
      }
    });
  }, []);
  useLayoutEffect(() => {
    const width = window.innerWidth;
    if (width > 1024) {
      setHis("flex");
      setInfo("flex");
    } else {
      setHis("block");
      setInfo("none");
    }
  }, []);
  useEffect(() => {
    turnOnLoader();
    axios
      .post(
        url.concat("/api/auth/getOrder"),
        {},
        {
          headers: {
            token: currentUser,
          },
        }
      )
      .then((res) => {
        if (res.data.message === "success") {
          let data= res.data.data;
          data.sort((a,b) => {
            if(a.time > b.time) return -1;
            if(a.time < b.time) return 1;
            return 0;
          })
          setListHistory(data);
        }
      })
      .finally(turnOffLoader);
  }, [currentUser]);
  useEffect(() => {
    getAllFood().then((res) => {
      const { message, data } = res.data.food;
      if (message === "success") setList(data);
    });
  }, []);
  const handleSwitch = () => {
    if (his === "block") {
      setInfo("block");
      setHis("none");
    } else {
      setInfo("none");
      setHis("block");
    }
  };
  const renderCart = () => {
    if (list.length === 0) return;
    let cart2 = [];
    listHistory[currentHistory].listFood.forEach((item) => {
      let obj = list.find((i) => i.id === item.id);
      cart2.push(
        <Receipt
          key={obj.id}
          type={obj.type}
          name={obj.food_name}
          number={item.number}
          price={obj.price}
          id={obj.id}
        />
      );
    });
    return cart2;
  };
  useEffect(() => {
    if (list.length === 0 || _.isNil(currentHistory)) return;
    let price = 0;
    listHistory[currentHistory].listFood.forEach((item) => {
      let obj = list.find((i) => i.id === item.id);
      price = price + parseInt(obj.price) * item.number;
    });
    setTotal(price);
  }, [currentHistory, list]);
  return (
    <motion.div
      initial={{ opacity: 0.4, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.mainComponent}
    >
      <div
        className={styles.information}
        style={info ? { display: info } : { display: "none" }}
      >
        <div className={styles.information_listFood}>
          <div className={styles.head}>
            <div className={styles.information_manageButton}>
              <img
                src="image/svg/back.svg"
                className={styles.backk}
                onClick={handleSwitch}
              />
              <img
                src="image/svg/next.svg"
                className={styles.next}
                onClick={() => setSwitchScreen(!switchScreen)}
              />
            </div>

            <p className={styles.confirmation}>Confirmation</p>
          </div>
          <div className={styles.scroll}>
            {!_.isNil(currentHistory) && renderCart()}
          </div>
        </div>

        <div className={styles.information_total}>
          <div className={styles.information_headerdiv}>
            <InfoPair
              keyy={"Name"}
              value={
                !_.isNil(currentHistory) &&
                listHistory[currentHistory].receiveName
              }
            />
            <InfoPair
              keyy={"Address"}
              value={
                !_.isNil(currentHistory) &&
                listHistory[currentHistory].receiveAddress
              }
            />
            <InfoPair
              keyy={"Phone number"}
              value={
                !_.isNil(currentHistory) &&
                listHistory[currentHistory].receivePhone
              }
            />
          </div>
          <div className={styles.information_footerdiv}>
            <InfoPair keyy={"Discount"} value={"$0"} />
            <InfoPair
              keyy={"Sub total"}
              value={`${
                isNaN(total) ? "" : new Intl.NumberFormat().format(total)
              }đ`}
            />
          </div>
        </div>
      </div>

      <div className={styles.history} style={{ display: his }}>
        <img
          src="image/svg/back.svg"
          className={styles.historyBack}
          onClick={handleSwitch}
          style={{ marginLeft: 17, marginBottom: 10, marginTop: 10 }}
        />
        {listHistory.map((item, index) => {
          return (
            <HistoryButton
              key={index}
              time={moment(parseInt(item.time)).format("LT DD-MM-YYYY")}
              active={index === currentHistory}
              click={() => setCurrentHistory(index)}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

export default HistoryScreen;
