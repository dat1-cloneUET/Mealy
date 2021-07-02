import React, { useState } from 'react'
import styles from './FoodIcon.module.scss'

function FoodIcon(props) {
    const {type, active} =props;
//onClick={handleActive}
    return (
        <div className={styles.mainComponent} >
            <div className={styles.img}>
                <img src={`image/svg/foodIcon/${type}.svg`} alt="" />
            </div>
            <div className={active ? styles.img2: styles.img3}>
                <img src={`image/svg/foodIcon/${type}-active.svg`} alt="" />
            </div>
    
            <p className={styles.name}>{type}</p>
        </div>
    )
}

export default FoodIcon
