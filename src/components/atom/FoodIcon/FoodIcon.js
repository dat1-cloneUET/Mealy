import React, { useState } from 'react'
import styles from './FoodIcon.module.scss'
import { motion } from "framer-motion";
function FoodIcon(props) {
    const {type, active} =props;
//onClick={handleActive}
    return (
        <div className={styles.mainComponent} >
            {/* <div className={styles.img}>
                <img src={`image/svg/foodIcon/${type}.svg`} alt="" />
            </div> */}
            {
                active ? <motion.img 
                    initial={{opacity: 0.1}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.4}}
                    className={styles.img}
                    src={`image/svg/foodIcon/${type}-active.svg`} alt="" /> :
                <img 
                    // initial={{opacity: 0.1}}
                    // animate={{opacity: 1}}
                    className={styles.img}
                    src={`image/svg/foodIcon/${type}.svg`} alt="" />
            
            }
                    {/* <img src={`image/svg/foodIcon/${type}-active.svg`} alt="" /> */}
    
    
            <p className={styles.name}>{type}</p>
        </div>
    )
}

export default FoodIcon
