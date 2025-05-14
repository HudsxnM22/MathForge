import { create } from 'zustand'

const useUserNotebookAvailStore = create((set) => ({
    notebooksAvail: {
        globalNotebooksAvail: 0,
        userNotebooksAvail: 0
    },

    setNotebooksAvail: ({ globalNotebooksAvail, userNotebooksAvail }) => {
        set((state) => {
            return {
                notebooksAvail: {
                    ...state.notebooksAvail,
                    globalNotebooksAvail: globalNotebooksAvail,
                    userNotebooksAvail: userNotebooksAvail
                }
            }
        })
    }
}))

export default useUserNotebookAvailStore