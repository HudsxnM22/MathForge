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

    //array of arrays that hold question at pos[0] and answer at pos[1], passes data to notebook displaying the data based on given pointer, images will be later changed to Base64 and stored in memory
    return (
        <div className={styles.flashcardContainer}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0)" className={styles.button} onClick={decrementIndex} style={{cursor: index > 0? '' : 'default'}}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style={{fill: index > 0 ? '' : 'transparent'}} fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z" fill="#000000"></path> </g></svg>
            <Flashcard question={questions[index]} />
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)" className={styles.button} onClick={incrementIndex} style={{cursor: index < questions.length - 1? '' : 'default'}}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style={{fill: index < questions.length - 1 ? '' : 'transparent'}} fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z" fill="#000000"></path> </g></svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={styles.exitButton} onClick={() => setNotebookPage(null)}><defs><mask id="xMask"><circle cx="50" cy="50" r="45" fill="white"/><line x1="30" y1="30" x2="70" y2="70" stroke="black" stroke-width="7" stroke-linecap="round"/><line x1="70" y1="30" x2="30" y2="70" stroke="black" stroke-width="7" stroke-linecap="round"/></mask></defs><circle cx="50" cy="50" r="45" fill="#f5f5f5" mask="url(#xMask)"/></svg>
        </div>
    )
    //
}

export default NotebookPage