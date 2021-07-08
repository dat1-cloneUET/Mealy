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
  useLocation, 
  Switch
} from "react-router-dom";
import { useState, useContext } from 'react';
// import { Navigate } from './Contexts';
import HistoryScreen from './components/medium-component/HistoryScreen/HistoryScreen';
import { AuthProvider } from './components/context/AuthProvider';
import {firestore} from './firebase';
import { useAuth } from './components/context/AuthProvider';
import { useBooking } from './components/context/BookingProvider'
import { BookingProvider } from './components/context/BookingProvider'
function App() {
  const [name, setname]= useState();
  return (
    <AuthProvider>
    <BookingProvider>
      <div className={styles.App}>
          <Menu name={name} setname={setname} />
          <Poster/>

          <div className={styles.mainComponent}/>
          
            <Switch>
              <Route path="/" exact>
                  <MainScreen name={name}/>
              </Route>
              <Route path="/order" exact>
                  <MenuScreen />
              </Route>
              <Route path="/login" >
                  <LoginScreen setname={setname}/>
              </Route>
              <Route path="/payment" exact>
                <PaymentScreen/>
              </Route>
              <Route path="/history" exact>
                <HistoryScreen/>
              </Route>
            </Switch>
      </div>
    </BookingProvider>
    </AuthProvider>
    
  );
}

export default App;
