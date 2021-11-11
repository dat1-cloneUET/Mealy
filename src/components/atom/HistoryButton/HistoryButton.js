import { motion } from 'framer-motion';
import React from 'react'
import styles from './HistoryButton.module.scss';

function HistoryButton(props) {
    const { time, active, click }=  props;
    return (
        <div className={styles.mainComponent} onClick={click}>
            {
               time
            }
            <div>
                {active?<motion.img
                            initial={{scale: 0}}
                            animate={{scale: 1}}
                 src={`image/svg/tick.svg`} className={styles.img2}/>:<div/>}
            </div>
            
        </div>
    )
}

export default HistoryButton
