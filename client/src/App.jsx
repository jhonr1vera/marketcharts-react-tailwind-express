import React from 'react';
import 'rsuite/dist/rsuite.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import NuevoIngreso from './pages/NuevoIngreso';
import Reincorporados from './pages/Reincorporados';
import Regulares from './pages/Regulares';
import Egresados from './pages/Egresados';
import NoInscritos from './pages/NoInscritos';
import Extension from './pages/Entension'
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/nuevoingreso" element={<NuevoIngreso />} />
                <Route path="/reincorporados" element={<Reincorporados />} />
                <Route path="/regulares" element={<Regulares/>} />
                <Route path="/egresados" element={<Egresados/>} />
                <Route path="/noinscritos" element={<NoInscritos/>} />
                < Route path='/extension' element={<Extension/>} />
            </Routes>
        </Router>
    );
}

export default App;
