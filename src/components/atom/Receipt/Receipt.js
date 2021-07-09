import React, { useState } from 'react'
import styles from './Receipt.module.scss';
import { useBooking } from '../../context/BookingProvider'
function Receipt(props) {
    const { type, name, price, number, onDelete, id, tatic }= props;
    const { updateNumber }= useBooking();

    const handleChangenumber = (num) => {
        if(num <=10)
        updateNumber(id, num);
    }
    const handleblur = () => {
        if(number <= 0){
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
                {
                    !tatic?<input className={styles.number} type="number" placeholder={1} value={number} onChange={e => handleChangenumber(e.target.value)} onBlur={handleblur}/>:
                    <label className={styles.number} >{number}</label>
                }
                
            </div>
            <div className={styles.footer}>
                <input placeholder={"Leave a Note"} className={styles.note}/>
                {
                    !tatic?<button className={styles.delete} onClick={onDelete}>
                        <img src="./image/svg/delete.svg"/>
                    </button>:<div/>
                }
                
            </div>
        </div>
    )
}

export default Receipt
