import React from 'react'
import styles from './Receipt.module.scss';

function Receipt(props) {
    const { type, name, price, number }= props;
    return (
        <div className={styles.mainContainer}>
            <div className={styles.header}>
                <img className={styles.img} src={`image/svg/foodIcon/${type}-active.svg`} alt=""/>
                <div className={styles.box}>
                    <p className={styles.name}>{name}</p>
                     <p className={styles.price}>{`$${price}`}</p>
                </div>
                <input className={styles.number} placeholder={2} value={number}/>
            </div>
            <div className={styles.footer}>
                <input placeholder={"Leave a Note"} className={styles.note}/>
                <button className={styles.delete}>
                    <img src="./image/svg/delete.svg"/>
                </button>
            </div>
        </div>
    )
}

export default Receipt
