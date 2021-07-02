import React from 'react'
import styles from '../PaymentScreen/PaymentScreen.module.scss';
import HistoryButton from '../../atom/HistoryButton/HistoryButton';
import InfoPair from '../../atom/InfoPair/InfoPair';
import Receipt from '../../atom/Receipt/Receipt';
import { motion } from 'framer-motion';
function HistoryScreen() {
    return (
        <motion.div 
            initial= {{ opacity: 0.4, y: -30}}
            animate= {{ opacity: 1, y: 0}}
            className={styles.mainComponent}>
            <div className={styles.information}>
                
                <div className={styles.information_listFood}>
                    <div className={styles.head}>
                        <img src="image/svg/back.svg" className={styles.back}/>
                        <p className={styles.confirmation}>Confirmation</p>
                    </div>
                    <div className={styles.scroll}>
                        <Receipt type={"Burger"} name={"oc cho burger"} number={2} price={1.69}/>
                        <Receipt type={"Pizza"} name={"oc cho burger"} number={2} price={1.69}/>
                        <Receipt type={"Burger"} name={"oc cho burger"} number={2} price={1.69}/>
                        <Receipt type={"Burger"} name={"oc cho burger"} number={2} price={1.69}/>
                        <Receipt type={"Burger"} name={"oc cho burger"} number={2} price={1.69}/>
                        <Receipt type={"Burger"} name={"oc cho burger"} number={2} price={1.69}/>
                        <Receipt type={"Burger"} name={"oc cho burger"} number={2} price={1.69}/>
                        <Receipt type={"Burger"} name={"oc cho burger"} number={2} price={1.69}/>
                        <Receipt type={"Burger"} name={"oc cho burger"} number={2} price={1.69}/>
                    </div>
                </div>
        
                <div className={styles.information_total}> 
                    <div className={styles.information_headerdiv}>
                        <InfoPair keyy={"Name"} value={"Eimi Fudaka"}/>
                        <InfoPair keyy={"Address"} value={"1st, Ha Huy Tap, Ha Tinh"}/>
                        <InfoPair keyy={"Phone number"} value={"123 456 78"}/>
                        <InfoPair keyy={"Date"} value={"9:34 AM - 22/6/2021"}/>
                    </div>
                    <div className={styles.information_footerdiv}>
                        <InfoPair keyy={"Discount"} value={"$0"}/>
                        <InfoPair keyy={"Sub total"} value={"$120"}/>
                    </div>
                </div>
            </div>


            <div className={styles.payment}>
                <div style={{height: 14}}></div>
                <HistoryButton timestamp={1624458298865} active={false}/>
                <HistoryButton timestamp={1624458298865} active={false}/>
                <HistoryButton timestamp={1624458298865} active={true}/>
            </div>
        </motion.div>
    )
}

export default HistoryScreen
