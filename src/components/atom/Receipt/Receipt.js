import React, { useState } from 'react'
import styles from './Receipt.module.scss';
import { useBooking } from '../../context/BookingProvider'
function Receipt(props) {
    const { type, name, price, number, onDelete, id }= props;
    const {updateNumber}= useBooking();
    const [expnum, setExpnum]= useState(number);
    const handleChangenumber = (num) => {
        setExpnum(num);
        updateNumber(id, num);
    }
    const handleblur = () => {
        if(expnum <= 0){
            setExpnum(1);
            updateNumber(id, 1);
        }
            
            
    }
    return (
        <div className={styles.mainContainer}>
            <div className={styles.header}>
                <img className={styles.img} src={`image/svg/foodIcon/${type}-active.svg`} alt=""/>
                <div className={styles.box}>
                    <p className={styles.name}>{name}</p>
                     <p className={styles.price}>{`$${price}`}</p>
                </div>
                <input className={styles.number} type="number" placeholder={1} value={expnum} onChange={e => handleChangenumber(e.target.value)} onBlur={handleblur}/>
            </div>
            <div className={styles.footer}>
                <input placeholder={"Leave a Note"} className={styles.note}/>
                <button className={styles.delete} onClick={onDelete}>
                    <img src="./image/svg/delete.svg"/>
                </button>
            </div>
        </div>
    )
}

export default Receipt
