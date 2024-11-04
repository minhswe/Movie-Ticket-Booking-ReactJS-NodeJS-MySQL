import React from "react";
import { StyledButton, StyledLink } from "./Style";

const UserNav = () => {
    return (
        <>
            <StyledButton>
                <StyledLink to={"/user/register"}>Register</StyledLink>
            </StyledButton>
            <StyledButton>
                <StyledLink to={"/user/signin"}>Sign In</StyledLink>
            </StyledButton>
        </>
    );
};

export default UserNav;
