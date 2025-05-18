import { create } from 'zustand'

//global state so its stored in memory rather than the 5mb capped browser db
const useUserNotebookStore = create((set) => ({
    notebooks: [],

    setNotebooks: (notebooks) => set({ notebooks }),
}))

export default useUserNotebookStore