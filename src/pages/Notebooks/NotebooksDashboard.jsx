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
import notebooksApi from '../../api/notebooks.api.js';
import useUserNotebookStore from '../../hooks/useUserNotebookStore.js';


//for context for what a notebook is. its a collection of 5 math problems and its fetched from the backend and stored in the database
//the user can create a notebook and add problems to it. the user can also delete a notebook and delete problems from it

const NotebooksDashboard = () => {
    const user = useUserStore(state => state.user)
    const userNotebooks = useUserNotebookStore(state => state.notebooks)
    const [notebooks, setNotebooks] = useState([])
    const [displayedNotebooks, setDisplayedNotebooks] = useState([])
    const [notebookPage, setNotebookPage] = useState(null)
    const [notebooksError, setNotebooksError] = useState(false)
    //will pull from local storage and API to fetch all notebooks and store them in an array state CURRENTLY IN TEST MODEL

    const notebooksPopulation = displayedNotebooks.map((notebook) => {
        return (
            <NotebookCard key={notebook.notebookId} NotebookData={notebook} setNotebookPage={setNotebookPage} />
        )
    })


    //ensure you put a try catch so if the backend is down it just sends a failsafe notification

    const fetchNotebooksFromAPI = () => {
        notebooksApi.getAllNotebooksAPI()
            .then((response) => {
                if (response.status === 200) {
                    setNotebooks(response.data);
                    setDisplayedNotebooks(response.data);
                    setNotebooksError(false)
                } else {
                    setNotebooksError(true)
                }
            })
            .catch((error) => {
                console.error('Error fetching notebooks:', error);
            });
    }

    useEffect(() => {
        try {
            window.MathJax.typeset();
        }catch (e) {
            console.error('MathJax error:', e);
        }
    }, [displayedNotebooks])

    //prevents scrolling while the User has the flashcard page up mostly a cosmetic design choice
    useEffect(() => {
        if (notebookPage) {
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100vh';
        } else {
            document.body.style.overflow = 'auto';
            document.body.style.height = 'auto';
        }
        
        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.height = 'auto';
        };
    }, [notebookPage]);

    useEffect(() => {
        //the api layer sets the global state. if global state is filled pull from that not global state
        if(userNotebooks.length > 0){
            setNotebooks(userNotebooks)
            setDisplayedNotebooks(userNotebooks)
        }else{
            fetchNotebooksFromAPI()
        }
    }, [])


    //if user isnt logged in nothing is displayed and theyre redirected to home
    return (
        <div className={styles.notebookDashboardContainer}>
            
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
                                    <h1 className={styles.emptyNotebookMessage}>{notebooksError ? "Notebooks error" : "No Notebooks Found"}</h1>
                                }
                            </section>
                        </div>
                    </div>
                    <NotebookCreator setNotebookPage={setNotebookPage}/>
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

