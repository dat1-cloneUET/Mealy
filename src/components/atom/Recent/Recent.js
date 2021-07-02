import React from 'react'
import styles from './Recent.module.scss';

function Recent(props) {
    const {name, rate}= props;
    return (
        <div className={styles.mainComponent}>
            <div className={styles.blur}>
                <div className={styles.title}>
                <img src="/image/svg/burgerking.svg" alt=""/>
                <div className={styles.textBox}>
                    <p className={styles.text1}>
                        {name}
                    </p>
                    <p className={styles.text2}>
                        {rate}
                    </p>
                </div>
            </div>
            </div>
            
        </div>
    )
}

export default Recent
