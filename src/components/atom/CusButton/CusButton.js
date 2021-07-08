import React from 'react'
import styles from './CusButton.module.scss';
function CusButton(props) {
    const {data, handleClick} = props;
    const handle = () => {
        if(handleClick)
            handleClick();
    }
    return (
        <button className={styles.main} onClick={handle}>
            {data}
        </button>
    )
}

export default CusButton
