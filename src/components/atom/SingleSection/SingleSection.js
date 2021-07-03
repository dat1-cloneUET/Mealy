import React from 'react'
import styles from "./SingleSection.module.scss";
function SingleSection({name, img}) {
    return (
        <div className={styles.mainComponent}>
            
            <img className={styles.img} src={img} alt="" /><p className={styles.name}>{name}</p>
        </div>
    )
}

export default SingleSection
