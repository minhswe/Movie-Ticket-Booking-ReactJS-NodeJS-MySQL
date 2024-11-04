import React from "react";
import RegisterForm from "./components/signUpForm/RegisterForm";
import SignInForm from "./components/signInForm/SignInForm";
import Home from "./components/home/Home";
import Profile from "./components/userSettings/Profile";
import ProtectedRoutes from "./utilities/ProtectedRoutes";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NowShowing from "./components/movies/NowShowing";
const App = () => {
    return (
        <>
            <Router basename="/">
                <Header />
                <Routes>
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/user/profile" element={<Profile />} />
                    </Route>
                    <Route path="/" element={<Home />} />
                    <Route path="/user/register" element={<RegisterForm />} />
                    <Route path="/user/signin" element={<SignInForm />} />
                    <Route path="/movies/nowshowing" element={<NowShowing />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
