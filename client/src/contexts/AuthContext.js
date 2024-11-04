import React, { useState, useEffect, useContext } from "react";
import {jwtDecode} from "jwt-decode";
const AuthnContext = React.createContext();

export function useAuth() {
    return useContext(AuthnContext);
}

export function AuthProvider(props) {
    const [authUser, setAuthUser] = useState(null);
    const [isSignedIn, setIsSignedIn] = useState(null);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setAuthUser(decoded.username);
                setIsSignedIn(true);
            } catch (error) {
                console.log("Failed to decode token:", error);
                setIsSignedIn(false);
            }
        }
    }, []);

    const getToken = () => {
        return localStorage.getItem("token");
    }
    const signIn = (token) => {
        try {
            const decoded = jwtDecode(token);
            setAuthUser(decoded.username);
            setIsSignedIn(true);
            localStorage.setItem("token", token);
        } catch (error) {
            console.log("Failed to decode token:", error);
        }
    };

    const signOut = () => {
        setAuthUser(false);
        setIsSignedIn(false);
        localStorage.clear();
    }

    const value = {
        authUser,
        setAuthUser,
        isSignedIn,
        setIsSignedIn,
        signIn,
        signOut,
        getToken
    };

    return (
        <AuthnContext.Provider value={value}>
            {props.children}
        </AuthnContext.Provider>
    );
}
