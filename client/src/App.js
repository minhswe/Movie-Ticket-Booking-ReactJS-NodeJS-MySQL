import React from "react";
import RegisterForm from "./components/signUpForm/RegisterForm";
import SignInForm from "./components/signInForm/SignInForm";
import Home from "./components/home/Home";
import Profile from "./components/userSettings/Profile";
import ProtectedRoutes from "./utilities/ProtectedRoutes";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NowShowing from "./components/movies/NowShowing";
import MovieDetail from "./components/movies/MoVieDetail";
import SeatBooking from "./components/movies/SeatBooking";
import Booking from "./components/movies/Booking";
import MyPurchase from "./components/userSettings/MyPurchase";
import AdHome from "./components/admins/AdHome"
import "./App.css";

const App = () => {
    return (
        <div className="app-container">
            <Router basename="/">
                <Header />
                {/* <div className="content"> */}
                <Routes>
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/user/profile" element={<Profile />} />
                        <Route
                            path="/user/my-purchase"
                            element={<MyPurchase />}
                        />
                        <Route
                            path="booking-ticket/movie/:movieId/show/:showId"
                            element={<Booking />}
                        />
                    </Route>

                    <Route element={<ProtectedRoutes requiredUserType={1} />}>
                        <Route
                            path="/admin/dashboard"
                            element={<AdHome />}
                        />
                    </Route>

                    //public routes
                    <Route path="/" element={<Home />} />
                    <Route path="/user/register" element={<RegisterForm />} />
                    <Route path="/user/signin" element={<SignInForm />} />
                    <Route path="/movies/nowshowing" element={<NowShowing />} />
                    <Route path="/movie/:id" element={<MovieDetail />}></Route>
                </Routes>
                {/* </div> */}
            </Router>
        </div>
    );
};

export default App;
