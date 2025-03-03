import { create } from 'zustand'

const useUserStore = create((set) => ({
    user: {
        email: '',
        password: '',
        isLoggedIn: false
    },


    //test set functions for front end logic, to be removed.
    toggleLogIn: () => set((state) => ({
        user: {
            ...state.user,
            isLoggedIn: !state.user.isLoggedIn
        }
    })),
}))

export default useUserStore
