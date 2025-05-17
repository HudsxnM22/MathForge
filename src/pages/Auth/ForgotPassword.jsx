import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Auth.module.css';
import authAPI from '../../api/auth.api';
import { useForm } from 'react-hook-form';
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [verifyError, setVerifyError] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        if (!emailSent) {
            setIsLoading(true)
            setEmailSent(true)
            try {
                const response = await authAPI.resetPasswordAPI(data)
            } catch (error) {
                console.error(error)
            }
        } else {
            try {
                const response = await authAPI.validateResetPasswordAPI(data)
                if (response.status === 202) {
                    navigate('/reset-password')
                } else {
                    setVerifyError(true)
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <div className={styles.loginContainer}>
            <section className={styles.loginSection}>
                <h1 className={styles.loginTitle}>Reset Password</h1>
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
                        {emailSent && <p className={styles.emailSentText}>Code sent to email.</p>}
                    </div>
                    {emailSent && 
                        <div>
                            <label htmlFor="code">Code:</label>
                            <input type="text" id="code" name="code" className={styles.input} placeholder='Enter Code' {...register('code', {
                                required: true,
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'code must be only numbers'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'code must be at least 6 numbers long'
                                },
                                maxLength: {
                                    value: 6,
                                    message: 'code must be at most 6 numbers long'
                                }
                            })}/>
                            {errors.code && <p className={styles.errorText}>{errors.code.message}</p>}
                            {verifyError && <p className={styles.errorText}>
                                Invalid Code 
                                <p className={styles.emailSentText} onClick={() => {
                                    setEmailSent(false)
                                    setVerifyError(false)
                                }}>Resend Code?</p>
                            </p> 
                            }

                        </div>
                    }
                    <button type='submit' className={styles.loginButton}>{emailSent ? "Verify" : "Send Code"}</button>
                    <p className={styles.registerText}>Don't have an account? <Link to="/register" className={styles.linkToRegister}>Register</Link></p>
                </form>
            </section>
            <section className={styles.bannerHolder}>
                <div className={styles.banner}></div>
            </section>
        </div>
    )
}

export default ForgotPassword