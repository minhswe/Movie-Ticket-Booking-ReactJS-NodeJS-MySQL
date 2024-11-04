import React from "react";
import TextField from "@mui/material/TextField";
import "./Style.css";
import Button from "@mui/material/Button";
import axios from "../../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const SignInForm = () => {
    const navigate = useNavigate();
    const {signIn} = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        try {
            const response = await axios.post("/users/checkUser", {
                username,
                password,
            });

            // Check if login was successful
            if (response.status === 200) {
                console.log("Sign in successful", response.data);
                signIn(response.data.token);
                navigate("/");
            }
        } catch (error) {
            console.error("Error during sign in:", error);
            // Handle error (e.g., show error message)
        }
    };
    return (
        <div className="signin-container">
            <div className="signin-form">
                <div className="title">Username</div>
                <TextField
                    id="filled-basic"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    variant="filled"
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
                    id="filled-basic"
                    variant="filled"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    <Button variant="contained" onClick={handleSubmit}>
                        Sign In
                    </Button>
                    <Button variant="outlined">Cancel</Button>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
