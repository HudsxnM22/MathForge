import React from "react";
import styles from './NavBar.module.css'
import { Link } from 'react-router-dom';
import useUserStore from './hooks/useUserStore'
import ThemeSwitcher from './components/ThemeSwitcher'

export default function NavBar() {
    const user = useUserStore(state => state.user)

    return(
        <nav className={styles.NavBarContainer}>
            
            <span className={styles.leftNav}>
                <div className={styles.logoHolder}></div>
                <h1>Home</h1>
                <h1>Donate</h1>
            </span>
            <span className={styles.rightNav}>
                <ThemeSwitcher />
                <button className={styles.logInButton}>Log-In</button>
            </span>
        </nav>
    )
    //replace the h1 elms with Link and implement react-router-dom first
}

