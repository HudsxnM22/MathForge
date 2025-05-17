import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Auth.module.css';
import authAPI from '../../api/auth.api';
import { useForm } from 'react-hook-form'

const NewPassword = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm()
    const [registerError, setRegisterError] = useState(false)


    const navigate = useNavigate()
    
    const onSubmit = data => {

        const refinedData = { //just removes the confirm password for backend flow
            password: data.password
        }

        authAPI.confirmResetPasswordAPI(refinedData).then(response => {
            if(response.status == 202){
                navigate("/login")
            }else{
                //this can only occur if JWT expired, therefore redirect to forgot-password
                navigate("/forgot-password")
            }
        })
    }

    return (
        <div className={styles.loginContainer}>
            <section className={styles.loginSection}>
                <h1 className={styles.loginTitle}>New Password</h1>
                <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
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
                        <label htmlFor="confirmPassword">Confirm New Password:</label>
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
                    {registerError && <p className={styles.errorText}>Password not valid</p>}
                    <button type='submit' className={styles.loginButton}>Change Password</button>
                </form>
            </section>
            <section className={styles.bannerHolder}>
                <div className={styles.banner}></div>
            </section>
        </div>
    )
}

export default NewPassword