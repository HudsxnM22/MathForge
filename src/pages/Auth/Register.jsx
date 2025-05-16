import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Auth.module.css';
import authAPI from '../../api/auth.api';
import { useForm } from 'react-hook-form'

const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm()
    const [registerError, setRegisterError] = useState(false)


    const navigate = useNavigate()
    
    const onSubmit = data => {

        const refinedData = { //just removes the confirm password for backend flow
            email: data.email,
            password: data.password,
        }

        authAPI.registerAPI(refinedData).then((response) => {
            if(response.status === 201){
                setRegisterError(false)
                console.log("Login successful")
                navigate("/notebooks")
            }else{
                setRegisterError(true)
            }
        })
    }

    return (
        <div className={styles.loginContainer}>
            <section className={styles.loginSection}>
                <h1 className={styles.loginTitle}>Register</h1>
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
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" className={styles.input} placeholder='Confirm Password' {...register('confirmPassword', {
                            required: true,
                            validate: (value) => {
                                if (value !== watch('password')) {
                                    return 'Passwords do not match';
                                }
                            }
                        })}/>
                        {errors.confirmPassword && <p className={styles.errorText}>{errors.confirmPassword.message}</p>}
                    </div>
                    {registerError && <p className={styles.errorText}>Email already in use</p>}
                    <button type='submit' className={styles.loginButton}>Register</button>
                    <p className={styles.registerText}>have an account? <Link to="/login" className={styles.linkToRegister}>Log-In</Link></p>
                </form>
            </section>
            <section className={styles.bannerHolder}>
                <div className={styles.banner}></div>
            </section>
        </div>
    )
}

export default Register