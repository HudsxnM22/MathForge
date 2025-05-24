import { create } from 'zustand'

const useTheme = create((set) => ({
    theme: 'light',
    changeTheme: () => set((state) => {
        const currentTheme = state.theme
        const root = document.querySelector(':root');
        if(currentTheme === 'light'){ //set theme to dark
            root.style.setProperty('--bg-main', 'rgb(78, 78, 78)') //background
            root.style.setProperty('--text-main', 'rgb(255, 255, 255)') //text
            root.style.setProperty('--logo-theme', `url('./src/assets/darkLogo.png')`) //logo
            root.style.setProperty('--footer-bg', 'linear-gradient(135deg, #3a3a3a 0%, #1f1f1f 100%)')
            root.style.setProperty('--footer-text', '#738394')
            return {theme: 'dark'}
        }else{ // set theme to light
            root.style.setProperty('--bg-main', 'rgb(255, 255, 255)')
            root.style.setProperty('--text-main', 'rgb(0, 0, 0)')
            root.style.setProperty('--logo-theme', `url('./src/assets/lightLogo.png')`)
            root.style.setProperty('--footer-bg', 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf0 100%)')
            root.style.setProperty('--footer-text', '#2c3e50')
            return {theme: 'light'}
        }
    })
}))

export default useTheme