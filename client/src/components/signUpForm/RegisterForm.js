import React, { useState } from "react";
import "./Style.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import CustomizeDialog from "../dialogs/CustomizeDialog";

function SignUpForm() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(null);
    const [message, setMessage] = useState("");
    const handleCLoseDialog = () => {
        setIsDialogOpen(false);
    };
    //Step 1: Add state for form fields
    const [formData, setFormData] = useState({
        Username: "",
        UserPassword: "",
        Email: "",
        Usertype: 2,
    });

    // Step 2: Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8080/users/newUser",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 201) {
                console.log("Registration successful");
                setIsSuccess(true);
                setIsDialogOpen(true);
                setMessage(response.data.message);
                // Optionally, clear form or redirect
            } else {
                setIsSuccess(false);
                setIsDialogOpen(true);
                console.log(response.data)
                setMessage(response.data.message);
                console.error("Registration failed");
            }
        } catch (error) {
            setIsSuccess(false);
            setIsDialogOpen(true);
            setMessage(error.response.data.message)
            console.error("Error:", error);
        }
    };

    return (
        <>
            <div className="sign-up-form-wrapper">
                <div className="register-form">
                    <div className="register-title">Username</div>
                    <TextField
                        name="Username"
                        id="filled-basic"
                        size="small"
                        value={formData.Username}
                        onChange={handleChange}
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
                    <div className="register-title">Password</div>
                    <TextField
                        name="UserPassword"
                        type="password"
                        id="filled-basic"
                        value={formData.UserPassword}
                        onChange={handleChange}
                        size="small"
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
                    <div className="register-title">Email</div>
                    <TextField
                        name="Email"
                        id="filled-basic"
                        value={formData.Email}
                        onChange={handleChange}
                        size="small"
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
                    <div className="register-button">
                        <Button variant="contained" onClick={handleSubmit}>
                            Register
                        </Button>
                        <Button variant="outlined">Cancel</Button>
                    </div>
                </div>
            </div>

            <CustomizeDialog
                open={isDialogOpen}
                onClose={handleCLoseDialog}
                title={
                    isSuccess
                        ? "Registration Complete"
                        : "Registration Unaccomplished"
                }
                message={
                    message
                }
                confirmButtonText="Okay"
                dialogType={isSuccess ? "success" : "error"}
                onConfirm={() => {
                    handleCLoseDialog();
                    console.log("Confirmed action!");
                }}
            />
        </>
    );
}

export default SignUpForm;
