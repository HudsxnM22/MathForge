import React from 'react'
import styles from './NotebookPage.module.css'
import { useState, useEffect } from 'react'
import Flashcard from './Flashcard'


const NotebookPage = ({ notebook, setNotebookPage }) => {
    const [questions, setQuestions] = useState([
        [notebook.notebookSet.q1Latex, notebook.notebookSet.q1Solution.queryresult],
        [notebook.notebookSet.q2Latex, notebook.notebookSet.q2Solution.queryresult],
        [notebook.notebookSet.q3Latex, notebook.notebookSet.q3Solution.queryresult],
        [notebook.notebookSet.q4Latex, notebook.notebookSet.q4Solution.queryresult],
        [notebook.notebookSet.q5Latex, notebook.notebookSet.q5Solution.queryresult],
    ])
    const [index, setIndex] = useState(0)

    //pointer points to position within the array and displays the question on the flashcard component based on where the pointer is in the array
    const incrementIndex = () => {
        if (index < questions.length - 1) {
            setIndex(index + 1)
        }
    }

    //sure hope this is spelled right
    const decrementIndex = () => {
        if (index > 0){
            setIndex(index - 1)
        }
    }
    //displays card at given index


    
    //array of arrays that hold question at pos[0] and answer at pos[1], may be change in later version based on backend integration tests
    return (
        <div className={styles.flashcardContainer}>
            <button className={styles.leftButton} onClick={decrementIndex}>{'<'}</button>
            <Flashcard question={questions[index]} />
            <button className={styles.rightButton} onClick={incrementIndex}>{'>'}</button>
            <button className={styles.exitButton} onClick={() => setNotebookPage(null)}>exit</button>
        </div>
    )
}

export default NotebookPage