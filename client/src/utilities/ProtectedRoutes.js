// import React from "react";
// import { Outlet, Navigate } from "react-router-dom";


// const ProtectedRoutes = (requireUserType) => {
//     const token = localStorage.getItem("token");


//     return token ? <Outlet /> : <Navigate to="/user/signin" />;
// };

// export default ProtectedRoutes;

// import React from "react";
// import { Outlet, Navigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";

// const ProtectedRoutes = ({ requiredUserType }) => {
//     const { authUser } = useAuth();
//     const token = localStorage.getItem("token");

//     // If the user is not signed in, redirect to sign-in
//     if (!token || !authUser) return <Navigate to="/user/signin" />;
//     // If a specific user type is required, check if it matches

//     if (requiredUserType && authUser.userTypeId !== requiredUserType) {
//         return <Navigate to="/" />;
//     }

//     return <Outlet />;
// };

// export default ProtectedRoutes;

import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoutes = ({ requiredUserType }) => {
    const { defineUserType } = useAuth();

    const token = localStorage.getItem("token");
    const userType = defineUserType(token);

    if (!token || !userType) {
        console.log("No token or user is not authenticated.");
        return <Navigate to="/user/signin" />;
    }

    if (requiredUserType && userType !== requiredUserType) {
        console.log(
            `User does not meet role requirement. Required: ${requiredUserType}, Found: ${userType}`
        );
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;
