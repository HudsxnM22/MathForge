import React from 'react'
import styles from './NotebookPage.module.css'
import { useState, useEffect } from 'react'
import Flashcard from './Flashcard'


const NotebookPage = ({ notebook, setNotebookPage }) => {
    const [questions, setQuestions] = useState([
        [notebook.notebookSet.q1Latex, notebook.notebookSet.q1Solution],
        [notebook.notebookSet.q2Latex, notebook.notebookSet.q2Solution],
        [notebook.notebookSet.q3Latex, notebook.notebookSet.q3Solution],
        [notebook.notebookSet.q4Latex, notebook.notebookSet.q4Solution],
        [notebook.notebookSet.q5Latex, notebook.notebookSet.q5Solution],
    ])
    const [index, setIndex] = useState(0)

    //displays card at given index


    
    //array of arrays that hold question at pos[0] and answer at pos[1], may be change in later version based on backend integration tests

    
    return (
        <div className={styles.flashcardContainer}>
            <button onClick={() => setNotebookPage(null)}>exit</button>
        </div>
    )
}

export default NotebookPage