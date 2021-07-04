import React, { useEffect, useLayoutEffect, useState } from 'react'
import styles from '../PaymentScreen/PaymentScreen.module.scss';
import HistoryButton from '../../atom/HistoryButton/HistoryButton';
import InfoPair from '../../atom/InfoPair/InfoPair';
import Receipt from '../../atom/Receipt/Receipt';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
function HistoryScreen() {
    const history= useHistory()
    const [switchScreen, setSwitchScreen]= useState(false);
    const [info, setInfo]= useState("flex");
    const [his, setHis]= useState(true);
    useEffect(() => {
        window.addEventListener('resize', () => {
            
            const width= window.innerWidth;
            // console.log(width);
            if(width > 1024) {
                setHis(true);
                setInfo("flex");
            }
            else {
                setHis(true);
                setInfo("none");
            }
        });
    },[]);
    useLayoutEffect(() => {
        const width= window.innerWidth;
        // console.log(width);
        if(width > 1024) {
            setHis(true);
            setInfo("flex");
        }
        else {
            setHis(true);
            setInfo("none");
        }
},[]);
const handleSwitch = () =>{
    if(his) 
        setInfo("block");
        else setInfo("none");
    setHis(!his);
}
    return (
        <motion.div 
            initial= {{ opacity: 0.4, y: -30}}
            animate= {{ opacity: 1, y: 0}}
            className={styles.mainComponent}>
            <div className={styles.information} style={info?{display: info}: {display: "none"}}>
                
                <div className={styles.information_listFood}>
                    <div className={styles.head}>
                    <div className={styles.information_manageButton}>
                        <img src="image/svg/back.svg" className={styles.back} onClick={handleSwitch}/>
                        {/* <img src="image/svg/next.svg" className={styles.next} onClick={() => setSwitchScreen(!switchScreen)}/> */}
                    </div>
                        
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

            {/* style={!switchScreen?{ display: "none"}: { display: "flex"}} */}
            <div  className={styles.history} style={his?{display: "flex"}: {display: "none"}}>
                <img src="image/svg/back.svg" className={styles.historyBack} onClick={handleSwitch} style={{marginLeft: 17, marginBottom: 10, marginTop: 10}}/>
                <HistoryButton timestamp={1624458298865} active={false}/>
                <HistoryButton timestamp={1624458298865} active={false}/>
                <HistoryButton timestamp={1624458298865} active={true}/>
                <HistoryButton timestamp={1624458298865} active={false}/>
                <HistoryButton timestamp={1624458298865} active={false}/>
                <HistoryButton timestamp={1624458298865} active={true}/>
                <HistoryButton timestamp={1624458298865} active={false}/>
                <HistoryButton timestamp={1624458298865} active={false}/>
                <HistoryButton timestamp={1624458298865} active={true}/>
                <HistoryButton timestamp={1624458298865} active={false}/>
                <HistoryButton timestamp={1624458298865} active={false}/>
                <HistoryButton timestamp={1624458298865} active={true}/>
                <HistoryButton timestamp={1624458298865} active={false}/>
                <HistoryButton timestamp={1624458298865} active={true}/>
                <HistoryButton timestamp={1624458298865} active={false}/>
                <HistoryButton timestamp={1624458298865} active={false}/>
                <HistoryButton timestamp={1624458298865} active={true}/>
                <HistoryButton timestamp={1624458298865} active={false}/>
                <HistoryButton timestamp={1624458298865} active={false}/>
                <HistoryButton timestamp={1624458298865} active={true}/>
            </div>
        </motion.div>
    )
}

export default HistoryScreen
