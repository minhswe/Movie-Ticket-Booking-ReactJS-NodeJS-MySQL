import { jwtDecode } from "jwt-decode";

const CheckUser = async (token) => {
    const decoded = jwtDecode(token);
    return decoded;
};

export default CheckUser;
