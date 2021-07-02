import React from 'react'
import styles from './Food.module.scss'

function Food(props) {
    const {type, name, price}= props;
    var header;
    switch (type){
        case "Pizza":
            header=styles.header_pizza;
            break;
        case "Burger":
            header=styles.header_burger;
            break;
        case "Sandwitch":
            header=styles.header_sandwitch;
            break;
        case "Noodle":
            header=styles.header_noodle;
            break;
        case "Fires":
            header=styles.header_fries;
            break;
        case "Chicken":
            header=styles.header_chicken;
            break;
    }
    return (
        <div className={styles.mainComponent}>
            <div className={header}>
                <img src={`image/svg/foodIcon/${type}-active.svg`} alt="" className={styles.img}/>
                <p className={styles.name}>Hamburger Cua</p>
                <p className={styles.price}>190.000đ</p>
            </div>
            <div className={styles.footer}>
            <img src={'image/svg/add.svg'} alt="" className={styles.icon}/>
            <p className={styles.add}>Add to Cart</p>
            </div>
        </div>
    )
}

export default Food
