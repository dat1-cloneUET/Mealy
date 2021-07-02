import React, { useState } from 'react'
import Food from '../../atom/Food/Food';
import FoodIcon from '../../atom/FoodIcon/FoodIcon';
import styles from './MenuScreen.module.scss';

function MenuScreen() {
    const [active, setActive]= useState([false, false, false, false, false, false]);
    const handleChooseCategory = (num) => { 
        let exp= [false, false, false, false, false, false];
        exp[num]= !active[num];
        setActive(exp);
    }
    return (
        <div className={styles.mainComponent}>
            <div className={styles.leftComponent}>
                <p className={styles.text}>Popular Category</p>
                <div className={styles.listIcon}>
                    <div className={styles.list}>
                        <div onClick={() => handleChooseCategory(0)} className={styles.icon}>
                            <FoodIcon type={'Pizza'} active={active[0]}/>
                        </div>
                        <div onClick={() => handleChooseCategory(1)} className={styles.icon} >
                            <FoodIcon type={'Burger'} active={active[1]}/>
                        </div>
                        <div onClick={() => handleChooseCategory(2)} className={styles.icon}>
                            <FoodIcon type={'Sandwitch'} active={active[2]}/>
                        </div>
                        <div onClick={() => handleChooseCategory(3)} className={styles.icon}>
                            <FoodIcon type={'Chicken'} active={active[3]}/>
                        </div>
                        <div onClick={() => handleChooseCategory(4)} className={styles.icon}>
                            <FoodIcon type={'Noodle'} active={active[4]}/>
                        </div>
                        <div onClick={() => handleChooseCategory(5)}>
                            <FoodIcon type={'Fires'} active={active[5]}/>
                        </div>
                    </div>
                    <div className={styles.listFood}>
                        <Food type={'Burger'}/>
                        <Food type={'Noodle'}/>
                        <Food type={'Chicken'}/>
                        <Food type={'Pizza'}/>
                        <Food type={'Sandwitch'}/>
                        <Food type={'Fires'}/>
                        <Food type={'Burger'}/>
                    </div>
                </div>
                
            </div>
            <img src="/image/svg/bigIcon.svg" alt="" className={styles.bigIcon}/>
        </div>
    )
}

export default MenuScreen
