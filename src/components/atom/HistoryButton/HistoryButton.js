import { motion } from 'framer-motion';
import React from 'react'
import styles from './HistoryButton.module.scss';

function HistoryButton(props) {
    const { timestamp, active }=  props;
    let time=new Date(timestamp);
    let hour= time.getHours(), minute= time.getMinutes(), year= time.getFullYear(), month= time.getMonth(), day= time.getDay();
    return (
        <div className={styles.mainComponent}>
            {
                hour > 12 ?
                    `${hour - 12}:${minute} PM - ${day}/${month}/${year}`:
                    `${hour}:${minute} AM - ${day}/${month}/${year}`
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
