import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import PaymentMethodButton from "../../atom/PaymentMethodButton/PaymentMethodButton";
import styles from "./PaymentScreen.module.scss";
import { motion } from "framer-motion";
import InfoPair from "../../atom/InfoPair/InfoPair";
import Receipt from "../../atom/Receipt/Receipt";
import { useHistory } from "react-router";
import { useBooking } from "../../context/BookingProvider";
import { useAuth } from "../../context/AuthProvider";
import { useLoader } from "../../context/LoaderProvider";
import axios from "axios";
import { getAllFood } from "../../../GraphQL/query";
import url from "../../../BE.config";

function PaymenScreen(props) {
  const [method, setMethod] = useState([true, false, false]);
  const handleChangeMethod = (val) => {
    let exp = [false, false, false];
    exp[val] = true;
    setMethod(exp);
  };
  const history = useHistory();
  const [info, setInfo] = useState("flex");
  const [pay, setPay] = useState(true);
  const [list, setList] = useState([]);
  const { cart, deleteItem, deleteAllItem } = useBooking();
  const { currentUser, genMomoUrl } = useAuth();
  const { turnOnLoader, turnOffLoader } = useLoader();
  const [receivename, setReceivename] = useState(
    localStorage.getItem("receivename")
  );
  const [receiveaddress, setReceiveaddress] = useState(
    localStorage.getItem("receiveaddress")
  );
  const [receivephone, setReceivephone] = useState(
    localStorage.getItem("receivephone")
  );
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
  useLayoutEffect(() => {
    const search = new URLSearchParams(props.location.search);
    const resultCode = search.get("resultCode");
    // 1106 = huy
    // 0 = thanh cong
    const requestId = search.get("requestId");

    if (resultCode == 0) {
      turnOnLoader();
      axios
        .post(
          "http://localhost:3000/api/auth/addOrderMomo",
          {
            requestId,
            data: {
              listFood: JSON.parse(localStorage.getItem("cart")),
              receiveName: localStorage.getItem("receivename"),
              receivePhone: localStorage.getItem("receivephone"),
              receiveAddress: localStorage.getItem("receiveaddress"),
            },
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          history.push("/");
        })
        .finally(() => turnOffLoader());
    } else turnOffLoader();
  }, []);
  useEffect(() => {
    getAllFood().then((res) => {
      const { message, data } = res.data.food;
      if (message === "success") setList(data);
    });
  }, []);
  const handlePayment = () => {
    if (!pay) setInfo("none");
    else setInfo("block");
    setPay(!pay);
  };
  const renderCart = () => {
    if (list.length === 0 || !cart) return;
    let cart2 = [];
    cart.forEach((item) => {
      let obj = list.find((i) => i.id === item.id);
      cart2.push(
        <Receipt
          key={obj.id}
          type={obj.type}
          name={obj.food_name}
          number={item.number}
          price={obj.price}
          onDelete={() => deleteItem(obj.id)}
          id={obj.id}
          tatic={false}
        />
      );
    });
    return cart2;
  };
  useEffect(() => {
    if (list.length === 0 || cart) return;
    let price = 0;
    cart.forEach((item) => {
      let obj = list.find((i) => i.id === item.id);
      price = price + parseInt(obj.price) * item.number;
    });
    setTotal(price);
  }, [cart, list]);

  useEffect(() => {
    localStorage.setItem("receiveaddress", receiveaddress);
  }, [receiveaddress]);
  useEffect(() => {
    localStorage.setItem("receivename", receivename);
  }, [receivename]);
  useEffect(() => {
    localStorage.setItem("receivephone", receivephone);
  }, [receivephone]);

  const cancelOrder = () => {
    setReceiveaddress("");
    setReceivename("");
    setReceivephone("");
    deleteAllItem();
    history.push("/");
  };
  const confirmOrder = async () => {
    if (receiveaddress && receivename && receivephone && cart.length !== 0) {
      turnOnLoader();
      axios
        .post(
          url.concat("/api/auth/addOrder"),
          {
            receiveName: receivename,
            receivePhone: receivephone,
            receiveAddress: receiveaddress,
            listFood: cart,
          },
          {
            headers: {
              token: currentUser,
            },
          }
        )
        .then((res) => {
          if (res.data.message !== "success") history.push("/login");
          else {
            history.push("/");
            deleteAllItem();
          }
        })
        .finally(() => turnOffLoader());
    }
  };
  const confirmOrderMomo = () => {
    if (receiveaddress && receivename && receivephone && cart.length !== 0) {
      turnOnLoader();
      genMomoUrl(total)
        .then((res) => {
          if (res.data.message === "success") {
            window.open(res.data.url);
            localStorage.setItem("urlMomo", res.data.url);
          }
        })
        .finally(() => turnOffLoader());
    }
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
              value={`${
                isNaN(total) ? "" : new Intl.NumberFormat().format(total)
              }đ`}
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
                value={receivename}
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
                value={receiveaddress}
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
                value={receivephone}
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
                value={receivename}
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
                value={receiveaddress}
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
                value={receivephone}
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
