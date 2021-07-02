import React from 'react'
import styles from './Poster.module.scss';
function Poster() {
    return (
        <><div className={styles.pink}/>
        <div className={styles.mainComponent}>
            <img src="image/svg/yellowbg.svg" alt="" className={styles.img}/>
        </div>
        </>
    )
}

export default Poster
