import React from 'react';
import styles from './NotebooksDashboard.module.css';
import useUserStore from '../../hooks/useUserStore';
import { Navigate } from 'react-router-dom';
import SearchBar from './components/searchBar'; //notebooks search bar
import NotebookCard from './components/NotebookCard'; //notebook card
import NotebookCreator from './components/NotebookCreator';

//for context for what a notebook is. its a collection of 5 math problems and its fetched from the backend and stored in the database
//the user can create a notebook and add problems to it. the user can also delete a notebook and delete problems from it

const NotebooksDashboard = () => {
    const toggleUserLogIn = useUserStore(state => state.toggleLogIn);
    const user = useUserStore(state => state.user);
    //will pull from local storage to fetch all notebooks and store them in an array state CURRENTLY IN TEST MODEL



    return (
        <div className={styles.notebookDashboardContainer}>
            {user.isLoggedIn ?
                <section className={styles.notebooksDashboard}>
                    <div className={styles.notebookHolderContainer}>
                        <div className={styles.notebookHolder}>
                            <h1 className={styles.notebookTitle}>Your Notebooks</h1>
                            <SearchBar />
                            <section className={styles.notebooksList}>
                                {/* Currently just a mock notebook */}
                                <NotebookCard NotebookData={{
                                    name: "Pre-calc Notebook",
                                    topic: "pre-calc",
                                    subtopic: "trig identities"
                                }}/>
                            </section>
                        </div>
                    </div>
                    <NotebookCreator />
                </section>
            :
                <Navigate to="/" />
            }
        </div>
    );
};
//implement on logout redirect to home
export default NotebooksDashboard;