import React from 'react';
import styles from './NotebooksDashboard.module.css';
import useUserStore from '../../hooks/useUserStore';
import { useEffect } from 'react'; //for fetching notebooks from the backend
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import SearchBar from './components/searchBar'; //notebooks search bar
import NotebookCard from './components/NotebookCard'; //notebook card
import NotebookCreator from './components/NotebookCreator';
import getNotebookTests from '../../api/notebooks.api.js';
import NotebookPage from './components/notebookOpenUI/NotebookPage.jsx'


//for context for what a notebook is. its a collection of 5 math problems and its fetched from the backend and stored in the database
//the user can create a notebook and add problems to it. the user can also delete a notebook and delete problems from it

const NotebooksDashboard = () => {
    const toggleUserLogIn = useUserStore(state => state.toggleLogIn);
    const user = useUserStore(state => state.user);
    const [notebooks, setNotebooks] = useState([])
    const [displayedNotebooks, setDisplayedNotebooks] = useState([])
    const [notebookPage, setNotebookPage] = useState(null)
    //will pull from local storage and API to fetch all notebooks and store them in an array state CURRENTLY IN TEST MODEL

    const notebooksPopulation = displayedNotebooks.map((notebook) => {
        return (
            <NotebookCard key={notebook.id} NotebookData={notebook} setNotebookPage={setNotebookPage} />
        )
    })


    //ensure you put a try catch so if the backend is down it just sends a failsafe notification
    
    const testNotebook = async () => {
        try {
            const data = await getNotebookTests()
            setNotebooks([data])
            setDisplayedNotebooks([data])
            console.log(data)
        } catch (error) {
            console.error('Failed to fetch notebook data:', error)
            //set a fallback state or notification here
        }
    };

    useEffect(() => {
        window.MathJax.typeset()
    })




    //if user isnt logged in nothing is displayed and theyre redirected to home
    return (
        <div className={styles.notebookDashboardContainer} >
            
            {user.isLoggedIn ?
                <section className={styles.notebooksDashboard} style={{overflow: notebookPage ? 'hidden' : 'auto'}}>
                    <div className={styles.notebookHolderContainer}>
                        <div className={styles.notebookHolder}>
                            <h1 className={styles.notebookTitle}>Your Notebooks</h1>
                            <SearchBar nonFilteredNotebooks={notebooks} filterDisplayedNotebooks={setDisplayedNotebooks}/>
                            <section className={styles.notebooksList}>
                                {displayedNotebooks.length > 0 ? 
                                    notebooksPopulation
                                :
                                    <h1 className={styles.emptyNotebookMessage}>No Notebooks found</h1>
                                }
                            </section>
                        </div>
                    </div>
                    <NotebookCreator />
                    <button onClick={testNotebook}>Test</button>
                </section>
            :
                <Navigate to="/" />
            }
            {notebookPage ? 
                <NotebookPage notebook={notebookPage} setNotebookPage={setNotebookPage} />
                :
                <></>
            }
        </div>
    );
};
//implement on logout redirect to home
export default NotebooksDashboard;

