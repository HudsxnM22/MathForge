import React from 'react';
import styles from './NotebooksDashboard.module.css';
import useUserStore from '../../hooks/useUserStore';
import { Navigate } from 'react-router-dom';


const NotebooksDashboard = () => {
    const toggleUserLogIn = useUserStore(state => state.toggleLogIn);
    const user = useUserStore(state => state.user);

    return (
        <>
            {user.isLoggedIn ?
                <div>
                    <h1>Your NoteBooks</h1>
                    <p>Create Notebooks</p>
                    <button onClick={toggleUserLogIn}>Test Login UI</button>
                </div>
            :
                <Navigate to="/" />
            }
        </>
    );
};
//implement on logout redirect to home
export default NotebooksDashboard;