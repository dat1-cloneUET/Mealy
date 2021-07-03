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
// import { Navigate } from './Contexts';
import HistoryScreen from './components/medium-component/HistoryScreen/HistoryScreen';
function App() {

  return (
    <div className={styles.App}>
        <Menu />
        <Poster/>

        <div className={styles.mainComponent}/>
          <Route path="/" exact>
              <MainScreen />
          </Route>
          <Route path="/order" exact>
              <MenuScreen />
          </Route>
          <Route path="/login">
              <LoginScreen/>
          </Route>
          <Route path="/payment" exact>
            <PaymentScreen/>
          </Route>
          <Route path="/history" exact>
            <HistoryScreen/>
          </Route>
    </div>
  );
}

export default App;
