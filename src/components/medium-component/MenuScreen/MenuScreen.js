import React, { useState, useEffect, useMemo } from 'react'
import Food from '../../atom/Food/Food';
import FoodIcon from '../../atom/FoodIcon/FoodIcon';
import styles from './MenuScreen.module.scss';
import { motion } from "framer-motion";
import { useBooking } from '../../context/BookingProvider'
import { useLoader } from '../../context/LoaderProvider';
function MenuScreen() {
    const [active, setActive]= useState("none");
    const handleChooseCategory = (val) => { 
        if (active === val ) 
            setActive("none");
        else setActive(val);
    }
    const { listItem }= useBooking();
    const { turnOnLoader, turnOffLoader }= useLoader();
    if(listItem) turnOffLoader();
        else turnOnLoader();
    return (
        <motion.div 
            initial= {{ opacity: 0.4, y: -100}}
            animate= {{ opacity: 1, y: 0}}
            className={styles.mainComponent}>
            <div className={styles.leftComponent}>
                <p className={styles.text}>Popular Category</p>
                <div className={styles.listIcon}>
                    <div className={styles.list}>
                        <FoodIcon type={'pizza'} active={active === "pizza"} handleChooseCategory={() => handleChooseCategory("pizza")}/>
                        <FoodIcon type={'burger'} active={active === "burger"} handleChooseCategory={() => handleChooseCategory("burger")}/>
                        <FoodIcon type={'sandwitch'} active={active === "sandwitch"} handleChooseCategory={() => handleChooseCategory("sandwitch")}/>
                        <FoodIcon type={'chicken'} active={active === "chicken"} handleChooseCategory={() => handleChooseCategory("chicken")}/>
                        <FoodIcon type={'pasta'} active={active === "pasta"} handleChooseCategory={() => handleChooseCategory("pasta")}/>
                        <FoodIcon type={'desert'} active={active === "desert"} handleChooseCategory={() => handleChooseCategory("desert")}/>
                    </div>
                    <div className={styles.listFood}>
                    {
                        listItem?listItem.filter(item => {
                            if(active === "none") return item;
                            else return item.type === active}).map((item) => 
                            (<Food  key={item.id} 
                                    type={item.type}
                                    name={item.name}
                                    price={item.price}
                                    id={item.id}
                                    />)):<div/>
                    }
                     
       
                    </div>
                </div>
                
            </div>
            <img src="/image/svg/bigIcon.svg" alt="" className={styles.bigIcon}/>
        </motion.div>
    )
}

export default React.memo(MenuScreen)
