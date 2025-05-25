import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import NavBar from './NavBar/NavBar.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home.jsx'
import NotebooksDashboard from './pages/Notebooks/NotebooksDashboard.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import ForgotPassword from './pages/Auth/ForgotPassword.jsx';
import NewPassword from './pages/Auth/NewPassword.jsx';
import Footer from './Footer/Footer.jsx';
import Policies from './pages/Policies/Policies.jsx';
import { MathJaxContext } from 'better-react-mathjax';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notebooks" element={<NotebooksDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<NewPassword />} />
          <Route path="/policies" element={<Policies />} />
        </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)

