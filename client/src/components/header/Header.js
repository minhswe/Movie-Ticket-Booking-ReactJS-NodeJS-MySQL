import React from "react";
import logo from "../../public/images/png-logo-removebg-preview.png";
import "./Style.css";
import { NavLink } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import UserNav from "../navbar/UserNav";
import UserSignedIn from "../userSettings/UserSignedIn";
import { useAuth } from "../../contexts/AuthContext";

function Header() {
    const { authUser, isSignedIn } = useAuth();
    console.log(authUser, isSignedIn)
    return (
        <>
            <div className="container">
                <div className="logo">
                    <NavLink to="/">
                        <img src={logo} alt="LOGO" />
                    </NavLink>
                </div>
                <div className="navbar-menu">
                    <NavBar />
                </div>
                <div className="user-menu">
                    {isSignedIn ? (
                        <UserSignedIn username={authUser} />
                    ) : (
                        <UserNav />
                    )}
                </div>
            </div>
        </>
    );
}

export default Header;
