import React from 'react';
import 'rsuite/dist/rsuite.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
// pages
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
                <Route path="/" element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                    } />
                <Route path="/nuevoingreso" element={
                    <PrivateRoute>
                        <NuevoIngreso />
                    </PrivateRoute>} />
                <Route path="/reincorporados" element={
                    <PrivateRoute>
                        <Reincorporados />
                    </PrivateRoute>
                    } />
                <Route path="/regulares" element={
                    <PrivateRoute>
                        <Regulares/>
                    </PrivateRoute>
                    } />
                <Route path="/egresados" element={
                    <PrivateRoute>
                        <Egresados/>
                    </PrivateRoute>
                } />
                <Route path="/noinscritos" element={
                    <PrivateRoute>
                        <NoInscritos/>
                    </PrivateRoute>
                    } />
                < Route path='/extension' element={
                    <PrivateRoute>
                        <Extension/>
                    </PrivateRoute>
                    } />
            </Routes>
        </Router>
    );
}

export default App;
