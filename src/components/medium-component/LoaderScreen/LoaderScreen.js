import React from 'react'
import styles from './LoaderScreen.module.scss'

function LoaderScreen() {
    return (
        <div style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: 'center',
            opacity: 0.4,
            zIndex: 10000
         }}>
            <div className={styles["lds-roller"]}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default LoaderScreen
