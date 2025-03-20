import React from "react";
import { useState } from 'react'
import styles from './NavBar.module.css'
import { Link } from 'react-router-dom';
import useUserStore from '../hooks/useUserStore'
import ThemeSwitcher from './navbar-component/ThemeSwitcher'
import UserDashboardButton from "./navbar-component/UserDashboardButton";
import UserSideBar from "./navbar-component/UserSideBar";

export default function NavBar() {
    const user = useUserStore(state => state.user)
    const [isMenuOpen, toggleMenuOpen] = useState(false)


    return(
        <>
        <nav className={styles.NavBarContainer}>
            
            <span className={styles.leftNav}>
                <div className={styles.logoHolder}></div>
                <h1>Donate</h1>
            </span>
            <span className={styles.rightNav}>
                {user.isLoggedIn ?
                    <>
                    <h1 className={styles.LogOut}>Log-Out</h1>
                    <UserDashboardButton onClick={() => {
                        toggleMenuOpen(!isMenuOpen)
                    }}/>
                    </>
                : 
                    <button className={styles.logInButton}>Log-In</button>
                }
            </span>
        </nav>

        {isMenuOpen && user.isLoggedIn ? <UserSideBar /> : <></>}

        <nav className={styles.SideNav}>
            {user.isLoggedIn ?
                <>
                    <Link to="/" className={styles.SideButton}><h4 className={styles.sidebuttontext}>Home</h4></Link>
                    <Link to="/notebooks" className={styles.SideButton}><h4 className={styles.sidebuttontext}>Notebooks</h4></Link>
                </>
                : 
                <></>
            }
        </nav>
        <div className={styles.themeSwitcherContainer}>
        <ThemeSwitcher />
        </div>
        </>
    )
    //create login button component that handles login state and logic
}

