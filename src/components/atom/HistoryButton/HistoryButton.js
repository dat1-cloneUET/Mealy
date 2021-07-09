import { motion } from 'framer-motion';
import React from 'react'
import styles from './HistoryButton.module.scss';

function HistoryButton(props) {
    const { time, active, click }=  props;
    // const {seconds, nanoseconds}= time;
    let timer=new Date(time);
    // console.log(time);
    let hour= timer.getHours(), minute= timer.getMinutes(), year= timer.getFullYear(), month= timer.getMonth(), day= timer.getDay();
    return (
        <div className={styles.mainComponent} onClick={click}>
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
