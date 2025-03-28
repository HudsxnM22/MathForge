import React from "react";
import styles from './NotebookCreator.module.css'

const NotebookCreator = () => {

    //to do: integrate with back end POST create request
    return (
        <div className={styles.notebookCreatorContainer}>
            <h2 className={styles.creatorTitle}>Notebook Creator</h2>
        </div>
    )
}

export default NotebookCreator