import React, { useEffect, useLayoutEffect, useState } from 'react'
import styles from '../PaymentScreen/PaymentScreen.module.scss';
import HistoryButton from '../../atom/HistoryButton/HistoryButton';
import InfoPair from '../../atom/InfoPair/InfoPair';
import Receipt from '../../atom/Receipt/Receipt';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
// import { firestore } from '../../../firebase';
// import { useAuth } from '../../context/AuthProvider';
// import { useBooking } from '../../context/BookingProvider';
function HistoryScreen() {
    const history= useHistory()
    const [switchScreen, setSwitchScreen]= useState(false);
    const [info, setInfo]= useState("flex");
    const [his, setHis]= useState("flex");
    const  [listHistory, setListHistory]= useState();
    const [current, setCurrent]= useState();
    const [currentobj, setCurrentObj]= useState();
    // const { listItem }= useBooking();
    // const {currentUser}= useAuth();
    const [total, setTotal]= useState(0);
    useEffect(() => {
        window.addEventListener('resize', () => {
            
            const width= window.innerWidth;
            // console.log(width);
            if(width > 1024) {
                setHis("flex");
                setInfo("flex");
            }
            else {
                setHis("block");
                setInfo("none");
            }
        });
    },[]);
    useLayoutEffect(() => {
        const width= window.innerWidth;
        // console.log(width);
        if(width > 1024) {
            setHis("flex");
            setInfo("flex");
        }
        else {
            setHis("block");
            setInfo("none");
        }
    },[]);
    // useEffect(() => {
    //     firestore.collection("History").where("userId", "==", currentUser.user.uid).get()
    //         .then(res =>{
    //             let exp=[];
    //             res.forEach(item => {
    //                 exp.push(item.data())
    //                 console.log(item.data().time)
    //             });
    //             setListHistory(exp);
    //         });
    // },[]);
    // useEffect(() => {
    //     if(current && listHistory) {
    //         let obj= listHistory.find(item => item.time.seconds *1000 +item.time.nanoseconds /1000000 == current);
    //     setCurrentObj(obj);
    //     }
    // },[current]);
    const handleClick =(time) => {
        const width= window.innerWidth;
        if(width < 1024)  
            handleSwitch();
        setCurrent(time);
    }
const handleSwitch = () =>{
    if(his === "block") {
        setInfo("block");
        setHis("none");
    }
        
        else {
            setInfo("none");
            setHis("block");
        }
}
const renderCart = () => {
    // let cart2=[];
    
    // for (let [key, value] of Object.entries(currentobj.order)) {
    //     let obj= listItem.find(item => item.id == key);
    //     cart2.push( <Receipt key={obj.id} type={obj.type} 
    //                         name={obj.name} number={value} 
    //                         price={obj.price}
    //                         id={key}
    //                         tatic={true}
    //                         />)
    //   }
    // setTotal(price);
    // return cart2;
}
// useEffect(() => {
//     if(currentobj) {
//         let price=0;
//         for (let [key, value] of Object.entries(currentobj.order)) {
//             let obj= listItem.find(item => item.id == key);
//             price= price + obj.price * parseInt(value);
//             // console.log(price);
//         }
//         setTotal(price);
//     }
// },[currentobj])
    return (
        <motion.div 
            initial= {{ opacity: 0.4, y: -30}}
            animate= {{ opacity: 1, y: 0}}
            className={styles.mainComponent}>
            <div className={styles.information} style={info?{display: info}: {display: "none"}}>
                
                <div className={styles.information_listFood}>
                    <div className={styles.head}>
                    <div className={styles.information_manageButton}>
                        <img src="image/svg/back.svg" className={styles.backk} onClick={handleSwitch}/>
                        {/* <img src="image/svg/next.svg" className={styles.next} onClick={() => setSwitchScreen(!switchScreen)}/> */}
                    </div>
                        
                        <p className={styles.confirmation}>Confirmation</p>
                    </div>
                    <div className={styles.scroll}>
                        {
                            currentobj?renderCart():""
                       }
                    </div>
                </div>
        
                <div className={styles.information_total}> 
                    <div className={styles.information_headerdiv}>
                        <InfoPair keyy={"Name"} value={currentobj? currentobj.receivename:""}/>
                        <InfoPair keyy={"Address"} value={currentobj? currentobj.receiveaddress:""}/>
                        <InfoPair keyy={"Phone number"} value={currentobj? currentobj.receivephone:""}/>
    
                    </div>
                    <div className={styles.information_footerdiv}>
                        <InfoPair keyy={"Discount"} value={"$0"}/>
                        <InfoPair keyy={"Sub total"} value={`$${total?total.toFixed(2):0}`}/>
                    </div>
                </div>
            </div>

            {/* style={!switchScreen?{ display: "none"}: { display: "flex"}} */}
            <div  className={styles.history} style={{display: his}}>
                <img src="image/svg/back.svg" className={styles.historyBack} onClick={handleSwitch} style={{marginLeft: 17, marginBottom: 10, marginTop: 10}}/>
                {/* <HistoryButton timestamp={1624458298865} active={false}/> */}
                {
                    listHistory?listHistory.map((item, index) => {
                        return (<HistoryButton  key={index} 
                                                time={item.time.seconds *1000 +item.time.nanoseconds /1000000} 
                                                active={false} 
                                                click={() => handleClick(item.time.seconds *1000 +item.time.nanoseconds /1000000)}
                                                />)
                    }):<div/>
                }
            </div>
        </motion.div>
    )
}

export default HistoryScreen
