import React, { useState, useEffect } from 'react'
import Food from '../../atom/Food/Food';
import FoodIcon from '../../atom/FoodIcon/FoodIcon';
import styles from './MenuScreen.module.scss';
import { motion } from "framer-motion";
import firebase from '../../../firebase';
function MenuScreen() {
    const [active, setActive]= useState([false, false, false, false, false, false]);
    const handleChooseCategory = (num) => { 
        let exp= [false, false, false, false, false, false];
        exp[num]= !active[num];
        setActive(exp);
    }
    const [listFood, setListFood]= useState();
    useEffect(() => {
        async function fetchData(){
            let firestore= firebase.firestore();
            let data= (await firestore.collection("Menu").orderBy("type").get());
            data= data.docs.map(doc => doc.data());
            setListFood(data);
        }
        fetchData();

    }, [])
    return (
        <motion.div 
            initial= {{ opacity: 0.4, y: -100}}
            animate= {{ opacity: 1, y: 0}}
            className={styles.mainComponent}>
            <div className={styles.leftComponent}>
                <p className={styles.text}>Popular Category</p>
                <div className={styles.listIcon}>
                    <div className={styles.list}>
                        <div onClick={() => handleChooseCategory(0)} className={styles.icon}>
                            <FoodIcon type={'pizza'} active={active[0]}/>
                        </div>
                        <div onClick={() => handleChooseCategory(1)} className={styles.icon} >
                            <FoodIcon type={'burger'} active={active[1]}/>
                        </div>
                        <div onClick={() => handleChooseCategory(2)} className={styles.icon}>
                            <FoodIcon type={'sandwitch'} active={active[2]}/>
                        </div>
                        <div onClick={() => handleChooseCategory(3)} className={styles.icon}>
                            <FoodIcon type={'chicken'} active={active[3]}/>
                        </div>
                        <div onClick={() => handleChooseCategory(4)} className={styles.icon}>
                            <FoodIcon type={'pasta'} active={active[4]}/>
                        </div>
                        <div onClick={() => handleChooseCategory(5)}>
                            <FoodIcon type={'desert'} active={active[5]}/>
                        </div>
                    </div>
                    <div className={styles.listFood}>
                    {
                        listFood?listFood.map((item, index) => 
                            (<Food  key={index} 
                                    type={item.type}
                                    name={item.name}
                                    price={item.price}
                                    />)):<div/>
                    }
                     
       
                    </div>
                </div>
                
            </div>
            <img src="/image/svg/bigIcon.svg" alt="" className={styles.bigIcon}/>
        </motion.div>
    )
}

export default MenuScreen
