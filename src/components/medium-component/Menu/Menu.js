import React, {useContext} from 'react'
import styles from './Menu.module.scss';
import CusButton from '../../atom/CusButton/CusButton';
import { Navigate } from '../../../Contexts';
import {
    BrowserRouter as Router,
    useHistory,
    useLocation,
    Link
  } from "react-router-dom";
function Menu(props) {
    const { handleMainScreen, handleLoginScreen }= useContext(Navigate);
    let history = useHistory();
    let location = useLocation();
    const handleGoToMainScreen = () => {
        if(location.pathname === "/payment")
            history.push("/");
        else 
            handleMainScreen();
    }
    return (
        <div className={styles.mainComponent}>
            <div onClick={()=> handleGoToMainScreen()} style={{cursor: 'pointer'}}>
                <img src={'/image/svg/knife.svg'} alt="" className={styles.img}/>
                <div className={styles.projectName}>
                    <p className={styles.text1}>Mealy</p>
                    <p className={styles.text2}>Food delivery</p>
                </div>
            </div>
            
            <div className={styles.boxMenu}>
                <img src={'/image/svg/category.svg'} alt=""/>
                <p className={styles.text3}>Categorys</p>
            </div>
            <div className={styles.boxMenu2}>
                <img src={'/image/svg/contact.svg'} alt=""/>
                <p className={styles.text3}>Contact Us</p>
            </div>
            <div className={styles.boxIcon}>
                <img src={'/image/svg/facebook.svg'} alt=""/>
                <img src={'/image/svg/youtube.svg'} alt=""/>
                <img src={'/image/svg/twitter.svg'} alt=""/>
                <img src={'/image/svg/instagram.svg'} alt=""/>
                <img src={'/image/svg/in.svg'} alt=""/>
            </div>
            <Link to="/payment" className={styles.icecream}>
                <img src={'/image/svg/icecream.svg'} alt="" />
            </Link>
            <div className={styles.button}>
                <CusButton data={'Account'} handleClick={handleLoginScreen}/>
            </div>
            

        </div>
    )
}

export default Menu
