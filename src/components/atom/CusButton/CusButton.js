import React from 'react'
import styles from './CusButton.module.scss';
function CusButton(props) {
    const {data, handleClick} = props;
    return (
        <button className={styles.main} onClick={() =>handleClick()}>
            {data}
        </button>
    )
}

export default CusButton
