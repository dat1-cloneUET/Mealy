import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import PaymentMethodButton from "../../atom/PaymentMethodButton/PaymentMethodButton";
import styles from "./PaymentScreen.module.scss";
import { motion } from "framer-motion";
import InfoPair from "../../atom/InfoPair/InfoPair";
import Receipt from "../../atom/Receipt/Receipt";
import { useHistory } from "react-router";
// import { useBooking } from '../../context/BookingProvider'
import { useAuth } from "../../context/AuthProvider";
// import { firestore } from '../../../firebase';
// import firebase from '../../../firebase';
import { useLoader } from "../../context/LoaderProvider";
import axios from "axios";
function PaymenScreen() {
  const [method, setMethod] = useState([true, false, false]);
  const handleChangeMethod = (val) => {
    let exp = [false, false, false];
    exp[val] = true;
    setMethod(exp);
  };
  const history = useHistory();
  const [switchScreen, setSwitchScreen] = useState(false);
  const [info, setInfo] = useState("flex");
  const [pay, setPay] = useState(true);
  const [list, setList] = useState();
  // const { listItem, cart, deleteItem, deleteAllItem } = useBooking();
  const { currentUser, genMomoUrl } = useAuth();
  const { turnOnLoader, turnOffLoader } = useLoader();
  const [receivename, setReceivename] = useState("");
  const [receiveaddress, setReceiveaddress] = useState("");
  const [receivephone, setReceivephone] = useState("");
  const [total, setTotal] = useState(0);
  const [receivenameRef, setReceivenameRef] = useState("");
  const [receiveaddressRef, setReceiveaddressRef] = useState("");
  const [receivephoneRef, setReceivephoneRef] = useState("");
  useEffect(() => {
    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      // console.log(width);
      if (width > 1024) {
        setPay(true);
        setInfo("flex");
      } else {
        setPay(false);
        setInfo("block");
      }
    });
  }, []);
  useLayoutEffect(() => {
    const width = window.innerWidth;
    // console.log(width);
    if (width > 1024) {
      setPay(true);
      setInfo("flex");
    } else {
      setPay(false);
      setInfo("block");
    }
  }, []);
  const handlePayment = () => {
    if (!pay) setInfo("none");
    else setInfo("block");
    setPay(!pay);
  };
  const renderCart = () => {
    // let cart2=[];
    // for (let [key, value] of Object.entries(cart)) {
    //     let obj= listItem.find(item => item.id == key);
    //     cart2.push( <Receipt key={obj.id} type={obj.type}
    //                         name={obj.name} number={value}
    //                         price={obj.price} onDelete={() => deleteItem(key)}
    //                         id={key}
    //                         tatic={false}
    //                         />)
    //   }
    // // setTotal(price);
    // return cart2;
  };
  // useEffect(() => {
  //     let price=0;
  //     for (let [key, value] of Object.entries(cart)) {
  //         let obj= listItem.find(item => item.id == key);
  //         price= price + obj.price * parseInt(value);
  //         // console.log(price);
  //       }
  //       setTotal(price);
  // },[cart])

  const cancelOrder = () => {
    setReceiveaddress("");
    setReceivename("");
    setReceivephone("");
    // deleteAllItem();
    history.push("/");
  };
  const confirmOrder = async () => {
    // if(!currentUser ) history.push("/login");
    // else
    //     if(Object.keys(cart).length === 0) history.push("/order");
    // else if(receivename ==="" || receiveaddress ==="" || receivephone ===""){
    //     if(receivename ==="") setReceivenameRef("x");
    //     if(receiveaddress ==="") setReceiveaddressRef("x");
    //     if(receivephone ==="") setReceivephoneRef("x");
    //     return ;
    // }
    // else {
    //     turnOnLoader();
    //     firestore.collection("History").add({
    //         userId: currentUser.user.uid,
    //         order: cart,
    //         time: firebase.firestore.Timestamp.now(),
    //         receivename,
    //         receiveaddress,
    //         receivephone
    //     }).then(() =>{
    //         turnOffLoader();
    //         cancelOrder();
    //     }).catch(err => console.log(err));
    // }
  };
  useEffect(() => {
    const url = localStorage.getItem("urlMomo");
    axios
      .get('https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT1pJM1YyMDIxMTEwNHxNT01PWkkzVjIwMjExMTA0MTYzNjAxODIwNjcxOA==', {

      })
      .then((res) => {
        if(`${res.data}`.includes('<p>Giao dịch đã hết hạn.</p>'))
            console.log(true)
      })
      .catch((err) => {
        console.log('fd');
      });
  },[]);
  const confirmOrderMomo = () => {
    turnOnLoader();
    genMomoUrl(100000)
      .then((res) => {
        if (res.data.message === "success") {
          window.open(res.data.url);
          localStorage.setItem("urlMomo", res.data.url);
        }
      })
      .finally(() => turnOffLoader());
  };
  return (
    <motion.div
      initial={{ opacity: 0.4, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.mainComponent}
    >
      <div className={styles.information} style={{ display: info }}>
        <div className={styles.information_listFood}>
          <div className={styles.head}>
            <div className={styles.information_manageButton}>
              <img
                src="image/svg/back.svg"
                className={styles.back}
                onClick={() => history.push("/")}
              />
              <img
                src="image/svg/next.svg"
                className={styles.next}
                onClick={handlePayment}
              />
            </div>
            <p className={styles.confirmation}>Confirmation</p>
          </div>
          <div className={styles.scroll}>{renderCart()}</div>
        </div>
        <div className={styles.information_total}>
          <div className={styles.information_footerdiv}>
            <InfoPair keyy={"Discount"} value={"0"} />
            <InfoPair
              keyy={"Sub total"}
              value={`$${isNaN(total) ? "" : total.toFixed(2)}`}
            />
          </div>
        </div>
      </div>

      <div
        className={styles.payment}
        style={pay ? { display: "flex" } : { display: "none" }}
      >
        <div style={{ alignSelf: "center", flexDirection: "column" }}>
          <div
            className={styles.payment_header}
            style={{ justifyContent: "space-between" }}
          >
            <p>Payment</p>
            <img
              src="/image/svg/back.svg"
              alt=""
              className={styles.payment_back}
              onClick={handlePayment}
            />
          </div>
          <div className={styles.payment_all}>
            <p className={styles.payment_paymentMethod}>Payment method</p>
            <div className={styles.payment_listMethod}>
              <PaymentMethodButton
                active={method[0]}
                type="Direct"
                handleChangeMethod={() => handleChangeMethod(0)}
              />
              <PaymentMethodButton
                active={method[1]}
                type="Momo"
                handleChangeMethod={() => handleChangeMethod(1)}
              />
              <PaymentMethodButton
                active={method[2]}
                type="Paypal"
                handleChangeMethod={() => handleChangeMethod(2)}
              />
            </div>
          </div>

          {method[0] ? (
            <div style={{ flexDirection: "column" }}>
              <lablel className={styles.payment_label}>Receive Name</lablel>
              <input
                className={
                  receivenameRef === ""
                    ? styles.payment_input
                    : styles.payment_input_warning
                }
                type="text"
                placeholder="EX: Eimi Fudaka"
                onChange={(e) => setReceivename(e.target.value)}
                onBlur={() => {
                  if (receivename === "") setReceivenameRef("x");
                }}
                onFocus={() => {
                  setReceivenameRef("");
                }}
              />
              <lablel className={styles.payment_label}>Address</lablel>
              <input
                className={
                  receiveaddressRef === ""
                    ? styles.payment_input
                    : styles.payment_input_warning
                }
                type="text"
                placeholder="EX: 1st, Ha Huy Tap, Ha Tinh"
                onChange={(e) => setReceiveaddress(e.target.value)}
                onBlur={() => {
                  if (receiveaddress === "") setReceiveaddressRef("x");
                }}
                onFocus={() => {
                  setReceiveaddressRef("");
                }}
              />
              <lablel className={styles.payment_label}>Phone number</lablel>
              <input
                className={
                  receivephoneRef === ""
                    ? styles.payment_input
                    : styles.payment_input_warning
                }
                type="text"
                placeholder="EX: 12345678"
                onBlur={() => {
                  if (receivephone === "") setReceivephoneRef("x");
                }}
                onFocus={() => {
                  setReceivephoneRef("");
                }}
                onChange={(e) => {
                  setReceivephone(e.target.value);
                }}
              />
              <div className={styles.button}>
                <button className={styles.button_cancel} onClick={cancelOrder}>
                  Cancel
                </button>
                <button
                  className={styles.button_confirm}
                  onClick={confirmOrder}
                >
                  Confirm Payment
                </button>
              </div>
            </div>
          ) : method[1] ? (
            <div style={{ flexDirection: "column" }}>
              <lablel className={styles.payment_label}>Receive Name</lablel>
              <input
                className={
                  receivenameRef === ""
                    ? styles.payment_input
                    : styles.payment_input_warning
                }
                type="text"
                placeholder="EX: Eimi Fudaka"
                onChange={(e) => setReceivename(e.target.value)}
                onBlur={() => {
                  if (receivename === "") setReceivenameRef("x");
                }}
                onFocus={() => {
                  setReceivenameRef("");
                }}
              />
              <lablel className={styles.payment_label}>Address</lablel>
              <input
                className={
                  receiveaddressRef === ""
                    ? styles.payment_input
                    : styles.payment_input_warning
                }
                type="text"
                placeholder="EX: 1st, Ha Huy Tap, Ha Tinh"
                onChange={(e) => setReceiveaddress(e.target.value)}
                onBlur={() => {
                  if (receiveaddress === "") setReceiveaddressRef("x");
                }}
                onFocus={() => {
                  setReceiveaddressRef("");
                }}
              />
              <lablel className={styles.payment_label}>Phone number</lablel>
              <input
                className={
                  receivephoneRef === ""
                    ? styles.payment_input
                    : styles.payment_input_warning
                }
                type="text"
                placeholder="EX: 12345678"
                onBlur={() => {
                  if (receivephone === "") setReceivephoneRef("x");
                }}
                onFocus={() => {
                  setReceivephoneRef("");
                }}
                onChange={(e) => {
                  setReceivephone(e.target.value);
                }}
              />
              <div className={styles.button}>
                <button className={styles.button_cancel} onClick={cancelOrder}>
                  Cancel
                </button>
                <button
                  className={styles.button_confirm}
                  onClick={confirmOrderMomo}
                >
                  Confirm Payment
                </button>
              </div>
            </div>
          ) : (
            <lablel className={styles.button}>Not Supported yet</lablel>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default PaymenScreen;
