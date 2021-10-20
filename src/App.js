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
// import { AuthProvider } from './components/context/AuthProvider';
// import { BookingProvider } from './components/context/BookingProvider'
import PrivateRoute from './components/atom/PrivateRoute/PrivateRoute';
import LoaderScreen from './components/medium-component/LoaderScreen/LoaderScreen';
import {useLoader} from './components/context/LoaderProvider';
function App() {
  const [name, setname]= useState();
  const {isLoading}= useLoader();
  return (
    // <AuthProvider>
    // <BookingProvider>
      <div className={styles.App}>
          <Menu name={name} setname={setname} />
          <Poster/>
          {
            isLoading?<LoaderScreen/>:<div/>
          }
          <div className={styles.mainComponent}/>

            <Switch>
              <Route path="/" exact>
                  <MainScreen name={name}/>
              </Route>
              <Route path="/order" exact>
                  <MenuScreen />
              </Route>
              <Route path="/login" exact>
                  <LoginScreen setname={setname}/>
              </Route>
              <Route path="/payment" exact component={PaymentScreen}/>

              <PrivateRoute path="/history" exact component={HistoryScreen}/>
            </Switch>
      </div>
    // </BookingProvider>
    // </AuthProvider>
    
  );
}

export default App;
