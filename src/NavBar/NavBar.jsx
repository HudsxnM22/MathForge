import React from "react";
import { useState, useEffect } from 'react'
import styles from './NavBar.module.css'
import { Link, useNavigate } from 'react-router-dom';
import useUserStore from '../hooks/useUserStore'
import ThemeSwitcher from './navbar-component/ThemeSwitcher'
import UserDashboardButton from "./navbar-component/UserDashboardButton";
import UserSideBar from "./navbar-component/UserSideBar";
import authAPI from "../api/auth.api"
import useUserNotebookStore from "../hooks/useUserNotebookStore";
import useUserNotebookAvailStore from "../hooks/userNotebookAvailStore";
import notebooksApi from "../api/notebooks.api";

export default function NavBar() {
    const user = useUserStore(state => state.user)
    const [isMenuOpen, toggleMenuOpen] = useState(false)
    const setNotebooksStore = useUserNotebookStore(state => state.setNotebooks)
    const useNotebookAvailStore = useUserNotebookAvailStore(state => state.notebooksAvail)


    const navigate = useNavigate()
    
    const handleLogInClick = () => {
        navigate("/login")
    }

    //every 15 seconds updates the users available notebooks and global count
    useEffect(() => {
        if (!user.isLoggedIn) return;
        notebooksApi.getNotebookAvailabilityAPI()//initializes the first count
    
        const intervalNotebooksAvail = setInterval(() => {
            notebooksApi.getNotebookAvailabilityAPI();
        }, 15000)

        //every 55 minutes refreshes the JWT token, HTTP only cookie
        const intervalRefreshJWT = setInterval(() => {
            authAPI.refreshJWT().then((response) => {
                if(response.status === 202){
                    console.log("Refresh successful")
                }else{
                    navigate("/login")
                }
            })
        }, 3300000) //55 minutes until JWT refresh
    
        return () => {
            clearInterval(intervalNotebooksAvail)
            clearInterval(intervalRefreshJWT)
        }
    }, [user.isLoggedIn])

    //refreshes the JWT token on page load, if the user is logged in. and relogs in user upon page reload...
    useEffect(() => {
        authAPI.refreshAPI().then(
            (response) => {
                if(response.status === 202){
                    console.log("Reloggedin successful") 
                }
            }
        ).catch((error) => {
            console.error('Error logging in via JWT:', error);
        }
        )
    }, [])


    return(
        <>
        <nav className={styles.NavBarContainer}>
            
            <span className={styles.leftNav}>
                <div className={styles.logoHolder} onClick={() => {navigate("/")}}></div>
                <h1 onClick={() => {
                    window.open("https://gofund.me/5b0ee3b4", "_blank");
                }}>Donate</h1>
            </span>
            <span className={styles.rightNav}>
                {user.isLoggedIn ?
                    <>
                    <h1 className={styles.LogOut} onClick={() => {
                        authAPI.logoutAPI().then((response) => {
                            if(response.status === 200){
                                console.log("Logout successful")
                            }else{
                                console.log("Logout failed")
                            }
                        })
                        setNotebooksStore([]) //clears memory of notebooks upon logout
                        navigate("/")
                    }}>Log-Out</h1>
                    <UserDashboardButton onClick={() => {
                        toggleMenuOpen(!isMenuOpen)
                    }}/>
                    </>
                : 
                    <button className={styles.logInButton} onClick={handleLogInClick}>Log-In</button>
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

