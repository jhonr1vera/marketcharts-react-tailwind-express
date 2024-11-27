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
import Extension from './pages/Entension';
import UNuevoIngreso from './pages/user/UNuevoIngreso';
import UReincorporados from './pages/user/UReincorporados';
import URegulares from './pages/user/URegulares';
import UEgresados from './pages/user/UEgresados';
import UNoInscritos from './pages/user/UNoInscritos';
import UExtension from './pages/user/UExtension';
import './App.css';

function App() {
    const privateRoutes = [
        { path: '/nuevoingreso', component: NuevoIngreso, allowedRoles: ['admin'] },
        { path: '/reincorporados', component: Reincorporados, allowedRoles: ['admin'] },
        { path: '/regulares', component: Regulares, allowedRoles: ['admin'] },
        { path: '/egresados', component: Egresados, allowedRoles: ['admin'] },
        { path: '/noinscritos', component: NoInscritos, allowedRoles: ['admin'] },
        { path: '/extension', component: Extension, allowedRoles: ['admin'] },
        { path: '/user_nuevoIngreso', component: UNuevoIngreso, allowedRoles: ['user'] },
        { path: '/user_reincorporados', component: UReincorporados, allowedRoles: ['user'] },
        { path: '/user_regulares', component: URegulares, allowedRoles: ['user'] },
        { path: '/user_egresados', component: UEgresados, allowedRoles: ['user'] },
        { path: '/user_noinscritos', component: UNoInscritos, allowedRoles: ['user'] },
        { path: '/user_extension', component: UExtension, allowedRoles: ['user'] },
    ];

    return (
        <Router>
    <Routes>
        <Route 
            path="/" 
            element={
                <PrivateRoute allowedRoles={['admin', 'user']}>
                    <Home />
                </PrivateRoute>
            } 
        />
        <Route path="/login" element={<Login />} />
        {privateRoutes.map(({ path, component: Component, allowedRoles }) => (
            <Route
                key={path}
                path={path}
                element={
                    <PrivateRoute allowedRoles={allowedRoles}>
                        <Component />
                    </PrivateRoute>
                }
            />
        ))}
    </Routes>
</Router>
    );
}

export default App;
