import React from 'react'
import styles from './PaymentMethodButton.module.scss';
import { motion } from 'framer-motion';

function PaymentMethodButton(props) {
    const { active, type, handleChangeMethod }= props
    return (
        <div className={active?styles.mainComponent_active:styles.mainComponent} onClick={handleChangeMethod}>
            <img src={`image/svg/${type}.svg`} className={styles.img}/>
            <p className={active?styles.name_active:styles.name}>{type}</p>
            {
                active?<motion.img
                            initial={{scale: 0}}
                            animate={{scale: 1}}
                 src={`image/svg/tick.svg`} className={styles.img2}/>:<div/>
            }
        </div>
    )
}

export default PaymentMethodButton
