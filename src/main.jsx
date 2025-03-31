import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import NavBar from './NavBar/NavBar.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home.jsx'
import NotebooksDashboard from './pages/Notebooks/NotebooksDashboard.jsx';
import { MathJaxContext } from 'better-react-mathjax';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notebooks" element={<NotebooksDashboard />} />
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)

