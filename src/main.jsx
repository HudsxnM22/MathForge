import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import NavBar from './NavBar.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavBar />
  </StrictMode>,
)
