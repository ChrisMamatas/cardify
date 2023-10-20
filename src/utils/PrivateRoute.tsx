import { useContext } from "react";
import {Route, Navigate} from "react-router-dom";
import { AuthContext } from "./Auth.tsx";

const PrivateRoute = ({ component: RouteComponent, ...rest }: any) => {
    const { currentUser } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            element={currentUser ? <RouteComponent /> : <Navigate to="/login" />}
        />
    );
};

export default PrivateRoute;
