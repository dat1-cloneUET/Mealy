import React, { useEffect, useLayoutEffect, useState } from 'react'
import PaymentMethodButton from '../../atom/PaymentMethodButton/PaymentMethodButton'
import styles from './PaymentScreen.module.scss'
import { motion } from 'framer-motion';
import InfoPair from '../../atom/InfoPair/InfoPair';
import Receipt from '../../atom/Receipt/Receipt';
import { useHistory } from 'react-router';
function PaymenScreen() {
    const [method, setMethod]= useState([true, false, false]);
    const handleChangeMethod = (val) => {
        let exp=[false, false, false];
        exp[val]= true;
        setMethod(exp);
    }
    const history= useHistory();
    const [switchScreen, setSwitchScreen]= useState(false);
    const [info, setInfo]= useState("flex");
    const [pay, setPay]= useState(true);
    useEffect(() => {
        window.addEventListener('resize', () => {
            
            const width= window.innerWidth;
            // console.log(width);
            if(width > 1024) {
                setPay(true);
                setInfo("flex");
            }
            else {
                setPay(false);
                setInfo("block");
            }
        });
    },[]);
    useLayoutEffect(() => {
            const width= window.innerWidth;
            // console.log(width);
            if(width > 1024) {
                setPay(true);
                setInfo("flex");
            }
            else {
                setPay(false);
                setInfo("block");
            }
    },[]);
    const handlePayment = () => {
        if(!pay) setInfo("none");
            else setInfo("block");
        setPay(!pay);
    }
    return (
        <motion.div 
            initial= {{ opacity: 0.4, y: -30}}
            animate= {{ opacity: 1, y: 0}}
            className={styles.mainComponent}>
            <div className={styles.information} style={{display: info}}>
                
                <div className={styles.information_listFood}>
                    <div className={styles.head}>
                        <div className={styles.information_manageButton}>
                            <img src="image/svg/back.svg" className={styles.back} onClick={() => history.push("/")}/>
                            <img src="image/svg/next.svg" className={styles.next} onClick={handlePayment}/>
                        </div>
                        <p className={styles.confirmation}>Confirmation</p>
                        
                    </div>
                    <div className={styles.scroll}>
                        {/* <Receipt type={"Burger"} name={"oc cho burger"} number={2} price={1.69}/>
                        <Receipt type={"Pizza"} name={"oc cho burger"} number={2} price={1.69}/>
                        <Receipt type={"Burger"} name={"oc cho burger"} number={2} price={1.69}/> */}
                        <Receipt type={"Burger"} name={"oc cho burger"} number={2} price={1.69}/>
                        <Receipt type={"Burger"} name={"oc cho burger"} number={2} price={1.69}/>
                        <Receipt type={"Burger"} name={"oc cho burger"} number={2} price={1.69}/>
                        <Receipt type={"Burger"} name={"oc cho burger"} number={2} price={1.69}/>
                        <Receipt type={"Burger"} name={"oc cho burger"} number={2} price={1.69}/>
                        <Receipt type={"Burger"} name={"oc cho burger"} number={2} price={1.69}/>
                    </div>
                </div>
                <div className={styles.information_total}>
                    <div className={styles.information_footerdiv}>
                        <InfoPair keyy={"Discount"} value={"1st, Ha Huy Tap, Ha Tinh Ha Huy Tap, Ha Tinh"}/>
                        <InfoPair keyy={"Sub total"} value={"$120"}/>
                    </div>
                </div>
            </div>


            <div className={styles.payment} style={pay?{display: "flex"}: {display: "none"}}>
            <div style={{alignSelf: 'center', flexDirection: "column"}}>
            <div className={styles.payment_header} style={{justifyContent: 'space-between'}}>
                <p >Payment</p>
                <img src="/image/svg/back.svg" alt="" className={styles.payment_back} onClick={handlePayment}/>
            </div>    
                <div className={styles.payment_all}>
                    <p className={styles.payment_paymentMethod}>Payment method</p>
                    <div className={styles.payment_listMethod}>
                        <PaymentMethodButton active={method[0]} type="direct" handleChangeMethod={() => handleChangeMethod(0)}/>
                        <PaymentMethodButton active={method[1]} type="paypal"  handleChangeMethod={() => handleChangeMethod(1)}/>
                        <PaymentMethodButton active={method[2]} type="cash"  handleChangeMethod={() => handleChangeMethod(2)}/>
                    </div>
                </div>
                <lablel className={styles.payment_label}>Receive Name</lablel>
                <input className={styles.payment_input} type="text" placeholder="EX: Eimi Fudaka"/>
                <lablel className={styles.payment_label}>Address</lablel>
                <input className={styles.payment_input} type="text" placeholder="EX: 1st, Ha Huy Tap, Ha Tinh"/>
                <lablel className={styles.payment_label}>Phone number</lablel>
                <input className={styles.payment_input} type="text" placeholder="EX: 12345678"/>
                <div className={styles.button}>
                    <button className={styles.button_cancel}>Cancel</button>
                    <button className={styles.button_confirm}>Confirm Payment</button>
                </div>
                </div>
                {/* <HistoryButton timestamp={1624458298865} active={true}/> */}
            </div>
        </motion.div>
    )
}

export default PaymenScreen
