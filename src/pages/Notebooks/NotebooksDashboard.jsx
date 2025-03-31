import React from 'react';
import styles from './NotebooksDashboard.module.css';
import useUserStore from '../../hooks/useUserStore';
import { useEffect } from 'react'; //for fetching notebooks from the backend
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import SearchBar from './components/searchBar'; //notebooks search bar
import NotebookCard from './components/NotebookCard'; //notebook card
import NotebookCreator from './components/NotebookCreator';

//for context for what a notebook is. its a collection of 5 math problems and its fetched from the backend and stored in the database
//the user can create a notebook and add problems to it. the user can also delete a notebook and delete problems from it

const NotebooksDashboard = () => {
    const toggleUserLogIn = useUserStore(state => state.toggleLogIn);
    const user = useUserStore(state => state.user);
    const [notebooks, SetNotebooks] = useState([])
    const [displayedNotebooks, SetDisplayedNotebooks] = useState([])
    //will pull from local storage and API to fetch all notebooks and store them in an array state CURRENTLY IN TEST MODEL

    const notebooksPopulation = displayedNotebooks.map((notebook) => {
        return (
            <NotebookCard key={notebook.id} NotebookData={notebook} />
        )
    })

    const testNotebook = () => { //this is mock data efore backend integration
        SetNotebooks([
            { id: 1, name: "Algebra Basics", subtopic: "Linear Equations" },
            { id: 2, name: "Calculus 101", subtopic: "Derivatives" },
            { id: 3, name: "Geometry Fundamentals", subtopic: "Triangles" },
            { id: 4, name: "Statistics Overview", subtopic: "Probability" },
            { id: 5, name: "Advanced Topics", subtopic: "Integrals" },
            { id: 6, name: "Algebra Basics", subtopic: "Linear Equations" },
            { id: 7, name: "Calculus 101", subtopic: "Derivatives" },
            { id: 8, name: "Geometry Fundamentals", subtopic: "Triangles" },
            { id: 9, name: "Statistics Overview", subtopic: "Probability" },
            { id: 10, name: "Advanced Topics", subtopic: "Integrals" },
        ])
    }

    //map over the notebooks and make a second state displayedNotebooks those will be displayed and be whats returned with the search component
    useEffect(() => {
        SetDisplayedNotebooks(
            notebooks.map((notebook) => {
                return (
                    {...notebook}
                )
            })
        )
    }, [notebooks])


    //if user isnt logged in nothing is displayed and theyre redirected to home
    return (
        <div className={styles.notebookDashboardContainer}>
            {user.isLoggedIn ?
                <section className={styles.notebooksDashboard}>
                    <div className={styles.notebookHolderContainer}>
                        <div className={styles.notebookHolder}>
                            <h1 className={styles.notebookTitle}>Your Notebooks</h1>
                            <SearchBar nonFilteredNotebooks={notebooks} filterDisplayedNotebooks={SetDisplayedNotebooks}/>
                            <section className={styles.notebooksList}>
                                {notebooks.length > 0 ? 
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
        </div>
    );
};
//implement on logout redirect to home
export default NotebooksDashboard;

