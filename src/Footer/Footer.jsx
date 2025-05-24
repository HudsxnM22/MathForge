import React from "react"
import styles from "./Footer.module.css"
import { Link } from "react-router-dom"

const Footer = () => {


    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerSocials}>
                    <a className={styles.socialsLink} href="https://github.com/HudsxnM22/MathForge">Github</a>
                </div>
                <div className={styles.footerLinks}>
                    <Link to="/policies" className={styles.footerLink}>Privacy Policy</Link>
                    <Link to="/policies" className={styles.footerLink}>Terms of Service</Link>
                    <Link to="/policies" className={styles.footerLink}>Disclaimer</Link>
                </div>
                <div className={styles.footerText}>
                    <p>© 2025 MathForge. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
