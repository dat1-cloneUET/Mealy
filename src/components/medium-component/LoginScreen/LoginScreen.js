import React, { useState, useRef, useEffect } from "react";
import CusButton from "../../atom/CusButton/CusButton";
import Recent from "../../atom/Recent/Recent";
import styles from "./LoginScreen.module.scss";
import stylesMainScreen from "../MainScreen/MainScreen.module.scss";
import { LayoutGroupContext, motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
// import { useBooking } from '../../context/BookingProvider'
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import { useLoader } from "../../context/LoaderProvider";

function LoginScreen({ setname }) {
  const [signUpScreen, setSignUpScreen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [spanEmail, setSpanEmail] = useState("");
  const [spanUsername, setSpanUsername] = useState("");
  const [spanPassword, setSpanPassword] = useState("");
  const [spanConfirmPassword, setSpanConfirmPassword] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const { signup, login, setCurrentUser, resetPassword } = useAuth();
  const { turnOnLoader, turnOffLoader } = useLoader();
  const handleSwitch = () => {
    setSpanConfirmPassword("");
    setSpanUsername("");
    setSignUpScreen(!signUpScreen);
    setForgotPassword(false);
  };
  function handleSignUp() {
    checkvalid("email");
    checkvalid("password");
    checkvalid("username");
    checkvalid("confirmpassword");
    if (
      spanEmail !== "" ||
      spanPassword !== "" ||
      spanConfirmPassword !== "" ||
      spanUsername !== ""
    )
      return;
    turnOnLoader();
    signup(email, password, username)
      .then((res) => {
        if (
          res.data.message ===
          "The email address is already in use by another account."
        )
          setSpanEmail("Email has been used");
        else setSignUpScreen(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => turnOffLoader());
  }

  const handleLogin = async () => {
    turnOnLoader();
    login(email, password)
      .then((res) => {
        if (res.data.message === "success") {
          localStorage.setItem("token", res.data.token);
          setCurrentUser(res.data.token);
          history.push("/");
        } else {
          setSpanEmail(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => turnOffLoader());
  };

  const checkvalid = (type) => {
    switch (type) {
      case "email":
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase()))
          setSpanEmail("Email not valid");
        break;
      case "password":
        if (password.length < 6) {
          setSpanPassword(
            "Must Contain at Least 6 characters and an Uppercase"
          );
          break;
        }
        let x = false;
        for (let i = 0; i < password.length; i++)
          if (password[i] <= "Z" && password[i] >= "A") {
            x = true;
            break;
          }
        if (!x)
          setSpanPassword(
            "Must Contain at Least 6 characters and an Uppercase"
          );
        break;
      case "confirmpassword":
        if (password !== confirmPassword)
          setSpanConfirmPassword("Confirm and password must be the same");
        break;
      case "username":
        if (username === "") setSpanUsername("Username not valid");
        break;
    }
  };
  const history = useHistory();
  const handleForgotPass = () => {
    setForgotPassword(!forgotPassword);
  };
  const handleSendEmail = () => {
    turnOnLoader();
    resetPassword(email).then(res => {
        console.log(res.data);
    }).finally(() => turnOffLoader());
  };
  return (
    <motion.div
      initial={{ opacity: 0.4, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.mainComponent}
    >
      <div className={styles.leftComponent}>
        <p className={stylesMainScreen.header}>Mealy Food</p>
        <p className={stylesMainScreen.afterHeader}>
          A Better Way to Organize Your Recipe
        </p>
        <div
          className={stylesMainScreen.button}
          onClick={() => history.push("/order")}
        >
          <p className={stylesMainScreen.textbutton}>Order Now</p>
          <img
            src={"/image/svg/arrowdown.svg"}
            alt=""
            className={stylesMainScreen.arrow}
          />
        </div>
        <div className={stylesMainScreen.recent}>
          <p className={stylesMainScreen.text1}>Recently Pre Orders</p>
          <div className={stylesMainScreen.box}>
            <Recent name={"Mealy Food 1"} rate={"4/5"} />
            <Recent name={"Mealy Food 2"} rate={"4.5/5"} />
          </div>
        </div>
      </div>
      <div className={styles.rightComponent}>
        {forgotPassword ? (
          <>
            <input
              type="text"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className={spanEmail !== "" ? styles.input_warn : styles.input}
              onBlur={() => checkvalid("email")}
              onFocus={() => setSpanEmail("")}
            />
            <span className={styles.span}>{spanEmail}</span>
          </>
        ) : (
          <>
            {" "}
            <input
              type="text"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className={spanEmail !== "" ? styles.input_warn : styles.input}
              onBlur={() => checkvalid("email")}
              onFocus={() => setSpanEmail("")}
            />
            <span className={styles.span}>{spanEmail}</span>
            <div className={signUpScreen ? styles.visible : styles.notvisible}>
              <input
                type="text"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className={
                  spanUsername !== "" ? styles.input_warn : styles.input
                }
                onBlur={() => checkvalid("username")}
                onFocus={() => setSpanUsername("")}
              />
            </div>
            <span className={styles.span} style={{ marginTop: -20 }}>
              {spanUsername}
            </span>
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className={spanPassword !== "" ? styles.input_warn : styles.input}
              onBlur={() => checkvalid("password")}
              onFocus={() => setSpanPassword("")}
            />
            <span className={styles.span}>{spanPassword}</span>
            <div className={signUpScreen ? styles.visible : styles.notvisible}>
              <input
                type="password"
                placeholder="confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                className={
                  spanConfirmPassword !== "" ? styles.input_warn : styles.input
                }
                onBlur={() => checkvalid("confirmpassword")}
                onFocus={() => setSpanConfirmPassword("")}
              />
            </div>
            <span className={styles.span} style={{ marginTop: -20 }}>
              {spanConfirmPassword}
            </span>
          </>
        )}
        <div className={styles.footer}>
          {signUpScreen && !forgotPassword ? (
            <div></div>
          ) : (
            <p className={styles.forgotpassword} onClick={handleForgotPass}>
              {forgotPassword ? "Back" : "Forgot password"}
            </p>
          )}
          <CusButton
            data={
              signUpScreen
                ? "Sign Up"
                : forgotPassword
                ? "Send Email"
                : "Log In"
            }
            handleClick={
              signUpScreen
                ? handleSignUp
                : forgotPassword
                ? handleSendEmail
                : handleLogin
            }
          />
          <p className={styles.descript}>
            <span>
              {signUpScreen
                ? "Already have an account, "
                : "Don't have an account, "}
            </span>
            <span className={styles.signUp} onClick={handleSwitch}>
              {signUpScreen ? "Sign In" : "Sign Up"}
            </span>{" "}
            now.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default LoginScreen;
