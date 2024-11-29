import React from "react";
import axios from "../api/axios";
import { jwtDecode } from "jwt-decode";

const CheckUser = async (token) => {
    const decoded = jwtDecode(token);
    return decoded;
};

export default CheckUser;
