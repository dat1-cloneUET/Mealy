import React from 'react'
import styles from './Food.module.scss'
import { useBooking } from '../../context/BookingProvider';

function Food( { type, name, price, id } ) {
    const { addItem }= useBooking();
    var header;
    switch (type){
        case "pizza":
            header=styles.header_pizza;
            break;
        case "burger":
            header=styles.header_burger;
            break;
        case "sandwitch":
            header=styles.header_sandwitch;
            break;
        case "pasta":
            header=styles.header_noodle;
            break;
        case "desert":
            header=styles.header_fries;
            break;
        case "chicken":
            header=styles.header_chicken;
            break;
    }
    return (
        <div className={styles.mainComponent}>
            <div className={header}>
                <img src={`image/svg/foodIcon/${type}-active.svg`} alt="" className={styles.img}/>
                <p className={styles.name}>{name}</p>
                <p className={styles.price}>{`$${price}`}</p>
            </div>
            <div className={styles.footer}>
            <img src={'image/svg/add.svg'} alt="" className={styles.icon} onClick={() => addItem(id)}/>
            <p className={styles.add}>Add to Cart</p>
            </div>
        </div>
    )
}

export default Food
