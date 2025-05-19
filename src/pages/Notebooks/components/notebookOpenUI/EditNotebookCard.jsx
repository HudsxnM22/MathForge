import React from 'react'
import styles from './EditNotebook.module.css'
import { useForm } from 'react-hook-form'
import notebooksApi from '../../../../api/notebooks.api'

const EditNotebookCard = ({notebook, setNotebookCard}) => {
    const { register, handleSubmit } = useForm()

    //this changes the name of the notebook then reupdates the list by calling get all notebooks
    const onSubmit = (data) => {
        notebooksApi.updateNotebookAPI({id: notebook.notebookId, name: data.notebookName}).then(response => {
            if(response.status == 200){
                console.log('Notebook updated successfully')
                notebooksApi.getAllNotebooksAPI() //update list and remove the delted notebook
                setNotebookCard(null)
            }else{
                console.error('Error updating notebook:', response.status);
            }
        })
    }

    const deleteNotebook = () => {
        notebooksApi.deleteNotebookAPI({id: notebook.notebookId}).then(response => {
            if(response.status == 204){
                console.log('Notebook deleted successfully')
                notebooksApi.getAllNotebooksAPI() //update list and remove the delted notebook
                setNotebookCard(null)
            }else{
                console.error('Error deleting notebook:', response.status);
            }
        })
    }

    return (
        <div className={styles.editNotebookCardContainer}>
            <div className={styles.editNotebookCardClose} onClick={() => setNotebookCard(null)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </div>
            <div className={styles.editNotebookCardTitle}>
                Edit Notebook
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <input type="text" {...register('notebookName', {
                    required: true,
                    maxLength: 20,
                    minLength: 1
                })} placeholder={notebook.notebookName} />
                <button type="button" className={styles.deleteButton} onClick={deleteNotebook}>Delete Notebook</button>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default EditNotebookCard