import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

type AuthRouteProps = {
    children: ReactNode;
};

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
    // Get the token
    const token = getUserFromStorage();

    if (token) {
        return <>{children}</>;
    } else {
        return <Navigate to="/login" />;
    }
};

export default AuthRoute;
