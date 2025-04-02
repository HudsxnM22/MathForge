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

    const testNotebook = () => { //this is mock data before backend integration
        SetNotebooks([
            { id: 1, name: "Algebra Basics", subtopic: "Linear Equations", difficulty: 2, q1: 'Evaluate the integral: \\[ \\int x^2 \\,dx \\]'},
            { id: 2, name: "Calculus 101", subtopic: "Derivatives" , difficulty: 0, q1: "Compute the following integral: \\[ \\int (3x + 5) \\,dx \\]"},
            { id: 3, name: "Geometry Fundamentals", subtopic: "Triangles" , difficulty: 3, q1: "Find the indefinite integral: \\[ \\int e^x \\,dx \\]"},
            { id: 4, name: "Statistics Overview", subtopic: "Probability" , difficulty: 3, q1: "Determine the integral of the function: \\[ \\int \\frac{1}{x} \\,dx \\]"},
            { id: 5, name: "Advanced Topics", subtopic: "Integrals" , difficulty: 2, q1: "Evaluate the following integral: \\[ \\int \\cos x \\,dx \\]"},
            { id: 6, name: "Algebra Basics", subtopic: "Linear Equations" , difficulty: 2, q1: "Solve for \\( x \\) in the quadratic equation: \\[ 4x^2 - 9x + 2 = 0 \\]"},
            { id: 7, name: "Calculus 101", subtopic: "Derivatives" , difficulty: 1, q1: "Find the values of \\( x \\) that satisfy the equation: \\[ 3x^2 + \\sqrt{2}x - 5 = 0 \\]"},
            { id: 8, name: "Geometry Fundamentals", subtopic: "Triangles" , difficulty: 1, q1: "Determine the roots of the quadratic equation using the quadratic formula: \\[ 5x^2 - 7x + 1 = 0 \\]"},
            { id: 9, name: "Statistics Overview", subtopic: "Probability" , difficulty: 1, q1: "If the quadratic equation \\( ax^2 + bx + c = 0 \\) has roots \\( \\alpha \\) and \\( \\beta \\), express \\( \\alpha^2 + \\beta^2 \\) in terms of \\( a, b, \\) and \\( c \\)."},
            { id: 10, name: "Advanced Topics", subtopic: "Integrals" , difficulty: 3, q1: "Find the range of values for \\( k \\) such that the equation \\[ x^2 - (k+2)x + k = 0 \\] has real and distinct roots."},
        ])
    }

    useEffect(() => {
        window.MathJax.typeset()
    })

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

