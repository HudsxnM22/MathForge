import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Auth.module.css';
import authAPI from '../../api/auth.api';
import { useForm } from 'react-hook-form';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [loginError, setLoginError] = useState(false)

    const navigate = useNavigate()
    
    const onSubmit = data => {
        authAPI.loginAPI(data).then((response) => {
            if(response.status === 200){
                setLoginError(false)
                console.log("Login successful")
                navigate("/notebooks")
            }else{
                setLoginError(true)
            }
        })
    }

    return (
        <div className={styles.loginContainer}>
            <section className={styles.loginSection}>
                <h1 className={styles.loginTitle}>Login</h1>
                <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" className={styles.input} placeholder='Enter Email' {...register('email', {
                            required: true,
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Invalid email address'
                            }
                        })}/>
                        {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" className={styles.input} placeholder='Enter Password' {...register('password', {
                            required: true,
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters long'
                            }
                        })}/>
                        {errors.password && <p className={styles.errorText}>{errors.password.message}</p>}
                        <p className={styles.forgotPasswordText}><Link to="/forgot-password" className={styles.linkToRegister}>Forgot Password?</Link></p>
                    </div>
                    {loginError && <p className={styles.errorText}>Email or Password is incorrect</p>}
                    <button type='submit' className={styles.loginButton}>Login</button>
                    <p className={styles.registerText}>Don't have an account? <Link to="/register" className={styles.linkToRegister}>Register</Link></p>
                </form>
            </section>
            <section className={styles.bannerHolder}>
                <div className={styles.banner}></div>
            </section>
        </div>
    )
}

export default Login