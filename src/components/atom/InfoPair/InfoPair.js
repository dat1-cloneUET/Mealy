import React from 'react'
import styles from './InfoPair.module.scss';

function InfoPair(props) {
    const { keyy, value } = props;
    return (
        <div className={styles.mainComponent}>
            <p className={styles.key}>{keyy}</p>
            <p className={styles.value}>{value}</p>
        </div>
    )
}

export default InfoPair
