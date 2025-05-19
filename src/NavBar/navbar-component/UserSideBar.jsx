import React from 'react'
import styles from './UserSideBar.module.css'
import useUserStore from '../../hooks/useUserStore'
import { useEffect } from 'react'
import useUserNotebookAvailStore from '../../hooks/userNotebookAvailStore'

const UserSideBar = () => {
    const availNotebooks = useUserNotebookAvailStore(state => state.notebooksAvail)
    const user = useUserStore(state => state.user)

    return (
        <div className={styles.menuHolder}>
            <span className={styles.userSideTile}>Available Community NoteBooks: {availNotebooks.globalNotebooksAvail}</span>
            <span className={styles.userSideTile}>Your Available NoteBooks: {availNotebooks.userNotebooksAvail}</span>
            <span className={styles.userSideTile}>{user.email}</span>

        </div>
    )
}

export default UserSideBar //placeholder data for notebook counts will be fetched from API