import { create } from 'zustand'

const useTheme = create((set) => ({
    theme: 'light',
    changeTheme: () => set((state) => {
        const currentTheme = state.theme
        const root = document.querySelector(':root');
        if(currentTheme === 'light'){ //set theme to dark
            root.style.setProperty('--bg-main', 'rgb(72, 72, 72)') //background
            root.style.setProperty('--text-main', 'rgb(255, 255, 255)') //text
            root.style.setProperty('--logo-theme', `url('./src/assets/darkLogo.png')`) //logo
            return {theme: 'dark'}
        }else{ // set theme to light
            root.style.setProperty('--bg-main', 'rgb(255, 255, 255)')
            root.style.setProperty('--text-main', 'rgb(0, 0, 0)')
            root.style.setProperty('--logo-theme', `url('./src/assets/lightLogo.png')`)
            return {theme: 'light'}
        }
    })
}))

export default useTheme