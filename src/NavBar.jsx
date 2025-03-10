import React from "react";
import styles from './NavBar.module.css'
import { Link } from 'react-router-dom';
import useUserStore from './hooks/useUserStore'
import ThemeSwitcher from './components/ThemeSwitcher'
import UserDashboardButton from "./components/UserDashboardButton";

export default function NavBar() {
    const user = useUserStore(state => state.user)


    return(
        <>
        <nav className={styles.NavBarContainer}>
            
            <span className={styles.leftNav}>
                <div className={styles.logoHolder}></div>
                
                <Link to="/" className={styles.HomeLink}>Home</Link>
                <h1>Donate</h1>
            </span>
            <span className={styles.rightNav}>
                {user.isLoggedIn ?
                    <>
                    <h1 className={styles.LogOut}>Log-Out</h1>
                    <UserDashboardButton />
                    </>
                : 
                    <button className={styles.logInButton}>Log-In</button>
                }
            </span>
        </nav>
        <div className={styles.themeSwitcherContainer}>
        <ThemeSwitcher />
        </div>
        </>
    )
    //create login button component that handles login state and logic
}

