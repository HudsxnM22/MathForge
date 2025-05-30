import React from 'react'
import styles from './searchBar.module.css'
//this is mostly for the good styling

const SearchBar = ({nonFilteredNotebooks, filterDisplayedNotebooks}) => {
    //change props, kinda just a template for whats to come

    const searchNotebooks = (e) => {
        const searchQuery = e.target.value;
        const filteredNotebooks = nonFilteredNotebooks.filter((notebook) => {
            return notebook.notebookName.toLowerCase().includes(searchQuery.toLowerCase());
        })
        if(searchQuery){
            filterDisplayedNotebooks(filteredNotebooks)
        }else{
            filterDisplayedNotebooks(nonFilteredNotebooks)
        }
        
    }
    
    return (
        <div className={styles.box}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
                type="text"
                className={styles.input}
                placeholder="Search Notebooks..."
                onChange={searchNotebooks}
            />
        </div>
      );
}
//add onChange to the input 
export default SearchBar