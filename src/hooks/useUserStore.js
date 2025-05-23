import { create } from 'zustand'


const useUserStore = create((set) => ({
    
    user: {
        email: "",
        logInTime: null,
        isLoggedIn: false
    },

    setLogIn: ({ email }) => {
        //if the log in time is in storage then do nothing because that means they most likely refreshed the page, upon which it will recall backend and log in again
        const logInTime = new Date()

            set(() => ({
            user: {
                email: email,
                logInTime: logInTime,
                isLoggedIn: true
            }
        }))
    },

    setLogOut: () => {
        set(() => ({
            user: {
                email: "",
                logInTime: null,
                isLoggedIn: false
            }
        }))
    }
}))

export default useUserStore
