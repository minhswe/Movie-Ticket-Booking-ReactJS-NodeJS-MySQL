import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./ProfileStyle.css";
import {userApi} from "../../api/axios";

const Profile = () => {
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        email: ".",
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            const response = await userApi.get("/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });
            // console.log(response)
            setUserData({
                username: response.data.username,
                password: response.data.password,
                email: response.data.email,
            });
        };
        fetchUserData();
    }, []);
    return (
        <div className="profile-container">
            <div className="profile-form">
                <div className="title">Username</div>
                <TextField
                    id="username"
                    variant="filled"
                    value={userData.username}
                    sx={{
                        width: "100%", // Full width
                        marginBottom: "5px",
                        "& .MuiInputBase-input": {
                            // Target the inner input
                            height: "30px", // Set the custom height
                            padding: "0 12px", // Adjust padding to avoid overflow
                        },
                    }}
                />
                <div className="title">Password</div>
                <TextField
                    id="password"
                    variant="filled"
                    value={userData.password}
                    sx={{
                        width: "100%", // Full width
                        marginBottom: "5px",
                        "& .MuiInputBase-input": {
                            // Target the inner input
                            height: "30px", // Set the custom height
                            padding: "0 12px", // Adjust padding to avoid overflow
                        },
                    }}
                />
                <div className="title">Email</div>
                <TextField
                    id="email"
                    variant="filled"
                    value={userData.email}
                    sx={{
                        width: "100%", // Full width
                        marginBottom: "5px",
                        "& .MuiInputBase-input": {
                            // Target the inner input
                            height: "30px", // Set the custom height
                            padding: "0 12px", // Adjust padding to avoid overflow
                        },
                    }}
                />
                <div className="signin-button">
                    <Button variant="contained">Save</Button>
                    <Button variant="outlined">Cancel</Button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
