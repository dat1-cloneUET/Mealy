import React, { useRef, useState, useEffect } from "react";
import styles from "./Menu.module.scss";
import CusButton from "../../atom/CusButton/CusButton";
import { useAuth } from '../../context/AuthProvider'
import OutsideClickHandler from "react-outside-click-handler";
import {
  BrowserRouter as Router,
  useHistory,
  useLocation,
  Link,
} from "react-router-dom";
import SingleSection from "../../atom/SingleSection/SingleSection";
import { useBooking } from "../../context/BookingProvider";
import { useLoader } from "../../context/LoaderProvider";

function Menu({ name, setname }) {
  let history = useHistory();
  const [openCategory, setOpenCategory] = useState(false);
  const { currentUser, logout, getUserInfo }= useAuth();
  const { cart } = useBooking();
  const { turnOnLoader, turnOffLoader } = useLoader();
  const [isLogin, setIsLogin]= useState(false)
  function handleLogout() {
    logout();
    setIsLogin(false)
  }
  useEffect(() => {
    getUserInfo().then(res => {
      if(res.data.message ==='success')
      setIsLogin(res.data.data.username);
    })
  },[currentUser])
  const getTotalNumber = () => cart?cart.reduce((pre, cur) => pre + cur.number, 0):0;

  return (
    <div className={styles.mainComponent}>
      <div onClick={() => history.push("/")} style={{ cursor: "pointer" }}>
        <img src={"/image/svg/knife.svg"} alt="" className={styles.img} />
        <div className={styles.projectName}>
          <p className={styles.text1}>Mealy</p>
          <p className={styles.text2}>Food delivery</p>
        </div>
      </div>

      <div className={styles.boxMenu}>
        <OutsideClickHandler onOutsideClick={() => setOpenCategory(false)}>
          <div className={styles.boxCategory}>
            <div
              className={styles.category}
              onClick={() => setOpenCategory(!openCategory)}
              // onMouseLeave={() =>setOpenCategory(false)}
            >
              <img
                src={
                  openCategory ? "image/svg/x.svg" : "/image/svg/category.svg"
                }
                alt=""
              />
              <p className={styles.text3}>Categorys</p>
            </div>
            {
              <div
                className={styles.openCategory}
                style={
                  openCategory
                    ? { height: 100 }
                    : { height: 0, boxShadow: "none" }
                }
              >
                <SingleSection
                  name="Home"
                  img="/image/svg/home.svg"
                  action={() => history.push("/")}
                />
                {isLogin ? (
                  <div style={{ flexDirection: "column" }}>
                    <SingleSection
                      name="Logout"
                      img="/image/svg/logout.svg"
                      action={handleLogout}
                    />
                    <Link
                      to="/history"
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      <SingleSection
                        name="History"
                        img="/image/svg/history.svg"
                      />
                    </Link>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <SingleSection name="Login" img="/image/svg/login.svg" />
                  </Link>
                )}
              </div>
            }
          </div>
        </OutsideClickHandler>
      </div>
      <div className={styles.boxMenu2}>
        <img src={"/image/svg/contact.svg"} alt="" />
        <p className={styles.text3}>Contact Us</p>
      </div>
      <div className={styles.boxIcon}>
        <img src={"/image/svg/facebook.svg"} alt="" />
        <img src={"/image/svg/youtube.svg"} alt="" />
        <img src={"/image/svg/twitter.svg"} alt="" />
        <img src={"/image/svg/instagram.svg"} alt="" />
        <img src={"/image/svg/in.svg"} alt="" />
      </div>
      <Link to="/payment" className={styles.icecream}>
        <div>
          <p>{getTotalNumber()}</p>
          <img src={"/image/svg/icecream.svg"} alt="" />
        </div>
      </Link>
      <div className={styles.button}>
        {isLogin ? (
          <CusButton data={isLogin} />
        ) : (
          <CusButton
            data={"Account"}
            handleClick={() => history.push("/login")}
          />
        )}
      </div>
    </div>
  );
}

export default Menu;
