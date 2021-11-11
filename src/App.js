import  styles from  './App.module.scss';
import './App.css';
import Poster from './components/medium-component/Poster/Poster';
import Menu from './components/medium-component/Menu/Menu';
import MainScreen from './components/medium-component/MainScreen/MainScreen';
import MenuScreen from './components/medium-component/MenuScreen/MenuScreen';
import LoginScreen from './components/medium-component/LoginScreen/LoginScreen';
import PaymentScreen from './components/medium-component/PaymentScreen/PaymentScreen';
import {
  Route,  useLocation, 
  Switch
} from "react-router-dom";
import HistoryScreen from './components/medium-component/HistoryScreen/HistoryScreen';

import PrivateRoute from './components/atom/PrivateRoute/PrivateRoute';
import LoaderScreen from './components/medium-component/LoaderScreen/LoaderScreen';
import {useLoader} from './components/context/LoaderProvider';
function App() {
  const {isLoading}= useLoader();
  return (
  
      <div className={styles.App}>
          <Menu />
          <Poster/>
          {
            isLoading?<LoaderScreen/>:<div/>
          }
          <div className={styles.mainComponent}/>

            <Switch>
              <Route path="/" exact>
                  <MainScreen />
              </Route>
              <Route path="/order" exact>
                  <MenuScreen />
              </Route>
              <Route path="/login" exact>
                  <LoginScreen />
              </Route>
              <Route path="/payment" exact component={PaymentScreen}/>

              <PrivateRoute path="/history" exact component={HistoryScreen}/>
            </Switch>
      </div>
 
    
  );
}

export default App;
