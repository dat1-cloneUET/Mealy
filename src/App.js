import  styles from  './App.module.scss';
import './App.css';
import Poster from './components/medium-component/Poster/Poster';
import Menu from './components/medium-component/Menu/Menu';
import MainScreen from './components/medium-component/MainScreen/MainScreen';
import MenuScreen from './components/medium-component/MenuScreen/MenuScreen';
import LoginScreen from './components/medium-component/LoginScreen/LoginScreen';
import PaymentScreen from './components/medium-component/PaymentScreen/PaymentScreen';
import { motion } from 'framer-motion';
import {
  Route,
  useHistory,
  useLocation
} from "react-router-dom";
import { useState, useContext } from 'react';
import { Navigate } from './Contexts';
import HistoryScreen from './components/medium-component/HistoryScreen/HistoryScreen';
function App() {
  var w = window.innerWidth;
  var h = window.innerHeight;
console.log(w, h);
  const [currentLeftSite, setCurrentLeftSite]= useState(styles.mainScreen);
  const [currentRightSite, setCurrentRightSite]= useState(styles.bigIcon);
  let history = useHistory();
  let location = useLocation("/");
  const handleLoginScreen = () =>{
  if(location.pathname === "/payment"){
      history.push("/");
      setCurrentLeftSite(styles.mainScreen);
  }
      
  setCurrentRightSite(styles.loginScreen);
  }
  const handleMenuScreen = () =>{
  setCurrentLeftSite(styles.menuScreen);
  }
  const handleMainScreen = () =>{
  setCurrentLeftSite(styles.mainScreen);
  setCurrentRightSite(styles.bigIcon);
  }

  return (
    <div className={styles.App}>
      <Navigate.Provider value={{handleLoginScreen, handleMainScreen, handleMenuScreen}}>
        <Menu />
        <Poster/>

        <div className={styles.mainComponent}/>
          <Route path="/" exact>
              {/* <motion.div 
                initial= {{ opacity: 0.4, y: -100}}
                animate= {{ opacity: 1, y: 0}}
                className={styles.rightComponent}>
                <img src="image/svg/yellowbg.svg" />
                <img src="/image/svg/bigIcon.svg" alt="" className={currentRightSite}/>
                <div className={styles.styleLoginScreen}>
                  <LoginScreen/>
                </div>
              </motion.div> */}
              <MainScreen />
 
          </Route>
          <Route path="/order" exact>
              <MenuScreen />
 
          </Route>
          <Route path="/payment" exact>
            <PaymentScreen/>
          </Route>
          <Route path="/history" exact>
            <HistoryScreen/>
          </Route>
          
        </Navigate.Provider>
    </div>
  );
}

export default App;
