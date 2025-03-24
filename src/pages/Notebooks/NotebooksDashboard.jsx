import React from 'react';
import styles from './NotebooksDashboard.module.css';
import useUserStore from '../../hooks/useUserStore';
import { Navigate } from 'react-router-dom';

//for context for what a notebook is. its a collection of 5 math problems and its fetched from the backend and stored in the database
//the user can create a notebook and add problems to it. the user can also delete a notebook and delete problems from it

const NotebooksDashboard = () => {
    const toggleUserLogIn = useUserStore(state => state.toggleLogIn);
    const user = useUserStore(state => state.user);

    return (
        <div className={styles.notebookDashboardContainer}>
            {user.isLoggedIn ?
                <section className={styles.notebooksDashboard}>
                    <div className={styles.notebookHolderContainer}>
                        <div className={styles.notebookHolder}>

                        </div>
                    </div>
                </section>
            :
                <Navigate to="/" />
            }
        </div>
    );
};
//implement on logout redirect to home
export default NotebooksDashboard;