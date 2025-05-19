import React from 'react'
import styles from './Alert.module.css'


const Alert = ({ alert, setAlert }) => {

    if(alert){
        return(
            <div className={styles.alertContainer}>
                <div className={styles.alertTitle}>{alert.title}</div>
                <div className={styles.alertMessage}>{alert}</div>
                <button className={styles.alertButton} onClick={
                    () => {
                        setAlert("")
                    }
                }>OK</button>
            </div>
        )
    }else{
        return(
            <>
            </>
        )
    }
}

export default Alert