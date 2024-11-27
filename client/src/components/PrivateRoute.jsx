import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export const PrivateRoute = ({children, allowedRoles}) => {

    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const decoded = jwtDecode(token);

        if (!allowedRoles.includes(decoded.userrol)) {
            return <Navigate to="/" />;
        }

        return children;
    } catch (error) {
        return <Navigate to="/login" />;
    }
}