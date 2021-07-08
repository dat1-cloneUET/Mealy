import React, { useEffect, useLayoutEffect, useState } from 'react'
import PaymentMethodButton from '../../atom/PaymentMethodButton/PaymentMethodButton'
import styles from './PaymentScreen.module.scss'
import { motion } from 'framer-motion';
import InfoPair from '../../atom/InfoPair/InfoPair';
import Receipt from '../../atom/Receipt/Receipt';
import { useHistory } from 'react-router';
import { useBooking } from '../../context/BookingProvider'
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
    const [list, setList]= useState();
    const { listItem, cart, deleteItem } = useBooking();
    const [receivename, setReceivename]= useState("");
    const [receiveaddress, setReceiveaddress]= useState("");
    const [receivephone, setReceivephone]= useState();
    const [total, setTotal]= useState(0);
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
    const renderCart = () => {
        let cart2=[];
        
        for (let [key, value] of Object.entries(cart)) {
            let obj= listItem.find(item => item.id == key);
            cart2.push( <Receipt key={obj.id} type={obj.type} 
                                name={obj.name} number={value} 
                                price={obj.price} onDelete={() => deleteItem(key)}
                                id={key}
                                />)
          }
        // setTotal(price);
        return cart2;
    }
    useEffect(() => {
        let price=0;
        for (let [key, value] of Object.entries(cart)) {
            let obj= listItem.find(item => item.id == key);
            price= price + obj.price * parseInt(value);
            console.log(price);
          }
          setTotal(price);
    },[cart])
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
                        {
                         renderCart()
                        }
                    </div>
                </div>
                <div className={styles.information_total}>
                    <div className={styles.information_footerdiv}>
                        <InfoPair keyy={"Discount"} value={"0"}/>
                        <InfoPair keyy={"Sub total"} value={`$${total.toFixed(2)}`}/>
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

                {
                    method[0]?
                    <div style={{flexDirection: 'column'}}>
                        <lablel className={styles.payment_label}>Receive Name</lablel>
                        <input  className={styles.payment_input} type="text" placeholder="EX: Eimi Fudaka" 
                                onChange={e => setReceivename(e.target.value)}/>
                        <lablel className={styles.payment_label}>Address</lablel>
                        <input  className={styles.payment_input} type="text" placeholder="EX: 1st, Ha Huy Tap, Ha Tinh"
                                onChange={e => setReceiveaddress(e.target.value)}
                        />
                        <lablel className={styles.payment_label}>Phone number</lablel>
                        <input className={styles.payment_input}  pattern="[0-9]+" type="text" placeholder="EX: 12345678" onChange={e => {
                            setReceivephone(e.target.value)
                        }}/>
                        <div className={styles.button}>
                            <button className={styles.button_cancel}>Cancel</button>
                            <button className={styles.button_confirm}>Confirm Payment</button>
                        </div>
                    </div>:
                    <lablel className={styles.button}>Not Supported yet</lablel>
                }
                </div>
            </div>
        </motion.div>
    )
}

export default PaymenScreen
