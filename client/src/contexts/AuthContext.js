import React, { useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
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
                const currentTime = Math.floor(Date.now() / 1000);
                if (decoded.exp > currentTime) {
                    setAuthUser({
                        username: decoded.username,
                        userTypeId: decoded.userTypeId,
                        roleName: decoded.roleName,
                    });
                    setIsSignedIn(true);
                    scheduleTokenExpiry(decoded.exp - currentTime);
                    const hours = Math.floor(
                        (decoded.exp - currentTime) / 3600
                    );
                    const minutes = Math.floor(
                        ((decoded.exp - currentTime) % 3600) / 60
                    );
                    const seconds = (decoded.exp - currentTime) % 60;

                    console.log(
                        `Token expires in: ${hours
                            .toString()
                            .padStart(2, "0")}h:${minutes
                            .toString()
                            .padStart(2, "0")}m:${seconds
                            .toString()
                            .padStart(2, "0")}s`
                    );
                } else {
                    signOut();
                }
            } catch (error) {
                console.log("Failed to decode token:", error);
                setIsSignedIn(false);
            }
        }
    }, []);

    const scheduleTokenExpiry = (timeUnitExpiry) => {
        setTimeout(() => {
            console.log("Token expired, logging out...");
            signOut();
        }, timeUnitExpiry * 1000); // Convert seconds to milliseconds
    };

    const getToken = () => {
        return localStorage.getItem("token");
    };

    const signIn = (token) => {
        try {
            const decoded = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);
            if (decoded.exp > currentTime) {
                setAuthUser({
                    username: decoded.username,
                    userTypeId: decoded.userTypeId,
                    roleName: decoded.roleName,
                });
                setIsSignedIn(true);
                localStorage.setItem("token", token);
                scheduleTokenExpiry(decoded.exp - currentTime);
            } else {
                console.log("Token is already expired");
            }
        } catch (error) {
            console.log("Failed to decode token:", error);
        }
    };

    useEffect(() => {
        console.log("Auth User after sign-in:", authUser);
    }, [authUser]);

    const signOut = () => {
        setAuthUser(false);
        setIsSignedIn(false);
        localStorage.clear();
    };

    const defineUserType = (token) => {
        if (!token) return null;

        try {
            const decoded = jwtDecode(token); // Decode the JWT token
            return decoded.userTypeId; // Return the userTypeId field
        } catch (error) {
            console.error("Token decoding failed:", error);
            return null;
        }
    };

    const value = {
        authUser,
        setAuthUser,
        isSignedIn,
        setIsSignedIn,
        signIn,
        signOut,
        getToken,
        defineUserType
    };

    return (
        <AuthnContext.Provider value={value}>
            {props.children}
        </AuthnContext.Provider>
    );
}
